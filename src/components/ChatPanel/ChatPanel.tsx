/**
 * ChatPanel Component and Types
 */

import { useState, useRef, useEffect } from "react";
import { sendIdea } from "../../api";
import type { Message, ChatPanelProps } from "../../@types";

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI assistant. Describe the architecture you want to visualize and I'll generate the flow diagram for you.",
    timestamp: "10:00 AM",
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
      // Fetch architecture data from backend
      const architectureData = await sendIdea(trimmed);

      // Update parent component with new data
      onSendMessage(architectureData);
      console.log("Received architecture data:", architectureData);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: `✨ Architecture updated! I've generated the flow diagram with ${architectureData.nodes.length} components and ${architectureData.edges.length} connections. Estimated monthly cost: ${architectureData.cloudEstimation.EstimatedMonthlyCost}`,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching architecture data:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "❌ Sorry, I couldn't generate the architecture. Please try again with a different description.",
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
    <div className="flex flex-col h-full bg-gray-950 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-800 bg-gray-900">
        <div
          className={`w-8 h-8 rounded-full ${isLoading ? "bg-orange-600 animate-pulse" : "bg-indigo-600"} flex items-center justify-center text-sm font-bold`}
        >
          {isLoading ? "⚡" : "AI"}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">AI Assistant</p>
          <p
            className={`text-xs flex items-center gap-1 ${isLoading ? "text-orange-400" : "text-green-400"}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isLoading ? "bg-orange-400 animate-pulse" : "bg-green-400"} inline-block`}
            />
            {isLoading ? "Processing..." : "Online"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col gap-1 ${
              msg.role === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-gray-800 text-gray-100 rounded-bl-sm"
              }`}
            >
              {msg.content}
            </div>
            <span className="text-xs text-gray-500 px-1">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-gray-800 bg-gray-900">
        <div className="flex items-end gap-2 bg-gray-800 rounded-2xl px-4 py-2.5 border border-gray-700 focus-within:border-indigo-500 transition-colors">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe an architecture..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none max-h-32 leading-relaxed disabled:opacity-60"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="mb-0.5 w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            title={isLoading ? "Loading..." : "Send"}
          >
            {isLoading ? (
              <svg
                className="w-4 h-4 text-white animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-white rotate-90"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          {isLoading
            ? "Generating architecture..."
            : "Shift + Enter for new line"}
        </p>
      </div>
    </div>
  );
}
