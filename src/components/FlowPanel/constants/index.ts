/**
 * FlowPanel Constants
 * Static data and configuration values
 */

import type { Node, Edge } from "@xyflow/react";
import type { IconType } from "react-icons";
import { FaReact } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { FaServer } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { FaBolt } from "react-icons/fa";
import { FaStream } from "react-icons/fa";
import { FaHdd } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import type { NodeType } from "../types";

export const TYPE_STYLES: Record<
  NodeType,
  {
    bg: string;
    border: string;
    badge: string;
    badgeText: string;
    icon: IconType;
  }
> = {
  frontend: {
    bg: "#1e1b4b",
    border: "#4f46e5",
    badge: "#312e81",
    badgeText: "#a5b4fc",
    icon: FaReact,
  },
  cloud: {
    bg: "#1c3150",
    border: "#3b82f6",
    badge: "#1e3a5f",
    badgeText: "#93c5fd",
    icon: FaCloud,
  },
  backend: {
    bg: "#1a2e1a",
    border: "#22c55e",
    badge: "#14532d",
    badgeText: "#86efac",
    icon: FaServer,
  },
  database: {
    bg: "#2d1b1b",
    border: "#ef4444",
    badge: "#450a0a",
    badgeText: "#fca5a5",
    icon: FaDatabase,
  },
  cache: {
    bg: "#2d2010",
    border: "#f97316",
    badge: "#431407",
    badgeText: "#fdba74",
    icon: FaBolt,
  },
  queue: {
    bg: "#1f1a2e",
    border: "#a855f7",
    badge: "#3b0764",
    badgeText: "#d8b4fe",
    icon: FaStream,
  },
  storage: {
    bg: "#1a2535",
    border: "#06b6d4",
    badge: "#083344",
    badgeText: "#67e8f9",
    icon: FaHdd,
  },
  external: {
    bg: "#1f1f1f",
    border: "#6b7280",
    badge: "#111827",
    badgeText: "#d1d5db",
    icon: FaGlobe,
  },
};

// Layer-based x/y layout
export const LAYER_Y: Record<string, number> = {
  web_client: 0,
  mobile_client: 0,
  cdn: 130,
  load_balancer: 260,
  api_gateway: 390,
  auth_service: 540,
  user_service: 540,
  messaging_service: 540,
  presence_service: 540,
  media_service: 540,
  notification_service: 540,
  user_db: 700,
  message_db: 700,
  cache: 700,
  message_queue: 700,
  object_storage: 700,
  external_push_notifications: 860,
};

export const LAYER_X: Record<string, number> = {
  web_client: 200,
  mobile_client: 520,
  cdn: 360,
  load_balancer: 360,
  api_gateway: 360,
  auth_service: 0,
  user_service: 160,
  messaging_service: 320,
  presence_service: 480,
  media_service: 640,
  notification_service: 800,
  user_db: 0,
  message_db: 200,
  cache: 400,
  message_queue: 600,
  object_storage: 800,
  external_push_notifications: 680,
};

export const rawNodes = [
  {
    id: "web_client",
    label: "Web Client",
    nodeType: "frontend",
    service: "React App",
    provider: "Open-source",
  },
  {
    id: "mobile_client",
    label: "Mobile Client",
    nodeType: "frontend",
    service: "React Native / Flutter",
    provider: "Open-source",
  },
  {
    id: "cdn",
    label: "CDN",
    nodeType: "cloud",
    service: "CloudFront",
    provider: "AWS",
  },
  {
    id: "load_balancer",
    label: "Load Balancer",
    nodeType: "cloud",
    service: "ALB",
    provider: "AWS",
  },
  {
    id: "api_gateway",
    label: "API Gateway",
    nodeType: "cloud",
    service: "API Gateway (REST/WS)",
    provider: "AWS",
  },
  {
    id: "auth_service",
    label: "Auth Service",
    nodeType: "backend",
    service: "Node.js / Go",
    provider: "AWS ECS",
  },
  {
    id: "user_service",
    label: "User Service",
    nodeType: "backend",
    service: "Node.js / Go",
    provider: "AWS ECS",
  },
  {
    id: "messaging_service",
    label: "Messaging Service",
    nodeType: "backend",
    service: "Node.js / Go (WS)",
    provider: "AWS ECS",
  },
  {
    id: "presence_service",
    label: "Presence Service",
    nodeType: "backend",
    service: "Node.js / Go",
    provider: "AWS ECS",
  },
  {
    id: "media_service",
    label: "Media Service",
    nodeType: "backend",
    service: "Node.js / Go",
    provider: "AWS ECS",
  },
  {
    id: "notification_service",
    label: "Notification Service",
    nodeType: "backend",
    service: "Node.js / Go",
    provider: "AWS ECS",
  },
  {
    id: "user_db",
    label: "User / Metadata DB",
    nodeType: "database",
    service: "PostgreSQL",
    provider: "AWS RDS",
  },
  {
    id: "message_db",
    label: "Message Content DB",
    nodeType: "database",
    service: "DynamoDB",
    provider: "AWS",
  },
  {
    id: "cache",
    label: "Cache",
    nodeType: "cache",
    service: "Redis",
    provider: "AWS ElastiCache",
  },
  {
    id: "message_queue",
    label: "Message Queue",
    nodeType: "queue",
    service: "SQS",
    provider: "AWS",
  },
  {
    id: "object_storage",
    label: "Object Storage",
    nodeType: "storage",
    service: "S3",
    provider: "AWS",
  },
  {
    id: "external_push_notifications",
    label: "APNS / FCM",
    nodeType: "external",
    service: "Push Notification",
    provider: "Apple / Google",
  },
];

export const rawEdges = [
  { source: "web_client", target: "cdn" },
  { source: "mobile_client", target: "cdn" },
  { source: "cdn", target: "load_balancer" },
  { source: "load_balancer", target: "api_gateway" },
  { source: "api_gateway", target: "auth_service" },
  { source: "api_gateway", target: "user_service" },
  { source: "api_gateway", target: "messaging_service" },
  { source: "api_gateway", target: "presence_service" },
  { source: "api_gateway", target: "media_service" },
  { source: "auth_service", target: "user_db" },
  { source: "auth_service", target: "cache" },
  { source: "user_service", target: "user_db" },
  { source: "user_service", target: "cache" },
  { source: "messaging_service", target: "message_queue" },
  { source: "messaging_service", target: "message_db" },
  { source: "messaging_service", target: "cache" },
  { source: "messaging_service", target: "presence_service" },
  { source: "presence_service", target: "cache" },
  { source: "media_service", target: "object_storage" },
  { source: "media_service", target: "user_db" },
  { source: "message_queue", target: "messaging_service" },
  { source: "message_queue", target: "notification_service" },
  { source: "notification_service", target: "user_db" },
  { source: "notification_service", target: "external_push_notifications" },
];

export const EDGE_COLORS: Record<NodeType, string> = {
  frontend: "#6366f1",
  cloud: "#3b82f6",
  backend: "#22c55e",
  database: "#ef4444",
  cache: "#f97316",
  queue: "#a855f7",
  storage: "#06b6d4",
  external: "#6b7280",
};

export const costColors: Record<string, string> = {
  Compute: "#6366f1",
  Database: "#ef4444",
  Storage: "#06b6d4",
  OtherServices: "#f97316",
};

export const cloudEstimation = {
  Compute: "$180",
  Database: "$280",
  Storage: "$70",
  OtherServices: "$120",
  EstimatedMonthlyCost: "$650",
};

// Build source type map
const sourceTypeMap: Record<string, NodeType> = Object.fromEntries(
  rawNodes.map((n) => [n.id, n.nodeType as NodeType]),
);

// Initial nodes
export const initialNodes: Node[] = rawNodes.map((n) => ({
  id: n.id,
  type: "archNode",
  position: { x: LAYER_X[n.id] ?? 0, y: LAYER_Y[n.id] ?? 0 },
  data: {
    label: n.label,
    nodeType: n.nodeType,
    service: n.service,
    provider: n.provider,
  },
}));

// Initial edges
export const initialEdges: Edge[] = rawEdges.map((e, i) => ({
  id: `e-${i}`,
  source: e.source,
  target: e.target,
  animated: true,
  style: {
    stroke: EDGE_COLORS[sourceTypeMap[e.source]] ?? "#6366f1",
    strokeWidth: 1.5,
  },
}));
