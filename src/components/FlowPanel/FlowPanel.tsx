/**
 * FlowPanel Component
 * Interactive React Flow visualization of system architecture
 */

import { useState, useCallback, useMemo } from "react";
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
import { generateNodesAndEdges, nodeTypes } from "./utils";
import { cloudEstimation, costColors, TYPE_STYLES } from "./constants";
import type { NodeType, FlowPanelProps } from "./types";

// ─── Inner stateful canvas ────────────────────────────────────────────────────
// Extracted so that changing `key` remounts it, cleanly re-initialising state
// from the latest nodes/edges without needing a setState-in-useEffect.
function FlowCanvas({
  initNodes,
  initEdges,
}: {
  initNodes: Node[];
  initEdges: Edge[];
}) {
  const [nodes, setNodes] = useState<Node[]>(initNodes);
  const [edges, setEdges] = useState<Edge[]>(initEdges);

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
          {
            ...params,
            animated: true,
            style: { stroke: "#6366f1", strokeWidth: 1.5 },
          },
          eds,
        ),
      ),
    [],
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      proOptions={{ hideAttribution: true }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={22}
        size={1}
        color="#1f2937"
      />
      <Controls className="bg-gray-900! border-gray-700! rounded-xl! [&>button]:bg-gray-900! [&>button]:border-gray-700! [&>button]:text-gray-300! [&>button:hover]:bg-gray-800!" />
      <MiniMap
        className="bg-gray-900! border-gray-700! rounded-xl!"
        nodeColor={(n) => {
          const t = n.data?.nodeType as NodeType;
          return TYPE_STYLES[t]?.border ?? "#6366f1";
        }}
        maskColor="rgba(0,0,0,0.65)"
      />
    </ReactFlow>
  );
}

// ─── FlowPanel ────────────────────────────────────────────────────────────────
export default function FlowPanel({
  architectureData,
  isLoading,
}: FlowPanelProps) {
  const [showCost, setShowCost] = useState(true);

  // Derived from props — no state needed
  const currentCost = architectureData?.cloudEstimation ?? cloudEstimation;
  const currentProjectName =
    architectureData?.projectName ?? "Real-time Messaging Platform";

  // Compute nodes/edges from architectureData (memoised)
  const { nodes: computedNodes, edges: computedEdges } = useMemo(
    () => generateNodesAndEdges(architectureData),
    [architectureData],
  );

  // Use architectureData identity as the canvas key so FlowCanvas remounts
  // (and re-initialises its state) whenever new data arrives — no useEffect needed.
  const canvasKey = architectureData?.projectName ?? "initial";

  return (
    <div className="flex flex-col h-full bg-gray-950">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800 bg-gray-900">
        <div className="flex-1">
          <p
            className={`text-sm font-bold text-white transition-opacity ${isLoading ? "opacity-60" : ""}`}
          >
            {isLoading ? "⚡ Generating..." : currentProjectName}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {isLoading
              ? "Processing your architecture request..."
              : `${computedNodes.length} components · ${computedEdges.length} connections`}
          </p>
        </div>
        {!isLoading && architectureData && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">
              {computedNodes.length} nodes · {computedEdges.length} edges
            </span>
            <button
              onClick={() => setShowCost((p) => !p)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700 transition-colors"
            >
              💰 {showCost ? "Hide" : "Show"} Cost
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 relative overflow-hidden">
        {!architectureData ? (
          // Placeholder when no data
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-950">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-900/50 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-gray-300 font-semibold mb-1">
                No Architecture Data
              </p>
              <p className="text-gray-500 text-sm">
                Describe an architecture in the chat to visualize it
              </p>
            </div>
          </div>
        ) : isLoading ? (
          // Loading state
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-950">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full border-2 border-gray-700 border-t-indigo-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-300 font-semibold mb-1">
                Generating Architecture
              </p>
              <p className="text-gray-500 text-sm">
                Processing your request...
              </p>
            </div>
          </div>
        ) : (
          <>
            <FlowCanvas
              key={canvasKey}
              initNodes={computedNodes}
              initEdges={computedEdges}
            />

            {/* Cost Estimation Overlay */}
            {showCost && (
              <div
                className="absolute top-3 right-3 z-10 rounded-xl border border-gray-700 bg-gray-900/95 backdrop-blur-sm shadow-xl"
                style={{ minWidth: 210 }}
              >
                <div className="px-4 pt-3 pb-2 border-b border-gray-800">
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                    ☁️ Cloud Cost Estimate
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {Object.entries(currentCost)
                    .filter(([k]) => k !== "EstimatedMonthlyCost")
                    .map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{ background: costColors[key] ?? "#6b7280" }}
                          />
                          <span className="text-xs text-gray-400">{key}</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-200">
                          {val as string}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="px-4 py-2.5 border-t border-gray-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-300">
                    Monthly Total
                  </span>
                  <span className="text-sm font-bold text-green-400">
                    {currentCost.EstimatedMonthlyCost}
                  </span>
                </div>
              </div>
            )}

            {/* Legend Overlay */}
            <div className="absolute bottom-3 left-3 z-10 rounded-xl border border-gray-700 bg-gray-900/90 backdrop-blur-sm px-3 py-2.5 shadow-lg">
              <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 font-semibold">
                Legend
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {(
                  Object.entries(TYPE_STYLES) as [
                    NodeType,
                    (typeof TYPE_STYLES)[NodeType],
                  ][]
                ).map(([type, s]) => (
                  <div key={type} className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: s.border }}
                    />
                    <span className="text-[10px] text-gray-400 capitalize">
                      {type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
