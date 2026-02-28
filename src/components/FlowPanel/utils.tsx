/**
 * FlowPanel Utilities
 * Helper functions and custom node components
 */

import { memo } from "react";
import {
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import type { ArchitectureData } from "../../@types";
import { EDGE_COLORS, TYPE_STYLES } from "./constants";
import type { NodeType } from "./types";

/**
 * Custom Architecture Node Component
 */
export const ArchNode = memo(({ data }: NodeProps) => {
  const nodeType = (data.nodeType as NodeType) ?? "backend";
  const s = TYPE_STYLES[nodeType];

  return (
    <div
      className="node-card"
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 14,
        padding: "11px 15px",
        minWidth: 170,
        boxShadow: `0 2px 20px ${s.border}28, 0 0 0 1px ${s.border}18`,
        cursor: "grab",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle top shimmer line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "15%",
          right: "15%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${s.border}80, transparent)`,
        }}
      />

      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: s.border,
          width: 7,
          height: 7,
          border: "none",
          top: -4,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 7,
        }}
      >
        <span style={{ fontSize: 15 }}>{s.icon}</span>
        <span
          style={{
            color: "#f1f5f9",
            fontWeight: 700,
            fontSize: 12.5,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          {data.label as string}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span
          style={{
            background: s.badge,
            color: s.badgeText,
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.04em",
            padding: "2px 8px",
            borderRadius: 99,
            width: "fit-content",
            textTransform: "uppercase",
          }}
        >
          {data.service as string}
        </span>
        <span
          style={{
            color: "#475569",
            fontSize: 10,
            letterSpacing: "0.01em",
          }}
        >
          {data.provider as string}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: s.border,
          width: 7,
          height: 7,
          border: "none",
          bottom: -4,
        }}
      />
    </div>
  );
});

ArchNode.displayName = "ArchNode";

export const nodeTypes = { archNode: ArchNode };

/**
 * Generate React Flow nodes and edges from architecture data
 */
export const generateNodesAndEdges = (
  data: ArchitectureData | null,
): { nodes: Node[]; edges: Edge[] } => {
  if (!data) {
    return { nodes: [], edges: [] };
  }

  // Type mapping for styling
  const typeMap: Record<string, NodeType> = {};
  data.nodes.forEach((n) => {
    typeMap[n.id] = (n.type as NodeType) || "backend";
  });

  // Generate positions based on layer
  const typePositions: Record<string, { x: number; y: number }[]> = {};
  const nodesByType: Record<string, string[]> = {};

  // Group nodes by type
  data.nodes.forEach((n) => {
    const type = typeMap[n.id];
    if (!nodesByType[type]) nodesByType[type] = [];
    nodesByType[type].push(n.id);
  });

  // Layer y-positions
  const typeLayerY: Record<NodeType, number> = {
    frontend: 0,
    cloud: 150,
    backend: 350,
    database: 550,
    cache: 550,
    queue: 550,
    storage: 550,
    external: 750,
  };

  // Layout nodes within each type
  Object.entries(nodesByType).forEach(([type, ids]) => {
    const y = typeLayerY[type as NodeType] ?? 300;
    const spacing = 220;
    const totalWidth = (ids.length - 1) * spacing;
    const startX = -totalWidth / 2;

    ids.forEach((id, idx) => {
      if (!typePositions[id]) typePositions[id] = [];
      typePositions[id].push({
        x: startX + idx * spacing,
        y,
      });
    });
  });

  // Create nodes
  const newNodes: Node[] = data.nodes.map((n) => ({
    id: n.id,
    type: "archNode",
    position: typePositions[n.id]?.[0] ?? { x: 0, y: 0 },
    data: {
      label: n.label,
      nodeType: typeMap[n.id],
      service: n.service,
      provider: n.provider,
    },
  }));

  // Create edges
  const newEdges: Edge[] = data.edges.map((e, i) => ({
    id: `e-${i}`,
    source: e.source,
    target: e.target,
    animated: true,
    style: {
      stroke: EDGE_COLORS[typeMap[e.source]] ?? "#6366f1",
      strokeWidth: 1.5,
    },
  }));

  return { nodes: newNodes, edges: newEdges };
};
