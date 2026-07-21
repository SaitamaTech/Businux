"use client";
import { motion } from "framer-motion";
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface MetricCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconClassName?: string;
  sparklineData?: { v: number }[];
  sparklineColor?: string;
  delay?: number;
}

export function MetricCard({
  label,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconClassName = "bg-primary/10 text-primary",
  sparklineData,
  sparklineColor = "#4F46E5",
  delay = 0,
}: MetricCardProps) {
  const isPositive = (change ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="transition-shadow hover:shadow-card-hover">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", iconClassName)}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{label}</span>
            </div>
          </div>
          <div className="mt-4 flex items-end justify-between gap-2">
            <div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              {change !== undefined && (
                <div className="mt-1 flex items-center gap-1 text-xs">
                  <span
                    className={cn(
                      "flex items-center gap-0.5 font-medium",
                      isPositive ? "text-success" : "text-destructive"
                    )}
                  >
                    {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {isPositive ? "+" : ""}
                    {change}%
                  </span>
                  <span className="text-muted-foreground">{changeLabel}</span>
                </div>
              )}
            </div>
            {sparklineData && (
              <div className="h-10 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke={sparklineColor}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
