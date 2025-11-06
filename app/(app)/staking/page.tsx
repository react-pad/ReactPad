"use client";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function StakingPage() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  // Mock data - in a real app, this would come from a wallet connection and contract calls
  const [stakedBalance, setStakedBalance] = useState(30000.99);
  const [walletBalance, setWalletBalance] = useState(12345.67);
  const rewards = 200.99;

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0 || amount > walletBalance) {
      toast.error("Invalid deposit amount.");
      return;
    }
    setStakedBalance(stakedBalance + amount);
    setWalletBalance(walletBalance - amount);
    toast.success(`Successfully deposited ${amount} BPAD.`);
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0 || amount > stakedBalance) {
      toast.error("Invalid withdraw amount.");
      return;
    }
    setStakedBalance(stakedBalance - amount);
    setWalletBalance(walletBalance + amount);
    toast.success(`Successfully withdrew ${amount} BPAD.`);
    setWithdrawAmount("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
            DEPOSIT & STAKE
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Deposit your BPAD tokens to earn rewards and participate in governance.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="border-2 border-black p-8 bg-gray-100">
            <p className="text-sm font-medium uppercase tracking-wider mb-3">YOU STAKED</p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black">{stakedBalance.toLocaleString()}</span>
              <span className="text-xl font-bold">BPAD</span>
            </div>
          </div>
          <div className="border-2 border-black p-8 bg-gray-100">
            <p className="text-sm font-medium uppercase tracking-wider mb-3">YOUR REWARDS</p>
            <div className="flex items-baseline gap-3">
              <span className="text-6xl font-black">{rewards.toLocaleString()}</span>
              <span className="text-xl font-bold">BPAD</span>
            </div>
          </div>
        </div>

        {/* Deposit/Withdraw Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Deposit Card */}
          <div className="border-2 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-6">DEPOSIT BPAD</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold uppercase tracking-wider">AMOUNT</label>
                <span className="text-sm font-medium">Balance: {walletBalance.toLocaleString()} BPAD</span>
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-3xl h-20 border-2 border-black focus:ring-0 focus:border-black font-black"
              />
            </div>
            <button
              onClick={handleDeposit}
              className="w-full bg-black text-white h-14 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
              disabled={!depositAmount || parseFloat(depositAmount) <= 0}
            >
              DEPOSIT
            </button>
          </div>

          {/* Withdraw Card */}
          <div className="border-2 border-black p-8">
            <h2 className="text-3xl font-black uppercase mb-6">WITHDRAW BPAD</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold uppercase tracking-wider">AMOUNT</label>
                <span className="text-sm font-medium">Staked: {stakedBalance.toLocaleString()} BPAD</span>
              </div>
              <Input
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="text-3xl h-20 border-2 border-black focus:ring-0 focus:border-black font-black"
              />
            </div>
            <button
              onClick={handleWithdraw}
              className="w-full bg-black text-white h-14 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0}
            >
              WITHDRAW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}