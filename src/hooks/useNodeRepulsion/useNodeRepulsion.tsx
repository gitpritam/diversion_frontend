import { useEffect, useRef } from "react";
import { useReactFlow, useStore } from "@xyflow/react";

/**
 * useNodeRepulsion
 *
 * Runs a damped repulsion simulation whenever the node list changes.
 * Nodes that are closer than `radius` push each other apart.
 * The simulation converges and stops — it does NOT run every frame forever.
 *
 * @param radius   Min desired distance between node centres (px). Default 180.
 * @param strength Repulsion magnitude multiplier. Default 1.
 * @param maxSteps Max simulation iterations per trigger. Default 300.
 */
const useNodeRepulsion = (radius = 180, strength = 1, maxSteps = 300) => {
  const { setNodes } = useReactFlow();
  // Track node count so we only re-run simulation when nodes are added/removed
  // const nodeCount = useStore((s) => s.nodes.length);
  const nodeIds = useStore((s) =>
    s.nodes
      .map((n) => n.id)
      .sort()
      .join(","),
  );
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    // Cancel any in-progress simulation
    if (animationFrame.current !== null) {
      cancelAnimationFrame(animationFrame.current);
    }

    let step = 0;

    const tick = () => {
      if (step >= maxSteps) return;
      step++;

      // Damping factor: starts strong, fades to 0 as simulation converges
      const damping = 1 - step / maxSteps;

      setNodes((nodes) => {
        // Build a mutable positions map to avoid reading stale values mid-loop
        const positions = new Map(
          nodes
            .map((n) => ({ ...n }))
            .map((n) => [n.id, { x: n.position.x, y: n.position.y }]),
        );

        const deltas = new Map<string, { dx: number; dy: number }>(
          nodes.map((n) => [n.id, { dx: 0, dy: 0 }]),
        );

        let anyOverlap = false;

        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];

            // Skip dragging nodes so user control is preserved
            if (a.dragging || b.dragging) continue;

            const posA = positions.get(a.id)!;
            const posB = positions.get(b.id)!;

            const dx = posA.x - posB.x;
            const dy = posA.y - posB.y;
            const distance = Math.sqrt(dx * dx + dy * dy) || 0.001;

            if (distance < radius) {
              anyOverlap = true;
              const overlap = radius - distance;
              const force = (overlap / radius) * strength * damping;
              const nx = (dx / distance) * force;
              const ny = (dy / distance) * force;

              const da = deltas.get(a.id)!;
              const db = deltas.get(b.id)!;

              // Push both nodes equally in opposite directions
              da.dx += nx * 5;
              da.dy += ny * 5;
              db.dx -= nx * 5;
              db.dy -= ny * 5;
            }
          }
        }

        // If nothing is overlapping, stop early
        if (!anyOverlap) return nodes;

        return nodes.map((n) => {
          if (n.dragging) return n;
          const d = deltas.get(n.id)!;
          return {
            ...n,
            position: {
              x: n.position.x + d.dx,
              y: n.position.y + d.dy,
            },
          };
        });
      });

      animationFrame.current = requestAnimationFrame(tick);
    };

    animationFrame.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
    // Re-run simulation only when the set of node IDs changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeIds, radius, strength, maxSteps]);
};

export default useNodeRepulsion;
