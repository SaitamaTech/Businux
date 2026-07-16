"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNaira } from "@/lib/format";

interface Slice {
  name: string;
  value: number;
  amount: number;
  color: string;
}

export function RevenueByCategoryCard({ data, total, title = "Revenue by Category" }: { data: Slice[]; total: number; title?: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-6">
          <div className="relative h-36 w-36 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} dataKey="value" innerRadius={45} outerRadius={65} paddingAngle={2} strokeWidth={0}>
                  {data.map((d) => (
                    <Cell key={d.name} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">{formatNaira(total, { compact: true })}</span>
              <span className="text-[10px] text-muted-foreground">Total</span>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-2.5">
            {data.map((d) => (
              <div key={d.name} className="flex items-center justify-between gap-2 text-xs">
                <span className="flex min-w-0 items-center gap-2">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="truncate text-muted-foreground">{d.name}</span>
                </span>
                <span className="shrink-0 font-medium">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
