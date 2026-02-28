/**
 * FlowPanel Utilities
 * Helper functions and custom node components
 */

import { memo } from "react";
import { Handle, Position, type Node, type Edge, type NodeProps } from "@xyflow/react";
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
      style={{
        background: s.bg,
        border: `1.5px solid ${s.border}`,
        borderRadius: 12,
        padding: "10px 14px",
        minWidth: 160,
        boxShadow: `0 0 12px ${s.border}33`,
        cursor: "grab",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: s.border, width: 8, height: 8 }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 14 }}>{s.icon}</span>
        <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>
          {data.label as string}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            background: s.badge,
            color: s.badgeText,
            fontSize: 10,
            padding: "2px 7px",
            borderRadius: 99,
            width: "fit-content",
          }}
        >
          {data.service as string}
        </span>
        <span
          style={{
            color: "#64748b",
            fontSize: 10,
          }}
        >
          {data.provider as string}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: s.border, width: 8, height: 8 }}
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
