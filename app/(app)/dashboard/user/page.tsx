import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const participations = [
  {
    id: "etherium-nexus",
    projectName: "Etherium Nexus",
    amountInvested: 500, // in USD
    tokenAmount: 2500,
    tokenSymbol: "ENX",
    status: "Live",
  },
  {
    id: "cipher-crest",
    projectName: "CipherCrest",
    amountInvested: 1200,
    tokenAmount: 6000,
    tokenSymbol: "CCX",
    status: "Completed",
  },
];

const transactions = [
  {
    id: "txn-1",
    type: "Invest",
    description: "Invested in Etherium Nexus",
    amount: "-500 USDC",
    timestamp: "2 hours ago",
  },
  {
    id: "txn-2",
    type: "Swap",
    description: "Swapped SOL for SNX",
    amount: "+1,250.5 SNX",
    timestamp: "1 day ago",
  },
  {
    id: "txn-3",
    type: "Withdraw",
    description: "Withdrew staking rewards",
    amount: "+150 USDC",
    timestamp: "3 days ago",
  },
  {
    id: "txn-4",
    type: "Invest",
    description: "Invested in CipherCrest",
    amount: "-1200 USDC",
    timestamp: "1 week ago",
  },
];

export default function UserDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12 text-black">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Participations</CardTitle>
            </CardHeader>
            <CardContent>
              {participations.length > 0 ? (
                <div className="space-y-6">
                  {participations.map((p) => (
                    <div key={p.id} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{p.projectName}</h3>
                        <p className="text-sm text-gray-500">
                          Invested ${p.amountInvested} for {p.tokenAmount} {p.tokenSymbol}
                        </p>
                      </div>
                      <Badge variant={p.status === "Live" ? "default" : "secondary"}>
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p>You have not participated in any projects yet.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Feed</CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-4">
                  {transactions.map((t) => (
                    <div key={t.id} className="flex justify-between items-center">
                      <div>
                        <span className={`font-bold pr-2 ${t.type === 'Invest' ? 'text-red-500' : 'text-green-500'}`}>{t.type}</span>
                        <span>{t.description}</span>
                        <p className="text-xs text-gray-500 pt-1">{t.timestamp}</p>
                      </div>
                      <span className="font-mono text-sm">{t.amount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No recent transactions.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>KYC Status</span>
                <span className="font-bold text-green-600">Verified</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Staking Tier</span>
                <span className="font-bold">Bronze</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}