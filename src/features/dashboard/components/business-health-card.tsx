"use client";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  { label: "Cash Flow", rating: "Excellent", color: "text-success" },
  { label: "Profitability", rating: "Good", color: "text-success" },
  { label: "Efficiency", rating: "Excellent", color: "text-success" },
  { label: "Growth", rating: "Good", color: "text-success" },
  { label: "Risk Level", rating: "Low", color: "text-warning" },
];

export function BusinessHealthCard({ score = 87 }: { score?: number }) {
  const data = [{ value: score, fill: "#10B981" }];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Health Score</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-6">
          <div className="relative h-28 w-28 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="75%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" background={{ fill: "#F1F5F9" }} cornerRadius={20} max={100} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{score}</span>
              <span className="text-[10px] text-muted-foreground">/100</span>
            </div>
          </div>
          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-sm font-semibold text-success">Excellent</p>
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{m.label}</span>
                <span className={`font-medium ${m.color}`}>{m.rating}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Your business is performing great! Keep up the momentum.</p>
      </CardContent>
    </Card>
  );
}
