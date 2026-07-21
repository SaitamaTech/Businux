import { Users, ShoppingCart, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function AuthDashboardPreview() {
  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute -right-6 -top-6 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
        <Users className="h-5 w-5" />
      </div>
      <div className="absolute -left-8 top-24 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500 text-white shadow-lg">
        <BarChart3 className="h-5 w-5" />
      </div>
      <div className="absolute -right-4 bottom-10 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
        <ShoppingCart className="h-5 w-5" />
      </div>

      <Card className="shadow-popover">
        <CardContent className="p-5 space-y-4">
          <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">₦128,430</span>
              <span className="text-xs font-medium text-success">+12.5%</span>
            </div>
          </div>
          <div className="h-16 rounded-lg bg-gradient-to-t from-primary/10 to-transparent" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Active Customers</p>
              <p className="text-lg font-bold">1,240</p>
              <span className="text-xs text-success">+8.2%</span>
            </div>
            <div className="rounded-lg border border-border p-3">
              <p className="text-xs text-muted-foreground">Tasks</p>
              <p className="text-lg font-bold">24</p>
              <span className="text-xs text-warning">2 Due today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
