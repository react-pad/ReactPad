"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LaunchpadPresaleContract } from "@/lib/config";
import { Label } from "@radix-ui/react-label";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { erc20Abi, formatEther, parseEther } from "viem";
import {
  useAccount,
  useReadContract,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";

function CountdownTimer({
  targetDate,
  isStart = false,
}: {
  targetDate: Date;
  isStart?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="text-sm">
      <span className="font-bold uppercase tracking-wider">
        {isStart ? "STARTS IN:" : "ENDS IN:"}
      </span>
      <div className="font-mono mt-2 text-xl font-black">
        {timeLeft.days}D {timeLeft.hours}H {timeLeft.minutes}M {timeLeft.seconds}
        S
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id: presaleAddress } = useParams<{
    id: `0x${string}`;
  }>();
  const { address } = useAccount();

  const presaleContract = {
    address: presaleAddress,
    abi: LaunchpadPresaleContract.abi,
  } as const;

  const {
    data,
    isLoading,
    refetch,
  } = useReadContracts({
    contracts: [
      { ...presaleContract, functionName: "saleToken" },
      { ...presaleContract, functionName: "paymentToken" },
      { ...presaleContract, functionName: "startTime" },
      { ...presaleContract, functionName: "endTime" },
      { ...presaleContract, functionName: "rate" },
      { ...presaleContract, functionName: "softCap" },
      { ...presaleContract, functionName: "hardCap" },
      { ...presaleContract, functionName: "totalRaised" },
      { ...presaleContract, functionName: "minContribution" },
      { ...presaleContract, functionName: "maxContribution" },
      { ...presaleContract, functionName: "claimEnabled" },
      { ...presaleContract, functionName: "refundsEnabled" },
    ],
  });

  const [
    saleTokenAddress,
    paymentTokenAddress,
    startTime,
    endTime,
    rate,
    softCap,
    hardCap,
    totalRaised,
    minContribution,
    maxContribution,
    claimEnabled,
    refundsEnabled,
  ] = data || [];

  const { data: tokenData, isLoading: isLoadingTokenData } = useReadContracts({
    contracts: [
      {
        address: saleTokenAddress?.result as `0x${string}`,
        abi: erc20Abi,
        functionName: "name",
      },
      {
        address: saleTokenAddress?.result as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
      {
        address: paymentTokenAddress?.result as `0x${string}`,
        abi: erc20Abi,
        functionName: "symbol",
      },
    ],
    query: {
      enabled: !!saleTokenAddress?.result,
    },
  });

  const [name, symbol, paymentSymbol] = tokenData || [];

  const [contributionAmount, setContributionAmount] = useState("");
  const parsedAmount = useMemo(
    () => (contributionAmount ? parseEther(contributionAmount) : BigInt(0)),
    [contributionAmount]
  );

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    abi: erc20Abi,
    address: paymentTokenAddress?.result as `0x${string}`,
    functionName: "allowance",
    args: [address!, presaleAddress],
    query: {
      enabled:
        !!address &&
        !!paymentTokenAddress?.result &&
        paymentTokenAddress.result !==
        "0x0000000000000000000000000000000000000000",
    },
  });

  const { data: contributeHash, writeContract: contribute, isPending: isContributing } = useWriteContract();
  const { data: approveHash, writeContract: approve, isPending: isApproving } = useWriteContract();
  const { data: claimHash, writeContract: claim, isPending: isClaiming } = useWriteContract();

  const isEthPayment = useMemo(
    () =>
      !paymentTokenAddress?.result ||
      paymentTokenAddress.result ===
      "0x0000000000000000000000000000000000000000",
    [paymentTokenAddress?.result]
  );

  const needsApproval = useMemo(() => {
    if (isEthPayment || !allowance) return false;
    return allowance < parsedAmount;
  }, [allowance, parsedAmount, isEthPayment]);

  const handleContribute = () => {
    contribute({
      ...presaleContract,
      functionName: "contribute",
      args: [parsedAmount],
      value: isEthPayment ? parsedAmount : undefined,
    });
  };

  const handleApprove = () => {
    approve({
      address: paymentTokenAddress?.result as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [presaleAddress, parsedAmount],
    });
  };

  const handleClaim = () => {
    claim({ ...presaleContract, functionName: "claimTokens" });
  };

  const { isSuccess: isContributeSuccess, isLoading: isContributeConfirming } = useWaitForTransactionReceipt({
    hash: contributeHash,
  });
  const { isSuccess: isApproveSuccess, isLoading: isApproveConfirming } = useWaitForTransactionReceipt({
    hash: approveHash,
  });
  const { isSuccess: isClaimSuccess, isLoading: isClaimConfirming } = useWaitForTransactionReceipt({ hash: claimHash });

  useEffect(() => {
    if (isContributeSuccess) {
      toast.success("Contribution successful!");
      refetch();
      setContributionAmount("");
    }
    if (isApproveSuccess) {
      toast.success("Approval successful! You can now contribute.");
      refetchAllowance();
    }
    if (isClaimSuccess) {
      toast.success("Tokens claimed successfully!");
    }
  }, [
    isContributeSuccess,
    isApproveSuccess,
    isClaimSuccess,
    refetch,
    refetchAllowance,
  ]);

  if (isLoading || isLoadingTokenData || !data || !tokenData) {
    return <div className="text-center py-20">Loading project...</div>;
  }

  const now = new Date().getTime() / 1000;
  const statusType =
    now < (startTime?.result ?? 0)
      ? "upcoming"
      : now > (endTime?.result ?? 0)
        ? "completed"
        : "live";

  const raised = parseFloat(
    formatEther((totalRaised?.result as bigint) ?? BigInt(0))
  );
  const goal = parseFloat(
    formatEther((hardCap?.result as bigint) ?? BigInt(0))
  );
  const progress = goal > 0 ? (raised / goal) * 100 : 0;
  const isFinished = claimEnabled?.result || refundsEnabled?.result;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-2">
            {name?.result as string}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-light max-w-3xl mx-auto">
            Join the presale for {name?.result as string}. Be part of the next
            big thing.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-2xl font-black uppercase">
                  {statusType === 'live' && 'LIVE SALE'}
                  {statusType === 'upcoming' && 'UPCOMING SALE'}
                  {statusType === 'completed' && 'SALE COMPLETED'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {statusType === "live" && endTime?.result && (
                  <CountdownTimer
                    targetDate={new Date(Number(endTime.result) * 1000)}
                  />
                )}
                {statusType === "upcoming" && startTime?.result && (
                  <CountdownTimer
                    targetDate={new Date(Number(startTime.result) * 1000)}
                    isStart
                  />
                )}
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-black uppercase tracking-wider">PROGRESS</span>
                    <span className="text-md font-black">{progress.toFixed(2)}%</span>
                  </div>
                  <div className="w-full bg-white border-2 border-black h-5">
                    <div
                      className="bg-black h-full transition-all"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 text-sm font-bold">
                    <span>{raised.toLocaleString()} {paymentSymbol?.result ?? "ETH"}</span>
                    <span>{goal.toLocaleString()} {paymentSymbol?.result ?? "ETH"}</span>
                  </div>
                </div>

                {!isFinished && statusType === 'live' && (
                  <div className="pt-6 border-t-2 border-dashed border-black space-y-4">
                    <Label className="font-black uppercase tracking-wider">Your Contribution</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        type="number"
                        placeholder={`Amount in ${paymentSymbol?.result ?? "ETH"}`}
                        className="flex-grow h-12 border-2 border-black focus:ring-0 focus:border-black font-medium"
                        value={contributionAmount}
                        onChange={(e) => setContributionAmount(e.target.value)}
                      />
                      {needsApproval ? (
                        <Button onClick={handleApprove} disabled={isApproving || isApproveConfirming} className="bg-[#FFFF00] text-black h-12 font-black uppercase text-sm tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all w-48">
                          {isApproving || isApproveConfirming ? 'Approving...' : 'Approve'}
                        </Button>
                      ) : (
                        <Button onClick={handleContribute} disabled={isContributing || isContributeConfirming} className="bg-[#7DF9FF] text-black h-12 font-black uppercase text-sm tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all w-48">
                          {isContributing || isContributeConfirming ? 'Contributing...' : 'Contribute'}
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Min: {formatEther(minContribution?.result as bigint ?? BigInt(0))} | Max: {formatEther(maxContribution?.result as bigint ?? BigInt(0))}
                    </p>
                  </div>
                )}
                {isFinished && (
                  <div className="pt-6 border-t-2 border-dashed border-black">
                    {claimEnabled?.result && <Button onClick={handleClaim} disabled={isClaiming || isClaimConfirming} className="w-full bg-[#2FFF2F] text-black h-12 font-black uppercase text-sm tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                      {isClaiming || isClaimConfirming ? 'Claiming...' : 'Claim Tokens'}
                    </Button>}
                    {refundsEnabled?.result && <Button className="w-full mt-4">Claim Refund</Button>}
                  </div>
                )}

              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <CardHeader className="border-b-4 border-black">
                <CardTitle className="text-2xl font-black uppercase">Tokenomics & Info</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Token Name</span>
                  <span className="font-bold">{name?.result as string}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ticker</span>
                  <span className="font-bold">{symbol?.result as string}</span>
                </div>
                <Separator className="my-2 border-dashed bg-black" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Presale Rate</span>
                  <span className="font-bold">
                    {formatEther(rate?.result as bigint ?? BigInt(0))}{" "}
                    {symbol?.result as string} per {paymentSymbol?.result ?? "ETH"}
                  </span>
                </div>
                <Separator className="my-2 border-dashed bg-black" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Soft Cap</span>
                  <span className="font-bold">
                    {formatEther(softCap?.result as bigint ?? BigInt(0))}{" "}
                    {paymentSymbol?.result ?? "ETH"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hard Cap</span>
                  <span className="font-bold">
                    {formatEther(hardCap?.result as bigint ?? BigInt(0))}{" "}
                    {paymentSymbol?.result ?? "ETH"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}