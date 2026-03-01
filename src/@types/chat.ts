/**
 * Chat and Message Types
 */

import type { ArchitectureData } from "./architecture";

export interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ChatPanelProps {
  onSendMessage: (data: ArchitectureData) => void;
  isLoading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

// Re-export architecture types for convenience
export type { ArchitectureData } from "./architecture";
