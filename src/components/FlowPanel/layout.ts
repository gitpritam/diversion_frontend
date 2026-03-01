import type { Node, Edge } from "@xyflow/react";
import type { ArchitectureData } from "../../@types";
import { EDGE_COLORS } from "./constants";
import type { NodeType } from "./types";

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

  const typePositions: Record<string, { x: number; y: number }[]> = {};
  const nodesByType: Record<string, string[]> = {};

  data.nodes.forEach((n) => {
    const type = typeMap[n.id];
    if (!nodesByType[type]) nodesByType[type] = [];
    nodesByType[type].push(n.id);
  });

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

  Object.entries(nodesByType).forEach(([type, ids]) => {
    const y = typeLayerY[type as NodeType] ?? 300;
    const spacing = 220;
    const totalWidth = (ids.length - 1) * spacing;
    const startX = -totalWidth / 2;

    ids.forEach((id, idx) => {
      if (!typePositions[id]) typePositions[id] = [];
      typePositions[id].push({ x: startX + idx * spacing, y });
    });
  });

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
