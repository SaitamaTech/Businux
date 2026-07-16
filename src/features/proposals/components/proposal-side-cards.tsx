import { CheckCircle2, Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const versions = [
  { v: "1.3", date: "May 26, 10:30 AM", author: "John CEO", current: true },
  { v: "1.2", date: "May 25, 4:15 PM", author: "Sarah Johnson" },
  { v: "1.1", date: "May 24, 11:20 AM", author: "John CEO" },
  { v: "1.0", date: "May 23, 9:00 AM", author: "John CEO" },
];

const approvers = [
  { name: "John CEO (You)", role: "Proposal Owner", status: "Approved" },
  { name: "Sarah Johnson", role: "Project Manager", status: "Pending" },
  { name: "Michael Brown", role: "Head of Sales", status: "Pending" },
  { name: "Client", role: "Final Approval", status: "Pending" },
];

export function AIGenerationStatusCard() {
  const sections = ["Executive Summary", "Challenges", "Proposed Solution", "Implementation Plan", "Pricing & Timeline", "Terms & Conditions"];
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-accent" /> AI Generation
        </CardTitle>
        <Badge variant="success">Completed</Badge>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <p className="mb-1 text-xs text-muted-foreground">AI has generated content for all sections based on your requirements.</p>
        {sections.map((s) => (
          <div key={s} className="flex items-center gap-2 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {s}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function VersionHistoryCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Version History</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-2.5 pt-0">
        {versions.map((v) => (
          <div key={v.v} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="font-medium">Version {v.v} <span className="font-normal text-muted-foreground">· {v.author}</span></p>
                <p className="text-muted-foreground">{v.date}</p>
              </div>
            </div>
            {v.current && <Badge variant="default" className="text-[10px]">Current</Badge>}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function ApprovalFlowCard() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle>Approval Flow</CardTitle>
        <button className="text-xs font-medium text-primary hover:underline">View all</button>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {approvers.map((a) => (
          <div key={a.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px]">{a.name.slice(0, 1)}</AvatarFallback></Avatar>
              <div>
                <p className="text-xs font-medium">{a.name}</p>
                <p className="text-[11px] text-muted-foreground">{a.role}</p>
              </div>
            </div>
            <Badge variant={a.status === "Approved" ? "success" : "warning"} className="text-[10px]">{a.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
