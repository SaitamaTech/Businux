"use client";

import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Contact } from "@/types";
import { useEffect } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { crmApi } from "@/services/api/crm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useToast } from "@/components/providers/toast-provider";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const qc = useQueryClient();
  const router = useRouter();
  const { data: contact, isLoading } = useQuery<Contact | null, Error>({
    queryKey: ["contact", id],
    queryFn: () => crmApi.getContact(id),
  });

  const toast = useToast();

  const deleteMutation = useMutation<void, Error, void>({
    mutationFn: () => crmApi.deleteContact(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["contacts"] });
      router.push("/crm/contacts");
      toast.success({ title: "Contact deleted", description: "The contact was removed." });
    },
    onError: () => toast.error({ title: "Delete failed", description: "Unable to delete contact." }),
  });

  const updateMutation = useMutation<Contact, Error, Partial<Contact>>({
    mutationFn: (payload) => crmApi.updateContact(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contacts"] }),
  });

  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  useEffect(() => {
    if (contact) setValues({ firstName: contact.firstName ?? "", lastName: contact.lastName ?? "", email: contact.email ?? "", phone: contact.phone ?? "" });
  }, [contact]);

  if (isLoading) return <DashboardShell title="Contact">Loading...</DashboardShell>;
  if (!contact) return <DashboardShell title="Contact">Not found</DashboardShell>;

  return (
    <DashboardShell title={`${contact.firstName} ${contact.lastName}`} subtitle="CRM › Contacts">
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!editing ? (
              <div className="space-y-2">
                <p className="font-semibold">{contact.firstName} {contact.lastName}</p>
                <p className="text-sm text-muted-foreground">{contact.email}</p>
                <p className="text-sm text-muted-foreground">{contact.phone}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" onClick={() => setEditing(true)}>Edit</Button>
                  <ConfirmDialog
                    trigger={<Button variant="destructive">Delete</Button>}
                    title="Delete contact"
                    description="Are you sure you want to permanently delete this contact?"
                    confirmLabel="Delete"
                    onConfirm={() => deleteMutation.mutate()}
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); updateMutation.mutate(values); setEditing(false); }} className="space-y-2">
                <Input value={values.firstName} onChange={(e) => setValues((s) => ({ ...s, firstName: e.target.value }))} />
                <Input value={values.lastName} onChange={(e) => setValues((s) => ({ ...s, lastName: e.target.value }))} />
                <Input value={values.email} onChange={(e) => setValues((s) => ({ ...s, email: e.target.value }))} />
                <Input value={values.phone} onChange={(e) => setValues((s) => ({ ...s, phone: e.target.value }))} />
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
