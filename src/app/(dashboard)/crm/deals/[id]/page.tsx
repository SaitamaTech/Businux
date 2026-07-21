"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Deal } from "@/types";
import { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { crmApi } from "@/services/api/crm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useToast } from "@/components/providers/toast-provider";

export default function DealDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const qc = useQueryClient();
  const { data: deal, isLoading } = useQuery<Deal | null, Error>({ queryKey: ["deal", id], queryFn: () => crmApi.getDeal(id) });

  const toast = useToast();

  const deleteMutation = useMutation<void, Error, void>({
    mutationFn: () => crmApi.deleteDeal(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["deals"] });
      router.push("/crm/deals");
      toast.success({ title: "Deal deleted", description: "The deal was removed." });
    },
    onError: () => toast.error({ title: "Delete failed", description: "Unable to delete deal." }),
  });

  const updateMutation = useMutation<Deal, Error, Partial<Deal>>({ mutationFn: (payload) => crmApi.updateDeal(id, payload), onSuccess: () => qc.invalidateQueries({ queryKey: ["deals"] }) });

  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({ title: "", value: "" });

  useEffect(() => {
    if (deal) setValues({ title: deal.title ?? "", value: String(deal.value ?? "") });
  }, [deal]);

  if (isLoading) return <DashboardShell title="Deal">Loading...</DashboardShell>;
  if (!deal) return <DashboardShell title="Deal">Not found</DashboardShell>;

  return (
    <DashboardShell title={deal.title} subtitle="CRM › Deals">
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Deal Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!editing ? (
              <div className="space-y-2">
                <p className="font-semibold">{deal.title}</p>
                <p className="text-sm text-muted-foreground">Stage: {deal.stage}</p>
                <p className="text-sm text-muted-foreground">Value: {deal.value}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>
                  <Button variant="destructive" onClick={() => { if (confirm('Delete this deal?')) deleteMutation.mutate(); }}>Delete</Button>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate({ title: values.title, value: Number(values.value) }); setEditing(false); }} className="space-y-2">
                <Input value={values.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, title: e.target.value }))} />
                <Input value={values.value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValues((s) => ({ ...s, value: e.target.value }))} />
                <div className="mt-4 flex gap-2">
                  <Button type="submit">Save</Button>
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
