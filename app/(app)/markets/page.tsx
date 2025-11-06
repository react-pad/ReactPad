"use client"
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { MarketCard, type Market } from "@/components/ui/market-card";

const markets: Market[] = [
  {
    id: "solana-nexus",
    name: "Solana Nexus",
    symbol: "SNX",
    logo: "https://placehold.co/60x60/8B5CF6/FFFFFF?text=SNX",
    creator: "solman",
    marketCap: 1250000,
    price: 1.25,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: "bonk-inu",
    name: "Bonk Inu",
    symbol: "BONK",
    logo: "https://placehold.co/60x60/2563EB/FFFFFF?text=BONK",
    creator: "bonk-master",
    marketCap: 850000000,
    price: 0.000028,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
  },
  {
    id: "cat-coin",
    name: "Cat Coin",
    symbol: "CAT",
    logo: "https://placehold.co/60x60/06B6D4/FFFFFF?text=CAT",
    creator: "cat-lover",
    marketCap: 500000,
    price: 0.05,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: "doge-killer",
    name: "Doge Killer",
    symbol: "LEASH",
    logo: "https://placehold.co/60x60/EC4899/FFFFFF?text=LEASH",
    creator: "shytoshi",
    marketCap: 25000000,
    price: 250,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "New Launches", value: "new" },
  { label: "Top Market Cap", value: "top" },
];

export default function MarketsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedMarkets = [...markets].sort((a, b) => {
    switch (activeFilter) {
      case "new":
        return b.createdAt.getTime() - a.createdAt.getTime();
      case "top":
        return b.marketCap - a.marketCap;
      default:
        return 0; // No specific sort for "all"
    }
  });

  const filteredMarkets = sortedMarkets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      market.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="mb-20">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black uppercase leading-none mb-6 tracking-tight">
            Live<br />Markets
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl">
            Discover and trade the latest tokens on the Solana network.
          </p>
        </div>

        <div className="mb-16 space-y-6">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black w-6 h-6" />
            <Input
              placeholder="SEARCH MARKETS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-16 w-full h-16 text-lg border-2 border-black focus:ring-0 focus:border-black font-medium uppercase placeholder:text-gray-400"
            />
          </div>
          <div className="flex items-center gap-3">
            {filterOptions.map(filter => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-2 border-black transition-all ${activeFilter === filter.value
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard market={market} key={market.id} />
          ))}
        </div>
      </div>
    </div>
  );
}