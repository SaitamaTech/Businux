"use client";

import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useToast } from "@/components/providers/toast-provider";
import type { Deal } from "@/types";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreateItemDialog } from "@/components/shared/create-item-dialog";
import { crmApi } from "@/services/api/crm";

export default function DealsPage() {
  const qc = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const { data: deals, isLoading } = useQuery<Deal[], Error>({ queryKey: ["deals"], queryFn: () => crmApi.listDeals() });

  return (
    <DashboardShell title="Deals" subtitle="Sales pipeline and opportunities.">
      <div className="mb-4 flex justify-end">
        <CreateItemDialog
          triggerLabel="New Deal"
          title="Create Deal"
          description="Add a new sales opportunity."
          fields={[{ name: "title", label: "Title", required: true, placeholder: "Deal title" }, { name: "value", label: "Value", type: "number", placeholder: "Amount" }]}
          onSubmit={async (values) => {
            await crmApi.createDeal({ title: values.title, value: Number(values.value ?? 0), stage: "Lead", customerId: "" });
            qc.invalidateQueries({ queryKey: ["deals"] });
            toast.success({ title: "Deal created", description: `${values.title} was created.` });
            setPage(1);
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full animate-pulse bg-muted/40"><CardContent className="p-5">&nbsp;</CardContent></Card>
        ))}

        {!isLoading && (deals ?? []).slice((page - 1) * pageSize, page * pageSize).map((d) => (
          <Link key={d.id} href={`/crm/deals/${d.id}`}>
            <Card className="h-full">
              <CardContent>
                <p className="font-semibold">{d.title}</p>
                <p className="text-sm text-muted-foreground">Stage: {d.stage}</p>
                <p className="text-sm text-muted-foreground">Value: {d.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Page {page} of {Math.max(1, Math.ceil((deals?.length ?? 0) / pageSize))}</div>
        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border px-2 py-1 text-sm">
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </select>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <Button variant="outline" disabled={page >= Math.ceil((deals?.length ?? 0) / pageSize)} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
