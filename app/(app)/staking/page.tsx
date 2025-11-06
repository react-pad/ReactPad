"use client";
import { Input } from "@/components/ui/input";
import { Lock, TrendingUp } from "lucide-react";
import { useState } from "react";

const stakingTiers = [
  { name: "Free", requirement: 0, apr: 4, duration: "Free", selected: false },
  { name: "3 mo.", requirement: 1000, apr: 8, duration: "3 months", selected: true },
  { name: "6 mo.", requirement: 5000, apr: 12, duration: "6 months", selected: false },
  { name: "12 mo.", requirement: 10000, apr: 16, duration: "12 months", selected: false },
];

export default function StakingPage() {
  const [activeTab, setActiveTab] = useState("stake");
  const [selectedTier, setSelectedTier] = useState(1);
  const [stakeAmount, setStakeAmount] = useState("");

  const currentStaked = 30000.99;
  const currentReward = 200.99;
  const currentValue = 3100.99;
  const rewardValue = 200;
  const currentTier = "Bronze";
  const nextTierProgress = 45;
  const nextTierRequirement = 34567;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">STAKING</h1>
          <button className="bg-black text-white font-bold py-4 px-8 text-sm hover:bg-gray-800 transition-all uppercase tracking-wider border-2 border-black">
            EXPLORE ALL
          </button>
        </div>

        {/* Stats Card */}
        <div className="mb-16 border-2 border-black p-8 bg-black text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-wider mb-3">YOU STAKED</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black">{currentStaked.toLocaleString()}</span>
                  <span className="text-xl font-bold">BPAD</span>
                </div>
                <p className="text-sm mt-2 font-light">Value ~${currentValue}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white border-2 border-white flex items-center justify-center">
                  <span className="text-black font-black text-lg">B</span>
                </div>
                <div>
                  <span className="text-sm uppercase">YOUR TIER: </span>
                  <span className="font-black text-xl uppercase">{currentTier}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-wider mb-3">YOUR REWARD</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-black">{currentReward}</span>
                  <span className="text-xl font-bold">BPAD</span>
                </div>
                <p className="text-sm mt-2 font-light">Value ~${rewardValue}</p>
              </div>

              <div>
                <p className="text-sm mb-3 uppercase font-medium">STAKE TO NEXT TIER: {nextTierRequirement.toLocaleString()} ZPAD</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white h-3 border-2 border-white">
                    <div
                      className="bg-gray-400 h-full transition-all duration-300"
                      style={{ width: `${nextTierProgress}%` }}
                    />
                  </div>
                  <span className="text-lg font-black">{nextTierProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Staking Form */}
          <div className="lg:col-span-2">
            <div className="border-2 border-black p-8">
              <div className="flex gap-3 mb-8 items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("stake")}
                    className={`px-6 py-3 font-bold uppercase text-sm transition-all border-2 border-black ${activeTab === "stake"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    STAKE
                  </button>
                  <button
                    onClick={() => setActiveTab("unstake")}
                    className={`px-6 py-3 font-bold uppercase text-sm transition-all border-2 border-black ${activeTab === "unstake"
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                      }`}
                  >
                    UNSTAKE
                  </button>
                </div>
                <Lock className="w-6 h-6" />
              </div>

              {/* Staking Terms */}
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-wider mb-4">SELECT TERM</p>
                <div className="flex flex-wrap gap-3">
                  {stakingTiers.map((tier, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTier(index)}
                      className={`px-5 py-3 text-sm font-bold uppercase transition-all border-2 border-black ${selectedTier === index
                        ? "bg-black text-white"
                        : "bg-white text-black hover:bg-black hover:text-white"
                        }`}
                    >
                      {tier.name} {tier.apr}% APR
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold uppercase tracking-wider">AMOUNT TO STAKE</label>
                  <span className="text-sm font-medium">1 BPAD = $2.35</span>
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                    className="text-3xl h-20 pr-24 border-2 border-black focus:ring-0 focus:border-black font-black"
                  />
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 font-bold text-lg">
                    BPAD
                  </span>
                </div>

                <p className="text-sm mt-2 font-medium">~ $0.00</p>
              </div>

              {/* ROI Info */}
              <div className="mb-8 p-6 border-2 border-black">
                <div className="flex items-center gap-3 text-sm font-medium uppercase">
                  <TrendingUp className="w-5 h-5" />
                  <span>POTENTIAL ROI (IN 1 MONTH): 56.00 BPAD (~$9.99)</span>
                </div>
              </div>

              {/* Stake Button */}
              <button
                className="w-full bg-black text-white h-14 font-bold text-sm uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed border-2 border-black"
                disabled={!stakeAmount || parseFloat(stakeAmount) <= 0}
              >
                STAKE MORE
              </button>
            </div>
          </div>

          {/* Staking Info Sidebar */}
          <div>
            <div className="border-2 border-black p-6">
              <h3 className="text-xl font-black uppercase mb-6 tracking-tight">STAKING INFO</h3>
              <div className="space-y-4 text-sm font-light leading-relaxed">
                <p>
                  Staking tokens on NETZPAD has no upper limit, but to participate in the IDO,
                  you must stake a minimum of 2,000 ZPAD tokens and a maximum of 150,000 NETZ tokens.
                </p>
                <p>
                  The larger your stake and longer you stake for, the greater your allocation
                  will be during the IDO.
                </p>
                <p>
                  You can migrate to a pool with a longer lock-up period. Migration fee is not charged.
                </p>
                <p>
                  You can withdraw funds before the end of the lock-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}