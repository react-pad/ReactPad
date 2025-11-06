import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UserDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Dashboard</h1>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Your Participations</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for project list */}
              <p>You have not participated in any projects yet.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transaction Feed</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Placeholder for transaction list */}
              <p>No recent transactions.</p>
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