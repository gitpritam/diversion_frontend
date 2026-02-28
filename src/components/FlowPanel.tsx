import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes: Node[] = [
  {
    id: "1",
    type: "input",
    position: { x: 250, y: 50 },
    data: { label: "Input Node" },
    style: {
      background: "#4f46e5",
      color: "#fff",
      border: "1px solid #4338ca",
      borderRadius: "10px",
      padding: "10px 16px",
      fontWeight: 600,
    },
  },
  {
    id: "2",
    position: { x: 100, y: 180 },
    data: { label: "Process A" },
    style: {
      background: "#1e293b",
      color: "#e2e8f0",
      border: "1px solid #334155",
      borderRadius: "10px",
      padding: "10px 16px",
    },
  },
  {
    id: "3",
    position: { x: 400, y: 180 },
    data: { label: "Process B" },
    style: {
      background: "#1e293b",
      color: "#e2e8f0",
      border: "1px solid #334155",
      borderRadius: "10px",
      padding: "10px 16px",
    },
  },
  {
    id: "4",
    type: "output",
    position: { x: 250, y: 320 },
    data: { label: "Output Node" },
    style: {
      background: "#065f46",
      color: "#fff",
      border: "1px solid #047857",
      borderRadius: "10px",
      padding: "10px 16px",
      fontWeight: 600,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    style: { stroke: "#6366f1" },
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
    animated: true,
    style: { stroke: "#6366f1" },
  },
  { id: "e2-4", source: "2", target: "4", style: { stroke: "#34d399" } },
  { id: "e3-4", source: "3", target: "4", style: { stroke: "#34d399" } },
];

export default function FlowPanel() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#6366f1" } },
          eds,
        ),
      ),
    [],
  );

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800 bg-gray-900">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-sm font-semibold text-white">Flow Diagram</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            {nodes.length} nodes · {edges.length} edges
          </span>
          <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-900 text-indigo-300 font-medium">
            Interactive
          </span>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          proOptions={{ hideAttribution: true }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="#1f2937"
          />
          <Controls className="bg-gray-900! border-gray-700! rounded-xl! [&>button]:bg-gray-900! [&>button]:border-gray-700! [&>button]:text-gray-300! [&>button:hover]:bg-gray-800!" />
          <MiniMap
            className="bg-gray-900! border-gray-700! rounded-xl!"
            nodeColor="#4f46e5"
            maskColor="rgba(0,0,0,0.6)"
          />
        </ReactFlow>
      </div>
    </div>
  );
}
