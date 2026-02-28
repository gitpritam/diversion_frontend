/**
 * ChatPanel Component
 */

import { useState, useRef, useEffect } from "react";
import { Sparkles, SendHorizontal, Loader2 } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sendIdea } from "../../api";
import type { Message, ChatPanelProps } from "../../@types";

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hi! I'm your AI architecture assistant. Describe a system or product and I'll generate the architecture diagram for you.",
    timestamp: "",
  },
];

export default function ChatPanel({
  onSendMessage,
  isLoading,
  onLoadingChange,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmed,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    onLoadingChange(true);

    try {
      const architectureData = await sendIdea(trimmed);
      onSendMessage(architectureData);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `✅ Generated **${architectureData.projectName}** — ${architectureData.nodes.length} components, ${architectureData.edges.length} connections. Estimated cost: **${architectureData.cloudEstimation.EstimatedMonthlyCost}/month**.`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "❌ Write a system design or product idea in the input box and I'll generate the architecture diagram for you. If you have already sent an idea, please try again.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      onLoadingChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* ── Header ───────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-border/50 bg-secondary/20 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`p-2 rounded-lg bg-primary/10 text-primary shrink-0 ${isLoading ? "animate-pulse" : ""}`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground">
                AI Assistant
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
                  />
                  <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                </span>
                <span className="text-muted-foreground">
                  {isLoading ? "Generating…" : "Ready"}
                </span>
              </div>
            </div>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* ── Messages ─────────────────────────────────────── */}
      <ScrollArea className="flex-1 overflow-hidden">
        <div className="px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-3 group">
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm font-semibold ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.role === "user" ? "U" : <Sparkles className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div
                  className={`prose prose-sm dark:prose-invert max-w-none rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-primary/10 text-foreground"
                      : "bg-secondary/50 text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.timestamp && (
                  <span className="text-xs text-muted-foreground pl-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {msg.timestamp}
                  </span>
                )}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary text-secondary-foreground">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-secondary/50 rounded-lg px-3 py-2 inline-flex items-center gap-1">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-2 h-2 rounded-full bg-muted-foreground/60 animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ── Input ─────────────────────────────────────────── */}
      <div className="px-4 py-3 border-t border-border/50 bg-secondary/10 backdrop-blur-sm shrink-0">
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe an architecture…"
            rows={1}
            disabled={isLoading}
            className="min-h-11 max-h-32 resize-none bg-background border-border/60 focus-visible:ring-primary/50"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            title="Send (Enter)"
            className="h-11 w-11 shrink-0"
          >
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Enter · send &nbsp;·&nbsp; Shift+Enter · newline
        </p>
      </div>
    </div>
  );
}
