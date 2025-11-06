"use client";
import { useState } from "react";
import Link from "next/link";

const proposals = [
  {
    id: 1,
    title: "INCREASE STAKING REWARDS",
    description: "Proposal to increase staking rewards by 5% for all tiers to incentivize long-term holders",
    votesFor: 12500,
    votesAgainst: 3200,
    status: "active",
    endTime: "2 days left"
  },
  {
    id: 2,
    title: "NEW PROJECT LISTING: QUANTUMCHAIN",
    description: "Approve QuantumChain for listing on the launchpad with dedicated allocation",
    votesFor: 8900,
    votesAgainst: 2100,
    status: "active",
    endTime: "5 days left"
  },
  {
    id: 3,
    title: "GOVERNANCE STRUCTURE REFORM",
    description: "Implement new governance token distribution model with quadratic voting",
    votesFor: 15000,
    votesAgainst: 5000,
    status: "passed",
    endTime: "Ended"
  },
  {
    id: 4,
    title: "REDUCE TRANSACTION FEES",
    description: "Lower platform transaction fees from 2% to 1.5% for all trades",
    votesFor: 9800,
    votesAgainst: 8200,
    status: "active",
    endTime: "3 days left"
  },
  {
    id: 5,
    title: "IMPLEMENT NFT MARKETPLACE",
    description: "Launch integrated NFT marketplace for project collectibles and rewards",
    votesFor: 18500,
    votesAgainst: 3500,
    status: "passed",
    endTime: "Ended"
  },
  {
    id: 6,
    title: "TREASURY DIVERSIFICATION",
    description: "Allocate 20% of treasury to stablecoins for reduced volatility",
    votesFor: 5200,
    votesAgainst: 11800,
    status: "rejected",
    endTime: "Ended"
  },
  {
    id: 7,
    title: "COMMUNITY GRANTS PROGRAM",
    description: "Establish $500K quarterly grants program for ecosystem development",
    votesFor: 14200,
    votesAgainst: 4800,
    status: "active",
    endTime: "1 day left"
  },
  {
    id: 8,
    title: "MULTI-CHAIN EXPANSION",
    description: "Deploy platform contracts on Polygon and Arbitrum networks",
    votesFor: 16700,
    votesAgainst: 2300,
    status: "passed",
    endTime: "Ended"
  },
  {
    id: 9,
    title: "REFERRAL REWARDS PROGRAM",
    description: "Introduce 5% referral bonus for bringing new projects to platform",
    votesFor: 10500,
    votesAgainst: 6500,
    status: "active",
    endTime: "6 days left"
  },
  {
    id: 10,
    title: "WHITELIST REQUIREMENTS",
    description: "Increase minimum stake requirement for whitelist access to 10,000 tokens",
    votesFor: 4100,
    votesAgainst: 13900,
    status: "rejected",
    endTime: "Ended"
  },
  {
    id: 11,
    title: "WEEKLY TOKEN BURNS",
    description: "Implement weekly token burn mechanism using 50% of platform fees",
    votesFor: 19200,
    votesAgainst: 1800,
    status: "passed",
    endTime: "Ended"
  },
  {
    id: 12,
    title: "MOBILE APP DEVELOPMENT",
    description: "Allocate budget for native iOS and Android application development",
    votesFor: 11300,
    votesAgainst: 5700,
    status: "active",
    endTime: "4 days left"
  }
];

export default function VotingPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'passed' | 'rejected'>('all');

  const filteredProposals = proposals.filter(proposal => {
    if (filter === 'all') return true;
    return proposal.status === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-[#7DF9FF]';
      case 'passed': return 'bg-[#2FFF2F]';
      case 'rejected': return 'bg-[#FF00F5]';
      default: return 'bg-[#FFF9F0]';
    }
  };

  return (
    <div className="bg-[#FFF9F0] min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 tracking-tight">
            GOVERNANCE<br />VOTING
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-2xl">
            Shape the future of the platform. Your stake, your voice.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 flex-wrap">
          {(['all', 'active', 'passed', 'rejected'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 font-black uppercase text-sm tracking-wider border-4 border-black transition-all ${
                filter === filterOption
                  ? 'bg-black text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]'
                  : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {filteredProposals.map((proposal) => {
            const totalVotes = proposal.votesFor + proposal.votesAgainst;
            const forPercentage = (proposal.votesFor / totalVotes) * 100;
            const againstPercentage = (proposal.votesAgainst / totalVotes) * 100;

            return (
              <Link href={`/voting/${proposal.id}`} key={proposal.id}>
                <div className="border-4 border-black p-8 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200">
                  <div className="flex items-start justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <h2 className="text-3xl font-black uppercase mb-3 tracking-tight">
                        {proposal.title}
                      </h2>
                      <p className="text-lg font-medium">{proposal.description}</p>
                    </div>
                    <span className={`px-4 py-2 text-sm font-black uppercase tracking-wider border-2 border-black ${getStatusColor(proposal.status)} text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] shrink-0`}>
                      {proposal.status}
                    </span>
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between text-sm font-black uppercase mb-2">
                      <span>FOR: {proposal.votesFor.toLocaleString()} ({forPercentage.toFixed(1)}%)</span>
                      <span>AGAINST: {proposal.votesAgainst.toLocaleString()} ({againstPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="flex h-6 border-2 border-black">
                      <div
                        className="bg-[#2FFF2F] transition-all relative"
                        style={{ width: `${forPercentage}%` }}
                      >
                        {forPercentage > 10 && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-black">
                            {forPercentage.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div
                        className="bg-[#FF00F5] transition-all relative"
                        style={{ width: `${againstPercentage}%` }}
                      >
                        {againstPercentage > 10 && (
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                            {againstPercentage.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-wider">{proposal.endTime}</span>
                    {proposal.status === 'active' && (
                        <button
                          className={`px-6 py-3 text-sm font-black uppercase border-4 border-black transition-all bg-[#7DF9FF] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                        >
                          VOTE
                        </button>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-4 border-black p-6 bg-[#7DF9FF] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase tracking-wider mb-2">Active Proposals</div>
            <div className="text-5xl font-black">{proposals.filter(p => p.status === 'active').length}</div>
          </div>
          <div className="border-4 border-black p-6 bg-[#2FFF2F] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase tracking-wider mb-2">Passed</div>
            <div className="text-5xl font-black">{proposals.filter(p => p.status === 'passed').length}</div>
          </div>
          <div className="border-4 border-black p-6 bg-[#FF00F5] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-black uppercase tracking-wider mb-2 text-white">Rejected</div>
            <div className="text-5xl font-black text-white">{proposals.filter(p => p.status === 'rejected').length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
