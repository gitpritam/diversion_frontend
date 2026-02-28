/**
 * Main Layout Component
 * Contains the split-panel layout with chat and flow visualization
 */

import { useState } from "react";
import { ChatPanel, FlowPanel } from "../components";
import type { ArchitectureData } from "../@types";

export default function Layout() {
  const [chatWidth, setChatWidth] = useState(360);
  const [isDragging, setIsDragging] = useState(false);
  const [architectureData, setArchitectureData] =
    useState<ArchitectureData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);

    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.min(Math.max(e.clientX, 260), 640);
      setChatWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans select-none">
      {/* Left — Chat Panel */}
      <div
        className="flex flex-col h-full shrink-0 overflow-hidden border-r border-border/40 shadow-sm "
        style={{ width: chatWidth }}
      >
        <ChatPanel
          onSendMessage={setArchitectureData}
          isLoading={isLoading}
          onLoadingChange={setIsLoading}
        />
      </div>

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={`relative w-1 cursor-col-resize shrink-0 group transition-all duration-200 hover:w-1.5 ${
          isDragging
            ? "bg-primary w-1.5 shadow-[0_0_12px_rgba(var(--primary),0.4)]"
            : "bg-border/40 hover:bg-primary/60 hover:shadow-[0_0_8px_rgba(var(--primary),0.25)]"
        }`}
        title="Drag to resize"
      >
        {/* Wider invisible grab area */}
        <div className="absolute inset-y-0 -left-3 -right-3" />
        {/* Grip dots */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-1.5 transition-opacity duration-200 ${
            isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-80"
          }`}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-primary shadow-sm"
            />
          ))}
        </div>
      </div>

      {/* Right — Flow Panel */}
      <div className="flex-1 h-full overflow-hidden">
        <FlowPanel architectureData={architectureData} isLoading={isLoading} />
      </div>
    </div>
  );
}
