"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { AirdropMultisenderContract } from "@/lib/contracts";
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { parseEther, erc20Abi, maxUint256 } from "viem";
import { toast } from "sonner";

export default function AirdropPage() {
    const searchParams = useSearchParams();
    const { address } = useAccount();
    
    const { data: sendHash, writeContract: sendTokens, isPending: isSending, error: sendError } = useWriteContract();
    const { data: approveHash, writeContract: approve, isPending: isApproving, error: approveError } = useWriteContract();

    const [tokenAddress, setTokenAddress] = useState(searchParams.get("token") ?? "");
    const [recipientsData, setRecipientsData] = useState("");

    const parsedRecipients = useMemo(() => {
        const lines = recipientsData.split("\n").filter(line => line.trim() !== "");
        const recipients = lines.map(line => line.split(',')[0].trim() as `0x${string}`);
        const amounts = lines.map(line => parseEther(line.split(',')[1].trim()));
        return { recipients, amounts };
    }, [recipientsData]);
    
    const totalAmount = useMemo(() => {
        return parsedRecipients.amounts.reduce((acc, curr) => acc + curr, BigInt(0));
    }, [parsedRecipients]);

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'allowance',
        args: [address!, AirdropMultisenderContract.address],
        query: {
            enabled: !!address && !!tokenAddress,
        }
    });

    const needsApproval = useMemo(() => {
        if (!allowance) return false;
        return allowance < totalAmount;
    }, [allowance, totalAmount]);

    const handleApprove = () => {
        approve({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: "approve",
            args: [AirdropMultisenderContract.address, maxUint256]
        })
    }

    const handleSend = () => {
        sendTokens({
            address: AirdropMultisenderContract.address,
            abi: AirdropMultisenderContract.abi,
            functionName: "sendERC20",
            args: [
                tokenAddress as `0x${string}`,
                parsedRecipients.recipients,
                parsedRecipients.amounts
            ]
        })
    }

    const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveHash });
    const { isLoading: isSendConfirming, isSuccess: isSendConfirmed } = useWaitForTransactionReceipt({ hash: sendHash });

    useEffect(() => {
        if(isApproveConfirmed) {
            toast.success("Approval successful! You can now send your tokens.");
            refetchAllowance();
        }
    }, [isApproveConfirmed, refetchAllowance])

    useEffect(() => {
        if(isSendConfirmed) {
            toast.success("Tokens sent successfully!");
            setRecipientsData("");
        }
    }, [isSendConfirmed])

    useEffect(() => {
        const err = sendError || approveError;
        if(err) {
            toast.error(err.message);
        }
    }, [sendError, approveError])

  return (
    <div className="container mx-auto px-4 py-12 text-black">
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
            <CardTitle className="text-2xl font-bold">Airdrop Tool</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="token-address">Token Address</Label>
                    <Input id="token-address" placeholder="0x..." value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="recipients">Recipients and Amounts</Label>
                    <Textarea 
                        id="recipients" 
                        placeholder="0x...,100\n0x...,200" 
                        value={recipientsData} 
                        onChange={e => setRecipientsData(e.target.value)}
                        className="min-h-[200px]"
                    />
                    <p className="text-xs text-gray-500">
                        Enter one address and amount per line, separated by a comma.
                    </p>
                </div>

                <div className="text-sm">
                    Total to send: <span className="font-bold">{totalAmount.toString()}</span>
                </div>

                {needsApproval ? (
                     <Button onClick={handleApprove} disabled={isApproving || isApproveConfirming} className="w-full">
                        {isApproving || isApproveConfirming ? "Approving..." : "Approve Tokens"}
                     </Button>
                ) : (
                    <Button onClick={handleSend} disabled={isSending || isSendConfirming} className="w-full">
                        {isSending || isSendConfirming ? "Sending..." : "Send Tokens"}
                    </Button>
                )}
            </CardContent>
        </Card>
    </div>
  );
}