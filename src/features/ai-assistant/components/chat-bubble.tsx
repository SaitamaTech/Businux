import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { initials, relativeTime } from "@/lib/format";
import type { ChatMessage } from "@/store/ai-assistant-store";
import { cn } from "@/lib/utils";

export function ChatBubble({ message }: { message: ChatMessage }) {
  const user = useAuthStore((s) => s.user);
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      <Avatar className="h-8 w-8 shrink-0">
        {isUser ? (
          <AvatarFallback>{user ? initials(user.name) : "U"}</AvatarFallback>
        ) : (
          <AvatarFallback className="bg-accent text-white">
            <Sparkles className="h-4 w-4" />
          </AvatarFallback>
        )}
      </Avatar>
      <div className={cn("max-w-[75%]", isUser && "flex flex-col items-end")}>
        <Card className={cn(isUser ? "bg-primary text-primary-foreground" : "bg-card")}>
          <CardContent className="p-3.5 text-sm leading-relaxed whitespace-pre-line">
            {message.content}
          </CardContent>
        </Card>
        <span className="mt-1 text-[11px] text-muted-foreground">{relativeTime(message.timestamp)}</span>
      </div>
    </motion.div>
  );
}
