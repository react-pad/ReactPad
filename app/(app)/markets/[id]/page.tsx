import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { SwapForm } from "@/components/ui/swap-form";

const markets = [
  {
    id: "solana-nexus",
    name: "Solana Nexus",
    symbol: "SNX",
    logo: "https://placehold.co/60x60/8B5CF6/FFFFFF?text=SNX",
    creator: "solman",
    marketCap: 1250000,
    price: 1.25,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    pairAddress: "solana/SOL-SNX-pair-address" // Example pair address
  },
  {
    id: "bonk-inu",
    name: "Bonk Inu",
    symbol: "BONK",
    logo: "https://placehold.co/60x60/2563EB/FFFFFF?text=BONK",
    creator: "bonk-master",
    marketCap: 850000000,
    price: 0.000028,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    pairAddress: "solana/SOL-BONK-pair-address"
  },
  {
    id: "cat-coin",
    name: "Cat Coin",
    symbol: "CAT",
    logo: "https://placehold.co/60x60/06B6D4/FFFFFF?text=CAT",
    creator: "cat-lover",
    marketCap: 500000,
    price: 0.05,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
    pairAddress: "solana/SOL-CAT-pair-address"
  },
  {
    id: "doge-killer",
    name: "Doge Killer",
    symbol: "LEASH",
    logo: "https://placehold.co/60x60/EC4899/FFFFFF?text=LEASH",
    creator: "shytoshi",
    marketCap: 25000000,
    price: 250,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    pairAddress: "solana/SOL-LEASH-pair-address"
  },
];

export async function generateStaticParams() {
  return markets.map((market) => ({
    id: market.id,
  }));
}

interface MarketDetailPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MarketDetailPage({ params }: MarketDetailPageProps) {
  const { id } = await params;
  const market = markets.find((m) => m.id === id);

  if (!market) {
    return <div>Market not found</div>;
  }

  const dexScreenerUrl = `https://dexscreener.com/${market.pairAddress}?embed=1&theme=dark&info=0`;

  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <section className="mb-8 flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={market.logo} alt={`${market.name} logo`} />
          <AvatarFallback>{market.symbol.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">{market.name} ({market.symbol})</h1>
          <p className="text-lg text-gray-500">Created by @{market.creator}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className="w-full h-[600px] overflow-hidden">
                <iframe 
                    src={dexScreenerUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                ></iframe>
            </Card>
        </div>

        <div>
          <SwapForm />
        </div>
      </div>
    </div>
  );
}
