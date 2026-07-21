"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/providers/toast-provider";
import type { Contact } from "@/types";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { CreateItemDialog } from "@/components/shared/create-item-dialog";
import { crmApi } from "@/services/api/crm";
import { Button } from "@/components/ui/button";

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);

  const { data: contacts, isLoading, isError } = useQuery<Contact[], Error>({
    queryKey: ["contacts", { search }],
    queryFn: () => crmApi.listContacts(),
  });

  return (
    <DashboardShell title="Contacts" subtitle="People and contacts linked to your customers.">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input aria-label="Search contacts" placeholder="Search contacts..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <CreateItemDialog
          triggerLabel="Add Contact"
          title="Create Contact"
          description="Add a new contact linked to a company."
          fields={[
            { name: "firstName", label: "First name", required: true, placeholder: "First name" },
            { name: "lastName", label: "Last name", required: true, placeholder: "Last name" },
            { name: "email", label: "Email", placeholder: "Email" },
            { name: "phone", label: "Phone", placeholder: "Phone" },
          ]}
          onSubmit={async (values) => {
            await crmApi.createContact({ firstName: values.firstName, lastName: values.lastName, email: values.email, phone: values.phone });
            queryClient.invalidateQueries({ queryKey: ["contacts"] });
            toast.success({ title: "Contact created", description: `${values.firstName} ${values.lastName} was added.` });
            setPage(1);
          }}
        />
      </div>

      {isError && <div className="text-sm text-destructive">Failed to load contacts.</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full animate-pulse bg-muted/40">
            <CardContent className="p-5">&nbsp;</CardContent>
          </Card>
        ))}

        {!isLoading && (contacts ?? []).slice((page - 1) * pageSize, page * pageSize).map((c) => (
          <Card key={c.id} className="h-full">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{(c.firstName ?? c.lastName ?? "").slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{c.firstName} {c.lastName}</p>
                  <p className="text-xs text-muted-foreground">{c.email ?? c.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Page {page} of {Math.max(1, Math.ceil((contacts?.length ?? 0) / pageSize))}</div>
        <div className="flex items-center gap-2">
          <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }} className="rounded border px-2 py-1 text-sm">
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </select>
          <div className="flex gap-2">
            <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</Button>
            <Button variant="outline" disabled={page >= Math.ceil((contacts?.length ?? 0) / pageSize)} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
