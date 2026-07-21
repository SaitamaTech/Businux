import { Mail, Phone, Calendar, MoreHorizontal, Star, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "@/lib/format";
import type { Customer } from "@/types";

export function CustomerProfileHeader({ customer }: { customer: Customer }) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="text-lg">{customer.name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-1 text-muted-foreground">
            <button
              aria-label="Add to favorites"
              className="rounded-sm hover:text-warning focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <Star className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              aria-label="More options"
              className="rounded-sm hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-lg font-bold">{customer.name}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <Badge variant="success">{customer.status}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{customer.industry}</p>

        <div className="mt-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1"><Mail className="h-3.5 w-3.5" /> Email</Button>
          <Button size="sm" variant="outline" className="flex-1"><Phone className="h-3.5 w-3.5" /> Call</Button>
          <Button size="sm" variant="outline" className="flex-1"><Calendar className="h-3.5 w-3.5" /> Meet</Button>
        </div>

        <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <Row label="Customer Since" value={formatDate(customer.customerSince)} />
          <Row label="Industry" value={customer.industry} />
          <Row label="Company Size" value="25 – 50 employees" />
          <Row
            label="Website"
            value={
              <a href="#" className="flex items-center gap-1 text-primary hover:underline">
                Visit site <ExternalLink className="h-3 w-3" />
              </a>
            }
          />
          <Row label="Phone" value={customer.phone} />
          <Row label="Email" value={customer.email} />
          <Row label="Address" value={customer.address} />
        </div>

        <div className="mt-5 border-t border-border pt-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Tags</p>
          <div className="flex flex-wrap gap-1.5">
            {customer.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
            <button className="text-xs font-medium text-primary hover:underline">+ Add Tag</button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
