"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenLocker } from "@/lib/config";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { useUserLocks } from "@/lib/hooks/useUserLocks";
import { useBlockchainStore } from "@/lib/store/blockchain-store";
import { formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { erc20Abi, maxUint256, parseEther, formatEther, Address } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract, useWatchContractEvent } from "wagmi";
import { RefreshCw } from "lucide-react";

function LockInfo({ lockId }: { lockId: bigint }) {
    const { address } = useAccount();
    const { lock, isLoading, refetch } = useLockInfo(lockId);

    const [extendDuration, setExtendDuration] = useState("");
    const [newOwner, setNewOwner] = useState("");

    const { data: unlockHash, writeContract: unlockTokens } = useWriteContract();
    const { isSuccess: isUnlocked, isLoading: isUnlocking } = useWaitForTransactionReceipt({ hash: unlockHash });

    const { data: extendHash, writeContract: extendLock } = useWriteContract();
    const { isSuccess: isExtended, isLoading: isExtending } = useWaitForTransactionReceipt({ hash: extendHash });

    const { data: transferHash, writeContract: transferLock } = useWriteContract();
    const { isSuccess: isTransferred, isLoading: isTransferring } = useWaitForTransactionReceipt({ hash: transferHash });


    const handleUnlock = () => {
        unlockTokens({
            address: TokenLocker.address as Address,
            abi: TokenLocker.abi,
            functionName: "unlock",
            args: [lockId],
            gas: BigInt(500000)
        })
    }

    const handleExtend = () => {
        const durationInSeconds = parseInt(extendDuration) * 24 * 60 * 60;
        extendLock({
            address: TokenLocker.address as Address,
            abi: TokenLocker.abi,
            functionName: 'extendLock',
            args: [lockId, BigInt(durationInSeconds)],
            gas: BigInt(300000)
        })
    }

    const handleTransfer = () => {
        transferLock({
            address: TokenLocker.address as Address,
            abi: TokenLocker.abi,
            functionName: 'transferLockOwnership',
            args: [lockId, newOwner as `0x${string}`],
            gas: BigInt(200000)
        })
    }

    useEffect(() => {
        if (isUnlocked && unlockHash) {
            toast.success("Tokens unlocked successfully!");
            refetch();
        }
    }, [isUnlocked, unlockHash, refetch])

    useEffect(() => {
        if (isExtended && extendHash) {
            toast.success("Lock extended successfully!");
            refetch();
            setExtendDuration("");
        }
    }, [isExtended, extendHash, refetch])

    useEffect(() => {
        if (isTransferred && transferHash) {
            toast.success("Lock transferred successfully!");
            refetch();
            setNewOwner("");
        }
    }, [isTransferred, transferHash, refetch])


    if (isLoading || !lock) {
        return <div className="border-2 border-gray-200 p-4 rounded-lg animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
    }

    const lockData = lock as {
        token: `0x${string}`;
        amount: bigint;
        unlockDate: bigint;
        name: string;
        description: string;
        withdrawn: boolean;
        owner: `0x${string}`;
    };

    const unlockDate = new Date(Number(lockData.unlockDate) * 1000);
    const isUnlockable = unlockDate < new Date() && !lockData.withdrawn;
    const isOwner = address === lockData.owner;

    return (
        <div className="border-2 border-black p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg">{lockData.name}</h3>
                        {lockData.withdrawn && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                                Withdrawn
                            </span>
                        )}
                        {!lockData.withdrawn && isUnlockable && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                                Unlockable
                            </span>
                        )}
                        {!lockData.withdrawn && !isUnlockable && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                                Locked
                            </span>
                        )}
                    </div>
                    {lockData.description && (
                        <p className="text-sm text-gray-600 mb-3">{lockData.description}</p>
                    )}
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold">Token:</span>{' '}
                            <span className="font-mono">{lockData.token.slice(0, 6)}...{lockData.token.slice(-4)}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                            <span className="font-semibold">Lock ID:</span> #{lockId.toString()}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-bold text-xl text-black">
                        {formatEther(lockData.amount)}
                    </p>
                    <p className="text-xs text-gray-500 uppercase">Tokens</p>
                    {!lockData.withdrawn && (
                        <p className="text-xs text-gray-600 mt-2">
                            {isUnlockable ? (
                                <span className="text-green-600 font-semibold">Ready to unlock</span>
                            ) : (
                                <>Unlocks {formatDistanceToNow(unlockDate, { addSuffix: true })}</>
                            )}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex gap-2 mt-4">
                {isOwner && isUnlockable && (
                    <Button onClick={handleUnlock} disabled={isUnlocking} size="sm" >
                        {isUnlocking ? "Unlocking..." : "Unlock"}
                    </Button>
                )}
                {isOwner && !lockData.withdrawn && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">Extend</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Extend Lock Duration</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <p>Current unlock date: {unlockDate.toLocaleString()}</p>
                                <div>
                                    <Label htmlFor="extend-duration">Additional days</Label>
                                    <Input
                                        id="extend-duration"
                                        type="number"
                                        placeholder="e.g., 30"
                                        value={extendDuration}
                                        onChange={e => setExtendDuration(e.target.value)}
                                    />
                                </div>
                                <Button onClick={handleExtend} disabled={isExtending || !extendDuration}>
                                    {isExtending ? "Extending..." : "Extend Lock"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
                {isOwner && !lockData.withdrawn && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button size="sm" variant="secondary">Transfer</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Transfer Lock Ownership</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <p>Current owner: {lockData.owner}</p>
                                <div>
                                    <Label htmlFor="new-owner">New Owner Address</Label>
                                    <Input
                                        id="new-owner"
                                        placeholder="0x..."
                                        value={newOwner}
                                        onChange={e => setNewOwner(e.target.value)}
                                    />
                                </div>
                                <Button onClick={handleTransfer} disabled={isTransferring || !newOwner}>
                                    {isTransferring ? "Transferring..." : "Transfer Ownership"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    )
}


export default function TokenLockerPage() {
    const searchParams = useSearchParams();
    const { address } = useAccount();
    const { setUserLocks } = useBlockchainStore();

    const { data: lockHash, writeContract: lockTokens, isPending: isLocking, error: lockError } = useWriteContract();
    const { data: approveHash, writeContract: approve, isPending: isApproving, error: approveError } = useWriteContract();

    const [tokenAddress, setTokenAddress] = useState(searchParams.get("token") ?? "");
    const [amount, setAmount] = useState("");
    const [duration, setDuration] = useState(""); // in days
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const isFormValid = useMemo(() => {
        return tokenAddress.trim() !== '' && amount.trim() !== '' && duration.trim() !== '' && name.trim() !== '';
    }, [tokenAddress, amount, duration, name]);

    const parsedAmount = useMemo(() => amount ? parseEther(amount) : BigInt(0), [amount]);

    const { data: allowance, refetch: refetchAllowance } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: 'allowance',
        args: [address!, TokenLocker.address as `0x${string}`],
        query: {
            enabled: !!address && !!tokenAddress,
        }
    });

    const needsApproval = useMemo(() => {
        if (!allowance) return false;
        return allowance < parsedAmount;
    }, [allowance, parsedAmount]);

    const { lockIds: userLocks, isLoading: isLoadingUserLocks, refetch: refetchUserLocks } = useUserLocks();

    const handleApprove = () => {
        approve({
            address: tokenAddress as `0x${string}`,
            abi: erc20Abi,
            functionName: "approve",
            args: [TokenLocker.address as `0x${string}`, maxUint256],
            gas: BigInt(100000)
        })
    }

    const handleLock = () => {
        const durationInSeconds = parseInt(duration) * 24 * 60 * 60;
        lockTokens({
            address: TokenLocker.address as `0x${string}`,
            abi: TokenLocker.abi,
            functionName: "lockTokens",
            args: [
                tokenAddress as `0x${string}`,
                parsedAmount,
                BigInt(durationInSeconds),
                name,
                description
            ],
            gas: BigInt(1000000)
        })
    }

    useWatchContractEvent({
        address: TokenLocker.address as `0x${string}`,
        abi: TokenLocker.abi,
        eventName: 'LockCreated',
        onLogs(logs) {
            // Check if the new lock belongs to the current user
            const userAddress = address;
            const userLog = logs.find((log: unknown) => (log as { args?: { owner?: string } }).args?.owner === userAddress);
            if (userLog) {
                toast.success("New lock created! Refreshing your locks...");
                // Invalidate cache to force refetch
                if (address) {
                    setUserLocks(address, []);
                }
                refetchUserLocks();
                // Clear the form
                setAmount("");
                setDuration("");
                setName("");
                setDescription("");
            }
        },
    });

    const { isLoading: isApproveConfirming, isSuccess: isApproveSuccess } = useWaitForTransactionReceipt({
        hash: approveHash,
    });
    const { isLoading: isLockConfirming } = useWaitForTransactionReceipt({
        hash: lockHash,
    });

    useEffect(() => {
        if (isApproveConfirming) {
            toast.loading("Approval confirming...");
        }
    }, [isApproveConfirming]);

    useEffect(() => {
        if (isLockConfirming) {
            toast.loading("Lock confirming...");
        }
    }, [isLockConfirming]);

    useEffect(() => {
        const err = lockError || approveError;
        if (err) {
            toast.error(err.message);
        }
    }, [lockError, approveError]);

    useEffect(() => {
        if (isApproveSuccess && approveHash) {
            toast.success("Approval successful! You can now lock your tokens.");
            refetchAllowance();
        }
    }, [isApproveSuccess, approveHash, refetchAllowance]);


    return (
        <div className="container mx-auto px-4 py-12 text-black">
            <div className="mb-8">
                <h1 className="text-4xl font-black uppercase mb-2">Token Locker</h1>
                <p className="text-gray-600">Lock your tokens securely with time-based releases</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Lock Creation Form */}
                <div>
                    <Card className="border-2 border-black">
                        <CardHeader className="border-b-2 border-black">
                            <CardTitle className="text-2xl font-bold">Create New Lock</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-6">
                            <div className="space-y-2">
                                <Label htmlFor="token-address">Token Address</Label>
                                <Input
                                    id="token-address"
                                    placeholder="0x..."
                                    value={tokenAddress}
                                    onChange={e => setTokenAddress(e.target.value)}
                                    className="border-2 border-black focus:ring-0 focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="amount">Amount (in tokens)</Label>
                                <Input
                                    id="amount"
                                    type="number"
                                    placeholder="1000"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                    className="border-2 border-black focus:ring-0 focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="duration">Lock Duration (in days)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    placeholder="30"
                                    value={duration}
                                    onChange={e => setDuration(e.target.value)}
                                    className="border-2 border-black focus:ring-0 focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name">Lock Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Team Tokens Vesting"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    className="border-2 border-black focus:ring-0 focus:border-black"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Input
                                    id="description"
                                    placeholder="e.g. Monthly vesting for core contributors"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    className="border-2 border-black focus:ring-0 focus:border-black"
                                />
                            </div>

                            {needsApproval ? (
                                <Button
                                    onClick={handleApprove}
                                    disabled={!isFormValid || isApproving || isApproveConfirming}
                                    className="w-full bg-black text-white border-2 border-black hover:bg-gray-800 font-bold uppercase"
                                >
                                    {isApproving || isApproveConfirming ? "Approving..." : "Approve Tokens"}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleLock}
                                    disabled={!isFormValid || isLocking || isLockConfirming}
                                    className="w-full bg-black text-white border-2 border-black hover:bg-gray-800 font-bold uppercase"
                                >
                                    {isLocking || isLockConfirming ? "Locking..." : "Lock Tokens"}
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* User Locks List */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <CardTitle className="text-2xl font-bold">Your Locks</CardTitle>
                        <Button
                            onClick={refetchUserLocks}
                            disabled={isLoadingUserLocks}
                            variant="outline"
                            size="sm"
                            className="border-2 border-black hover:bg-gray-100"
                        >
                            <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingUserLocks ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                    <Card className="border-2 border-black">
                        <CardContent className="pt-6">
                            {!address ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500">Connect your wallet to view your locks</p>
                                </div>
                            ) : isLoadingUserLocks ? (
                                <div className="space-y-4">
                                    {[1, 2].map(i => (
                                        <div key={i} className="border-2 border-gray-200 p-4 rounded-lg animate-pulse">
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : userLocks && userLocks.length > 0 ? (
                                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                    {(userLocks as bigint[]).reverse().map(lockId => (
                                        <LockInfo key={lockId.toString()} lockId={lockId} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-2">You have no active locks</p>
                                    <p className="text-sm text-gray-400">Create your first lock using the form</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}