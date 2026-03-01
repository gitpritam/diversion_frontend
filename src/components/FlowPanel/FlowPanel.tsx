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
import { Loader2, GitFork, DollarSign, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { generateNodesAndEdges, nodeTypes } from "./utils";
import { cloudEstimation, costColors, TYPE_STYLES } from "./constants";
import type { NodeType, FlowPanelProps } from "./types";
import useNodeRepulsion from "@/hooks/useNodeRepulsion/useNodeRepulsion";

/** Rendered inside <ReactFlow> so it has access to the ReactFlow context */
function RepulsionEffect() {
  useNodeRepulsion(180, 1, 300);
  return null;
}

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
      <Background variant={BackgroundVariant.Dots} gap={22} size={1} />
      <RepulsionEffect />
      <Controls />
      <MiniMap
        nodeColor={(n) => {
          const t = n.data?.nodeType as NodeType;
          return TYPE_STYLES[t]?.border ?? "#6366f1";
        }}
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
    <div className="flex flex-col h-full bg-background">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-border/50 bg-secondary/20 backdrop-blur-sm shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div
              className={`p-2 rounded-lg bg-primary/10 text-primary shrink-0 ${isLoading ? "animate-pulse" : ""}`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <LayoutGrid className="w-5 h-5" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm text-foreground truncate">
                {isLoading ? "Generating…" : currentProjectName}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {isLoading
                  ? "Processing your request…"
                  : architectureData
                    ? `${computedNodes.length} components · ${computedEdges.length} connections`
                    : "Waiting for input"}
              </p>
            </div>
          </div>

          {!isLoading && architectureData && (
            <div className="flex items-center gap-2 shrink-0">
              <Badge variant="outline" className="font-medium">
                {computedNodes.length} nodes
              </Badge>
              <Button
                variant={showCost ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setShowCost((p) => !p)}
                className="gap-1.5"
              >
                <DollarSign className="w-4 h-4" />
                {showCost ? "Hide" : "Cost"}
              </Button>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-border/50" />

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden bg-linear-to-br from-background via-background to-secondary/5">
        {!architectureData ? (
          // Empty state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md px-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
                <div className="relative p-6 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-sm">
                  <GitFork className="w-12 h-12 text-muted-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary/20 animate-ping" />
              </div>
              <p className="text-lg font-semibold text-foreground">
                No diagram yet
              </p>
              <p className="text-sm text-muted-foreground">
                Describe an architecture in the chat to get started
              </p>
            </div>
          </div>
        ) : isLoading ? (
          // Loading state
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 max-w-md px-6">
              <div className="relative inline-flex items-center justify-center">
                <div className="absolute w-24 h-24 border-4 border-primary/30 rounded-full animate-ping" />
                <div className="absolute w-20 h-20 border-4 border-primary/50 rounded-full animate-spin" />
                <div className="relative p-6 rounded-2xl bg-secondary/50 border border-border/50 backdrop-blur-sm">
                  <LayoutGrid className="w-12 h-12 text-primary animate-pulse" />
                </div>
              </div>
              <p className="text-lg font-semibold text-foreground">
                Building diagram…
              </p>
              <p className="text-sm text-muted-foreground">
                This may take a moment
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

            {/* ── Cost Overlay */}
            {showCost && (
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg overflow-hidden max-w-xs w-72 z-10">
                <div className="px-4 py-3 bg-secondary/50 border-b border-border/50 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <p className="font-semibold text-sm text-foreground">
                    Cost Estimate
                  </p>
                </div>
                <div className="px-4 py-3 space-y-2 max-h-75 overflow-y-auto">
                  {Object.entries(currentCost)
                    .filter(([k]) => k !== "EstimatedMonthlyCost")
                    .map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span
                            className="w-2 h-2 rounded-full shrink-0"
                            style={{
                              backgroundColor:
                                costColors[key as keyof typeof costColors] ||
                                "#6366f1",
                            }}
                          />
                          <span className="text-muted-foreground truncate">
                            {key}
                          </span>
                        </div>
                        <span className="font-medium text-foreground shrink-0">
                          {val as string}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="px-4 py-3 bg-secondary/50 border-t border-border/50 flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    Monthly Total
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {currentCost.EstimatedMonthlyCost}
                  </span>
                </div>
              </div>
            )}

            {/* ── Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-background/95 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg overflow-hidden max-w-xs z-10">
              <p className="px-4 py-2 text-xs font-semibold text-foreground bg-secondary/50 border-b border-border/50">
                Legend
              </p>
              <div className="px-4 py-3 space-y-2">
                {(
                  Object.entries(TYPE_STYLES) as [
                    NodeType,
                    (typeof TYPE_STYLES)[NodeType],
                  ][]
                ).map(([type, s]) => (
                  <div key={type} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-3 h-3 rounded border-2 shrink-0"
                      style={{
                        borderColor: s.border,
                        backgroundColor: s.bg,
                      }}
                    />
                    <span className="text-muted-foreground capitalize">
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
