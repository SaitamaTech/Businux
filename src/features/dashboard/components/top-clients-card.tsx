import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatNaira } from "@/lib/format";
import { mockCustomers } from "@/services/mock-data";

export function TopClientsCard() {
  const clients = [...mockCustomers].sort((a, b) => b.totalValue - a.totalValue);
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Top Clients</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {clients.map((c) => (
          <div key={c.id} className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">{c.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="min-w-0 flex-1 truncate text-sm font-medium">{c.name}</span>
            <span className="shrink-0 text-sm font-semibold">{formatNaira(c.totalValue, { compact: true })}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
