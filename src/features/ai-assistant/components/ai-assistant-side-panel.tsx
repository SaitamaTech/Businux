import { Brain, Lightbulb, Clock, FileText, Wrench, Database, Search, Code2, BarChart3, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const memory = [
  "Knows your business as TechFlow Solutions Ltd.",
  "Remembers your goal to increase revenue by 30%",
  "Last discussed marketing strategy",
  "Prefers reports in visual format with key insights",
];

const suggestions = [
  { title: "Analyze our Q2 forecast", desc: "Get predictive insights for next quarter" },
  { title: "Compare with last quarter", desc: "See detailed quarter-over-quarter analysis" },
  { title: "Customer retention analysis", desc: "Identify key retention opportunities" },
];

const history = [
  { title: "Summary of business performance", time: "Today, 10:30 AM" },
  { title: "Marketing strategy recommendations", time: "May 25" },
  { title: "Cash flow analysis", time: "May 24" },
];

const documents = [
  { title: "Business Performance Report", type: "PDF", icon: FileText },
  { title: "Revenue Analysis Dashboard", type: "Excel", icon: BarChart3 },
  { title: "Marketing Strategy Plan", type: "DOCX", icon: FileText },
];

const tools = [
  { label: "Data Analyzer", icon: Database },
  { label: "Web Search", icon: Search },
  { label: "Code Interpreter", icon: Code2 },
  { label: "Chart Generator", icon: BarChart3 },
  { label: "Email Sender", icon: Mail },
];

export function AIAssistantSidePanel() {
  return (
    <div className="scrollbar-thin hidden w-80 shrink-0 space-y-5 overflow-y-auto border-l border-border p-4 xl:block">
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <Brain className="h-4 w-4 text-accent" /> AI Memory
          </CardTitle>
          <button className="text-xs font-medium text-primary hover:underline">View all</button>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {memory.map((m) => (
            <p key={m} className="rounded-md bg-secondary/50 p-2 text-xs text-muted-foreground">{m}</p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <Lightbulb className="h-4 w-4 text-warning" /> AI Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {suggestions.map((s) => (
            <button key={s.title} className="w-full rounded-lg border border-border p-2.5 text-left transition-colors hover:bg-secondary/60">
              <p className="text-xs font-semibold">{s.title}</p>
              <p className="text-[11px] text-muted-foreground">{s.desc}</p>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" /> Prompt History
          </CardTitle>
          <button className="text-xs font-medium text-primary hover:underline">View all</button>
        </CardHeader>
        <CardContent className="space-y-1 pt-0">
          {history.map((h) => (
            <div key={h.title} className="flex items-center justify-between gap-2 rounded-md px-1 py-1.5 text-xs hover:bg-secondary/50">
              <span className="truncate">{h.title}</span>
              <span className="shrink-0 text-muted-foreground">{h.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm">Generated Documents</CardTitle>
          <button className="text-xs font-medium text-primary hover:underline">View all</button>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          {documents.map((d) => (
            <div key={d.title} className="flex items-center gap-2.5 rounded-md p-1.5 hover:bg-secondary/50">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <d.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{d.title}</p>
                <p className="text-[11px] text-muted-foreground">{d.type}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-1.5 text-sm">
            <Wrench className="h-4 w-4 text-muted-foreground" /> Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2 pt-0">
          {tools.map((t) => (
            <button key={t.label} className="flex flex-col items-center gap-1 rounded-lg border border-border p-2 text-center hover:bg-secondary/60">
              <t.icon className="h-4 w-4 text-primary" />
              <span className="text-[10px] leading-tight text-muted-foreground">{t.label}</span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
