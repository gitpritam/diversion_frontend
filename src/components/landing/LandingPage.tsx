import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const DataCenterSVG = () => (
  <svg
    viewBox="0 0 500 420"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="topFaceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <filter id="strongGlow">
        <feGaussianBlur stdDeviation="5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Grid floor */}
    <g opacity="0.4" filter="url(#glow)">
      <line
        x1="50"
        y1="320"
        x2="450"
        y2="320"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="70"
        y1="340"
        x2="430"
        y2="340"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="90"
        y1="360"
        x2="410"
        y2="360"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="110"
        y1="380"
        x2="390"
        y2="380"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="150"
        y1="320"
        x2="110"
        y2="390"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="220"
        y1="320"
        x2="160"
        y2="390"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="290"
        y1="320"
        x2="230"
        y2="390"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="360"
        y1="320"
        x2="300"
        y2="390"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
      <line
        x1="420"
        y1="320"
        x2="370"
        y2="390"
        stroke="#818cf8"
        strokeWidth="0.5"
      />
    </g>

    {/* Big center-left server */}
    <g filter="url(#glow)">
      <polygon
        points="130,160 130,290 195,320 195,190"
        fill="#13111f"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="195,190 195,320 295,290 295,160"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="130,160 195,190 295,160 230,130"
        fill="url(#topFaceGrad)"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <rect
        x="133"
        y="210"
        width="55"
        height="3"
        fill="#818cf8"
        opacity="0.6"
        rx="1"
      />
      <rect
        x="133"
        y="220"
        width="55"
        height="3"
        fill="#818cf8"
        opacity="0.4"
        rx="1"
      />
      <rect
        x="133"
        y="230"
        width="55"
        height="3"
        fill="#818cf8"
        opacity="0.6"
        rx="1"
      />
      <rect
        x="133"
        y="240"
        width="40"
        height="3"
        fill="#6366f1"
        opacity="0.5"
        rx="1"
      />
      <rect
        x="133"
        y="250"
        width="55"
        height="3"
        fill="#818cf8"
        opacity="0.3"
        rx="1"
      />
    </g>

    {/* Tall right server */}
    <g filter="url(#glow)">
      <polygon
        points="300,100 300,290 360,310 360,120"
        fill="#13111f"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="360,120 360,310 420,290 420,100"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="300,100 360,120 420,100 360,80"
        fill="url(#topFaceGrad)"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <rect
        x="302"
        y="140"
        width="50"
        height="3"
        fill="#818cf8"
        opacity="0.7"
        rx="1"
      />
      <rect
        x="302"
        y="150"
        width="50"
        height="3"
        fill="#818cf8"
        opacity="0.4"
        rx="1"
      />
      <rect
        x="302"
        y="160"
        width="35"
        height="3"
        fill="#6366f1"
        opacity="0.6"
        rx="1"
      />
      <rect
        x="302"
        y="170"
        width="50"
        height="3"
        fill="#818cf8"
        opacity="0.5"
        rx="1"
      />
      <rect
        x="302"
        y="200"
        width="50"
        height="3"
        fill="#818cf8"
        opacity="0.6"
        rx="1"
      />
      <rect
        x="302"
        y="210"
        width="30"
        height="3"
        fill="#6366f1"
        opacity="0.4"
        rx="1"
      />
    </g>

    {/* Small front-left cube */}
    <g filter="url(#glow)">
      <polygon
        points="110,270 110,320 160,340 160,290"
        fill="#13111f"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="160,290 160,340 210,320 210,270"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="110,270 160,290 210,270 160,250"
        fill="url(#topFaceGrad)"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
    </g>

    {/* Medium right-front cube */}
    <g filter="url(#glow)">
      <polygon
        points="310,250 310,320 370,345 370,275"
        fill="#13111f"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="370,275 370,345 430,320 430,250"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="310,250 370,275 430,250 370,225"
        fill="url(#topFaceGrad)"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <rect
        x="312"
        y="280"
        width="50"
        height="3"
        fill="#818cf8"
        opacity="0.6"
        rx="1"
      />
      <rect
        x="312"
        y="290"
        width="40"
        height="3"
        fill="#818cf8"
        opacity="0.4"
        rx="1"
      />
    </g>

    {/* Small back cube */}
    <g filter="url(#glow)">
      <polygon
        points="200,130 200,200 255,220 255,150"
        fill="#13111f"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="255,150 255,220 310,200 310,130"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1"
      />
      <polygon
        points="200,130 255,150 310,130 255,110"
        fill="url(#topFaceGrad)"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
    </g>

    {/* Shield icon */}
    <g filter="url(#strongGlow)" opacity="0.9">
      <path
        d="M410,60 L430,68 L430,85 Q430,95 410,102 Q390,95 390,85 L390,68 Z"
        fill="none"
        stroke="#818cf8"
        strokeWidth="2"
      />
      <text x="410" y="86" textAnchor="middle" fill="#818cf8" fontSize="12">
        🔒
      </text>
    </g>
    <g filter="url(#strongGlow)" opacity="0.7">
      <path
        d="M90,200 L108,207 L108,221 Q108,229 90,235 Q72,229 72,221 L72,207 Z"
        fill="none"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
    </g>

    {/* Monitor top left */}
    <g filter="url(#glow)" opacity="0.8">
      <rect
        x="60"
        y="100"
        width="110"
        height="75"
        rx="4"
        fill="#0d0b1a"
        stroke="#818cf8"
        strokeWidth="1.5"
      />
      <rect x="65" y="105" width="100" height="65" rx="2" fill="#0f0d1e" />
      <rect
        x="72"
        y="145"
        width="10"
        height="20"
        fill="#818cf8"
        opacity="0.8"
      />
      <rect
        x="86"
        y="135"
        width="10"
        height="30"
        fill="#818cf8"
        opacity="0.6"
      />
      <rect
        x="100"
        y="125"
        width="10"
        height="40"
        fill="#818cf8"
        opacity="0.9"
      />
      <rect
        x="114"
        y="138"
        width="10"
        height="27"
        fill="#818cf8"
        opacity="0.5"
      />
      <rect
        x="128"
        y="130"
        width="10"
        height="35"
        fill="#818cf8"
        opacity="0.7"
      />
      <rect
        x="142"
        y="142"
        width="10"
        height="23"
        fill="#6366f1"
        opacity="0.6"
      />
      <rect
        x="108"
        y="175"
        width="4"
        height="15"
        fill="#818cf8"
        opacity="0.5"
      />
      <rect
        x="100"
        y="190"
        width="20"
        height="3"
        fill="#818cf8"
        opacity="0.5"
      />
    </g>

    {/* Connection lines */}
    <g stroke="#818cf8" strokeWidth="1" opacity="0.3" strokeDasharray="4,4">
      <line x1="170" y1="175" x2="200" y2="150" />
      <line x1="295" y1="200" x2="310" y2="185" />
      <line x1="160" y1="290" x2="195" y2="280" />
    </g>

    {/* Glowing dots */}
    <circle cx="195" cy="190" r="3" fill="#818cf8" filter="url(#strongGlow)" />
    <circle cx="295" cy="160" r="3" fill="#818cf8" filter="url(#strongGlow)" />
    <circle cx="360" cy="120" r="3" fill="#818cf8" filter="url(#strongGlow)" />
    <circle cx="255" cy="150" r="2" fill="#6366f1" filter="url(#glow)" />
  </svg>
);

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-10 py-16 bg-background">
      <div className="flex items-center justify-between w-full max-w-6xl gap-16">
        {/* Left Content */}
        <div className="flex-1 flex flex-col gap-7">
          <p className="text-xs font-bold tracking-[3px] uppercase text-primary">
            Project System Architecture
          </p>

          <h1 className="text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-foreground">
            SystemForge
            <br />
            <span className="text-primary">AI</span>
          </h1>

          <p className="text-sm leading-relaxed max-w-sm text-muted-foreground">
            From idea to system design and estimation. Describe your product
            concept and instantly receive a complete system architecture diagram
            with nodes, edges, and cloud cost analysis.
          </p>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/sign-up")}
              className="rounded-full px-8 py-5 text-sm font-bold transition-all duration-200 hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/sign-in")}
              className="rounded-full px-8 py-5 text-sm font-bold transition-all duration-200 hover:scale-105"
            >
              Sign In
            </Button>
          </div>
        </div>

        {/* Right Visual */}
        <div className="flex-1 rounded-2xl p-8 relative overflow-hidden bg-secondary/30 border border-border/50 shadow-[0_0_60px_rgba(99,102,241,0.08),inset_0_0_60px_rgba(99,102,241,0.03)]">
          <div
            className="absolute top-0 right-0 w-48 h-48 pointer-events-none rounded-tr-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
            }}
          />
          <DataCenterSVG />
        </div>
      </div>
    </div>
  );
}
