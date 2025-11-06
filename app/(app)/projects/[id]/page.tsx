import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const projects = [
  {
    id: "project-alpha",
    name: "Project Alpha",
    description: "A revolutionary new DeFi protocol.",
    raised: "1.2M",
    goal: "5M",
  },
  {
    id: "project-beta",
    name: "Project Beta",
    description: "The next generation of NFT marketplace.",
    raised: "3.5M",
    goal: "10M",
  },
  {
    id: "project-gamma",
    name: "Project Gamma",
    description: "A decentralized social media platform.",
    raised: "800K",
    goal: "2M",
  },
  {
    id: "project-delta",
    name: "Project Delta",
    description: "A privacy-focused layer 2 solution.",
    raised: "2.1M",
    goal: "4M",
  },
  {
    id: "project-epsilon",
    name: "Project Epsilon",
    description: "A decentralized storage network.",
    raised: "500K",
    goal: "1M",
  },
  {
    id: "project-zeta",
    name: "Project Zeta",
    description: "A cross-chain messaging protocol.",
    raised: "1.8M",
    goal: "3M",
  },
];

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

type ProjectDetailPageParams = Promise<{ id: string }>;

interface ProjectDetailPageProps {
  params: ProjectDetailPageParams;
  // Other props if any, e.g., searchParams: Promise<any>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-2">{project.name}</h1>
        <p className="text-xl text-gray-600">{project.description}</p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{project.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Buy Tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Your Allocation</span>
                  <span className="font-bold">1,000 TKN</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Input type="number" placeholder="Amount to buy" className="flex-grow" />
                  <Button>Buy</Button>
                </div>
                <p className="text-xs text-gray-500">
                  Gas estimate: 0.002 ETH. You will receive approximately 995 TKN.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Tokenomics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Token Name</span>
                <span className="font-bold">{project.name} Token</span>
              </div>
              <div className="flex justify-between">
                <span>Ticker</span>
                <span className="font-bold">
                  {project.name.split(" ").map((w) => w[0])}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Supply</span>
                <span className="font-bold">100,000,000</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-bold">$0.10 / TKN</span>
              </div>
              <div className="flex justify-between">
                <span>Soft Cap</span>
                <span className="font-bold">$1,000,000</span>
              </div>
              <div className="flex justify-between">
                <span>Hard Cap</span>
                <span className="font-bold">$5,000,000</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}