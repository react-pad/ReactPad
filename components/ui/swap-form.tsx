"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown } from 'lucide-react';

export function SwapForm() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  // Dummy conversion rate
  const conversionRate = 1250.5;

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setFromAmount(amount);
    if (amount && !isNaN(parseFloat(amount))) {
      setToAmount((parseFloat(amount) * conversionRate).toString());
    } else {
      setToAmount('');
    }
  };

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value;
    setToAmount(amount);
    if (amount && !isNaN(parseFloat(amount))) {
      setFromAmount((parseFloat(amount) / conversionRate).toString());
    } else {
      setFromAmount('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Swap Tokens</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="from-token">You Pay</Label>
          <div className="relative">
            <Input
              id="from-token"
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={handleFromAmountChange}
              className="pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-bold text-sm">SOL</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">Balance: 12.5 SOL</p>
        </div>

        <div className="flex justify-center -my-3 z-10">
            <Button variant="outline" size="icon" className="rounded-full bg-white">
                <ArrowDown className="h-4 w-4" />
            </Button>
        </div>

        <div className="space-y-2">
          <Label htmlFor="to-token">You Receive</Label>
          <div className="relative">
            <Input
              id="to-token"
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={handleToAmountChange}
              className="pr-20"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <span className="font-bold text-sm">SNX</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 text-right">Balance: 2,345 SNX</p>
        </div>

        <Button className="w-full">Connect Wallet</Button>

        <div className="text-xs text-gray-500 space-y-1">
            <div className="flex justify-between">
                <span>Price</span>
                <span>1 SOL = 1,250.5 SNX</span>
            </div>
            <div className="flex justify-between">
                <span>Slippage Tolerance</span>
                <span>0.5%</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
