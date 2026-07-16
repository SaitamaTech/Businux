"use client";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { mockCustomers } from "@/services/mock-data";
import { formatNaira } from "@/lib/format";

const statusVariant = { Active: "success", Inactive: "secondary", Lead: "warning" } as const;

export default function CustomersPage() {
  return (
    <DashboardShell title="Customers" subtitle="Manage your customer relationships and deals.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search customers" placeholder="Search customers..." className="pl-9" />
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Add Customer
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCustomers.map((c) => (
          <Link key={c.id} href={`/crm/customers/${c.id}`}>
            <Card className="h-full transition-shadow hover:shadow-card-hover">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{c.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold leading-tight">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.industry}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                    <p className="font-semibold">{formatNaira(c.totalValue, { compact: true })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Deals</p>
                    <p className="font-semibold">{c.totalDeals}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.tags.slice(0, 2).map((t) => (
                    <Badge key={t} variant="outline" className="text-[10px]">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
