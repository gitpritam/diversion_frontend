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
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950 font-sans select-none">
      {/* Left — Chat Panel */}
      <div
        className="flex flex-col h-full shrink-0 overflow-hidden"
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
        className={`w-1 cursor-col-resize shrink-0 transition-colors ${
          isDragging ? "bg-indigo-500" : "bg-gray-800 hover:bg-indigo-600"
        }`}
        title="Drag to resize"
      />

      {/* Right — Flow Panel */}
      <div className="flex-1 h-full overflow-hidden">
        <FlowPanel architectureData={architectureData} isLoading={isLoading} />
      </div>
    </div>
  );
}
