"use client";
import { useState } from "react";
import { Building2, Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOnboardingStore } from "@/store/onboarding-store";
import { initials } from "@/lib/format";

export function BusinessInformationStep() {
  const { businessInfo, updateBusinessInfo } = useOnboardingStore();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" /> Business Information
        </CardTitle>
        <CardDescription>Basic details about your company.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 pt-0 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Company Name</Label>
          <Input data-tour="company-name" value={businessInfo.companyName} onChange={(e) => updateBusinessInfo({ companyName: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Business Type</Label>
          <Select value={businessInfo.businessType} onValueChange={(v) => updateBusinessInfo({ businessType: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Company">Software Company</SelectItem>
              <SelectItem value="Retail">Retail</SelectItem>
              <SelectItem value="Consulting">Consulting</SelectItem>
              <SelectItem value="Manufacturing">Manufacturing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <Label>Business Address</Label>
          <Input data-tour="business-address" value={businessInfo.address} onChange={(e) => updateBusinessInfo({ address: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Phone Number</Label>
          <Input value={businessInfo.phone} onChange={(e) => updateBusinessInfo({ phone: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Email Address</Label>
          <Input value={businessInfo.email} onChange={(e) => updateBusinessInfo({ email: e.target.value })} />
        </div>
        <div className="space-y-1.5">
          <Label>Number of Employees</Label>
          <Select value={businessInfo.employees} onValueChange={(v) => updateBusinessInfo({ employees: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="1 – 10 employees">1 – 10 employees</SelectItem>
              <SelectItem value="25 – 50 employees">25 – 50 employees</SelectItem>
              <SelectItem value="50 – 200 employees">50 – 200 employees</SelectItem>
              <SelectItem value="200+ employees">200+ employees</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export function StaffDistributionStep() {
  const { staff, addStaff, removeStaff } = useOnboardingStore();
  const [newStaff, setNewStaff] = useState({ name: "", position: "", department: "" });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Staff Distribution</CardTitle>
            <CardDescription>Add your team members. You can add unlimited staff.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/50 text-left text-xs text-muted-foreground">
                  <th className="px-4 py-2.5 font-medium">Employee Name</th>
                  <th className="px-4 py-2.5 font-medium">Position</th>
                  <th className="px-4 py-2.5 font-medium">Department</th>
                  <th className="px-4 py-2.5 font-medium">Salary (Optional)</th>
                  <th className="px-4 py-2.5 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0">
                    <td className="flex items-center gap-2 px-4 py-2.5">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="text-xs">{initials(m.name)}</AvatarFallback>
                      </Avatar>
                      {m.name}
                    </td>
                    <td className="px-4 py-2.5">{m.position}</td>
                    <td className="px-4 py-2.5">{m.department}</td>
                    <td className="px-4 py-2.5">{m.salary ?? "—"}</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <button
                          aria-label={`Edit ${m.name}`}
                          className="rounded-sm hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                        <button
                          data-tour="remove-staff"
                          onClick={() => removeStaff(m.id)}
                          aria-label={`Remove ${m.name}`}
                          className="rounded-sm hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-2">
                    <Input data-tour="input-staff-name" aria-label="New staff member name" placeholder="Name" value={newStaff.name} onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })} className="h-9" />
                  </td>
                  <td className="px-4 py-2">
                    <Input data-tour="input-staff-position" aria-label="New staff member position" placeholder="Position" value={newStaff.position} onChange={(e) => setNewStaff({ ...newStaff, position: e.target.value })} className="h-9" />
                  </td>
                  <td className="px-4 py-2">
                    <Input aria-label="New staff member department" placeholder="Department" value={newStaff.department} onChange={(e) => setNewStaff({ ...newStaff, department: e.target.value })} className="h-9" />
                  </td>
                  <td colSpan={2} className="px-4 py-2">
                    <Button
                      size="sm"
                      variant="outline"
                        data-tour="add-staff"
                        disabled={!newStaff.name || !newStaff.position}
                        onClick={() => {
                          addStaff(newStaff);
                          setNewStaff({ name: "", position: "", department: "" });
                        }}
                    >
                      <Plus className="h-3.5 w-3.5" /> Add Staff
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
