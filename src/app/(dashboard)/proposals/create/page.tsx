"use client";
import { Undo2, Redo2, Eye, Save, ArrowRight, Search, Plus, Share2, Copy, Mail, Download } from "lucide-react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProposalStepTracker } from "@/features/proposals/components/proposal-step-tracker";
import { ProposalTemplateList } from "@/features/proposals/components/proposal-template-list";
import { EditorToolbar } from "@/features/proposals/components/editor-toolbar";
import { AIGenerationStatusCard, VersionHistoryCard, ApprovalFlowCard } from "@/features/proposals/components/proposal-side-cards";
import { useProposalStore } from "@/store/proposal-store";

export default function CreateProposalPage() {
  const { step, title, setTitle } = useProposalStore();

  return (
    <DashboardShell title="Proposal Generator" subtitle="Proposals › Create Proposal">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <ProposalStepTracker current={step} />
        <div className="flex flex-wrap gap-2">
          <Badge variant="success" className="gap-1">Saved</Badge>
          <Button variant="outline" size="sm"><Undo2 className="h-3.5 w-3.5" /></Button>
          <Button variant="outline" size="sm"><Redo2 className="h-3.5 w-3.5" /></Button>
          <Button variant="outline" size="sm"><Eye className="h-3.5 w-3.5" /> Preview</Button>
          <Button variant="outline" size="sm"><Save className="h-3.5 w-3.5" /> Save</Button>
          <Button size="sm">Next: Review <ArrowRight className="h-3.5 w-3.5" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[260px_1fr_300px]">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input aria-label="Search proposal templates" placeholder="Search templates..." className="pl-9" />
          </div>
          <p className="text-xs font-semibold text-muted-foreground">TEMPLATES</p>
          <ProposalTemplateList />
          <Button variant="outline" className="w-full">
            <Plus className="h-4 w-4" /> Create Custom Template
          </Button>
        </div>

        <div className="min-w-0 space-y-4">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-11 text-base font-semibold" />
          <Card>
            <EditorToolbar />
            <CardContent className="max-h-[560px] space-y-4 overflow-y-auto p-6 text-sm leading-relaxed">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <h2 className="text-lg font-bold">AI Integration Solution</h2>
                  <p className="text-muted-foreground">for TechFlow Solutions Ltd.</p>
                </div>
                <Badge variant="default">Businux</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Prepared for: TechFlow Solutions Ltd. · Prepared by: Businux Technologies · Proposal ID: PRO-2025-0526
              </p>

              <h3 className="font-semibold">1. Executive Summary</h3>
              <p>
                We propose an AI-powered solution that will help TechFlow Solutions Ltd. streamline operations, improve
                efficiency, and drive growth. Our solution leverages cutting-edge AI technologies tailored to your unique
                business needs.
              </p>

              <h3 className="font-semibold">2. Challenges</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Manual processes leading to inefficiencies</li>
                <li>Limited data insights for decision making</li>
                <li>High operational costs</li>
                <li>Lack of automation and intelligent workflows</li>
              </ul>

              <h3 className="font-semibold">3. Our Solution</h3>
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <p className="mb-1 flex items-center gap-1.5 font-semibold text-accent">Intelligent Automation</p>
                <p className="text-muted-foreground">Automate repetitive tasks and workflows to improve efficiency and reduce operational costs.</p>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Words: 1250 · Characters: 8230</span>
            <span>Saved 2 minutes ago</span>
          </div>
        </div>

        <div className="space-y-4">
          <AIGenerationStatusCard />
          <VersionHistoryCard />
          <ApprovalFlowCard />
          <Card>
            <CardContent className="space-y-2 p-4">
              <p className="text-sm font-semibold">Share Proposal</p>
              <Button variant="default" size="sm" className="w-full"><Share2 className="h-3.5 w-3.5" /> Share Link</Button>
              <Button variant="outline" size="sm" className="w-full"><Copy className="h-3.5 w-3.5" /> Copy Link</Button>
              <Button variant="outline" size="sm" className="w-full"><Mail className="h-3.5 w-3.5" /> Send Email</Button>
              <Button variant="ai" size="sm" className="w-full"><Download className="h-3.5 w-3.5" /> Export as PDF</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
