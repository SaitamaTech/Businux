import { Bold, Italic, Underline, Strikethrough, Link2, ImageIcon, List, ListOrdered, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const textFormatControls = [
  { icon: Bold, label: "Bold" },
  { icon: Italic, label: "Italic" },
  { icon: Underline, label: "Underline" },
  { icon: Strikethrough, label: "Strikethrough" },
  { icon: Link2, label: "Insert link" },
];

const insertControls = [
  { icon: ImageIcon, label: "Insert image" },
  { icon: List, label: "Bulleted list" },
  { icon: ListOrdered, label: "Numbered list" },
];

export function EditorToolbar() {
  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
      <Select defaultValue="h1">
        <SelectTrigger aria-label="Text style" className="h-8 w-28 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="h1">Heading 1</SelectItem>
          <SelectItem value="h2">Heading 2</SelectItem>
          <SelectItem value="p">Paragraph</SelectItem>
        </SelectContent>
      </Select>
      <div className="mx-1 h-5 w-px bg-border" role="separator" aria-orientation="vertical" />
      {textFormatControls.map(({ icon: Icon, label }) => (
        <Button key={label} variant="ghost" size="icon" className="h-8 w-8" aria-label={label}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      ))}
      <div className="mx-1 h-5 w-px bg-border" role="separator" aria-orientation="vertical" />
      {insertControls.map(({ icon: Icon, label }) => (
        <Button key={label} variant="ghost" size="icon" className="h-8 w-8" aria-label={label}>
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </Button>
      ))}
      <Button variant="ai" size="sm" className="ml-auto h-8 text-xs">
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> AI Write
      </Button>
    </div>
  );
}
