import { useState, useRef, useEffect } from "react";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI assistant. Ask me anything and I'll help you visualize the data on the right panel.",
    timestamp: "10:00 AM",
  },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

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

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: `You said: "${trimmed}". I'll update the flow diagram accordingly.`,
      timestamp: now,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
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
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
          AI
        </div>
        <div>
          <p className="text-sm font-semibold text-white">AI Assistant</p>
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Online
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
            placeholder="Type a message... (Enter to send)"
            rows={1}
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 resize-none outline-none max-h-32 leading-relaxed"
            style={{ fieldSizing: "content" } as React.CSSProperties}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="mb-0.5 w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          >
            <svg
              className="w-4 h-4 text-white rotate-90"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
