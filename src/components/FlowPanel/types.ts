/**
 * FlowPanel Types and Constants
 */

import type { ArchitectureData } from "../../@types";

export type NodeType =
  | "frontend"
  | "cloud"
  | "backend"
  | "database"
  | "cache"
  | "queue"
  | "storage"
  | "external";

export interface FlowPanelProps {
  architectureData: ArchitectureData | null;
  isLoading: boolean;
}
