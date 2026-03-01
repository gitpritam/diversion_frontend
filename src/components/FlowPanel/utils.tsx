/**
 * FlowPanel Utilities
 * Helper functions and custom node components
 */

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { IconType } from "react-icons";
import {
  SiReact,
  SiNodedotjs,
  SiGo,
  SiFlutter,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiRedis,
  SiApachekafka,
  SiRabbitmq,
  SiElasticsearch,
  SiAmazons3,
  SiFirebase,
  SiApple,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiNginx,
  SiCloudflare,
  SiGraphql,
  SiSupabase,
  SiVercel,
  SiNetlify,
  SiPython,
  SiDjango,
  SiSpring,
} from "react-icons/si";
import {
  FaAws,
  FaMobileAlt,
  FaLock,
  FaBell,
  FaBalanceScale,
  FaUser,
  FaGlobe,
  FaDatabase,
} from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import { TYPE_STYLES } from "./constants";
import type { NodeType } from "./types";

// ── Service icon lookup ────────────────────────────────────────────────────────
interface ServiceEntry {
  keywords: string[];
  icon: IconType;
  color: string;
}

const SERVICE_ICON_MAP: ServiceEntry[] = [
  // Frontend / clients
  { keywords: ["flutter"], icon: SiFlutter, color: "#54C5F8" },
  {
    keywords: ["react native", "reactnative"],
    icon: SiReact,
    color: "#61DAFB",
  },
  { keywords: ["react"], icon: SiReact, color: "#61DAFB" },
  { keywords: ["vercel"], icon: SiVercel, color: "#E5E5E5" },
  { keywords: ["netlify"], icon: SiNetlify, color: "#00C7B7" },
  { keywords: ["mobile"], icon: FaMobileAlt, color: "#94a3b8" },

  // Networking / infra
  { keywords: ["cloudfront"], icon: SiCloudflare, color: "#F38020" },
  { keywords: ["cloudflare"], icon: SiCloudflare, color: "#F38020" },
  { keywords: ["nginx"], icon: SiNginx, color: "#009639" },
  { keywords: ["api gateway", "apigateway"], icon: TbApi, color: "#a78bfa" },
  {
    keywords: ["alb", "load balancer", "nlb"],
    icon: FaBalanceScale,
    color: "#facc15",
  },

  // Container / orchestration
  { keywords: ["kubernetes", "k8s"], icon: SiKubernetes, color: "#326CE5" },
  { keywords: ["docker"], icon: SiDocker, color: "#2496ED" },

  // Backend runtimes / frameworks
  {
    keywords: ["node.js", "nodejs", "node"],
    icon: SiNodedotjs,
    color: "#339933",
  },
  { keywords: ["golang", "go ("], icon: SiGo, color: "#00ADD8" },
  { keywords: ["python"], icon: SiPython, color: "#3776AB" },
  { keywords: ["django"], icon: SiDjango, color: "#092E20" },
  { keywords: ["spring"], icon: SiSpring, color: "#6DB33F" },
  { keywords: ["graphql"], icon: SiGraphql, color: "#E10098" },

  // Auth
  { keywords: ["auth", "jwt", "oauth"], icon: FaLock, color: "#f59e0b" },

  // Databases
  {
    keywords: ["postgresql", "postgres"],
    icon: SiPostgresql,
    color: "#4169E1",
  },
  { keywords: ["dynamodb"], icon: FaAws, color: "#FF9900" },
  { keywords: ["mongodb", "mongo"], icon: SiMongodb, color: "#47A248" },
  { keywords: ["mysql"], icon: SiMysql, color: "#4479A1" },
  { keywords: ["cassandra"], icon: FaDatabase, color: "#1287B1" },
  {
    keywords: ["elasticsearch", "elastic"],
    icon: SiElasticsearch,
    color: "#FED10A",
  },
  { keywords: ["supabase"], icon: SiSupabase, color: "#3FCF8E" },

  // Cache
  { keywords: ["redis"], icon: SiRedis, color: "#DC382D" },

  // Queues
  { keywords: ["kafka"], icon: SiApachekafka, color: "#868686" },
  { keywords: ["rabbitmq", "rabbit"], icon: SiRabbitmq, color: "#FF6600" },
  { keywords: ["sqs"], icon: FaAws, color: "#FF9900" },

  // Storage
  { keywords: ["s3"], icon: SiAmazons3, color: "#FF9900" },
  {
    keywords: ["gcs", "google cloud storage"],
    icon: SiGooglecloud,
    color: "#4285F4",
  },

  // Providers
  { keywords: ["firebase", "fcm"], icon: SiFirebase, color: "#FFCA28" },
  { keywords: ["apple", "apns"], icon: SiApple, color: "#A2AAAD" },
  { keywords: ["aws", "amazon"], icon: FaAws, color: "#FF9900" },
  { keywords: ["google"], icon: SiGooglecloud, color: "#4285F4" },

  // Generic
  {
    keywords: ["push notification", "notification"],
    icon: FaBell,
    color: "#f472b6",
  },
  { keywords: ["user"], icon: FaUser, color: "#94a3b8" },
  { keywords: ["external"], icon: FaGlobe, color: "#6b7280" },
];

function getServiceIcon(
  service: string,
  provider: string,
): { icon: IconType; color: string } | null {
  const text = `${service} ${provider}`.toLowerCase();
  for (const entry of SERVICE_ICON_MAP) {
    if (entry.keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return { icon: entry.icon, color: entry.color };
    }
  }
  return null;
}

/**
 * Custom Architecture Node Component
 */
export const ArchNode = memo(({ data }: NodeProps) => {
  const nodeType = (data.nodeType as NodeType) ?? "backend";
  const s = TYPE_STYLES[nodeType];

  const serviceMatch = getServiceIcon(
    (data.service as string) ?? "",
    (data.provider as string) ?? "",
  );
  const IconComponent = serviceMatch?.icon ?? s.icon;
  const iconColor = serviceMatch?.color ?? s.border;

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
        <IconComponent size={16} color={iconColor} style={{ flexShrink: 0 }} />
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
