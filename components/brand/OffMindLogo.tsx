/**
 * OffMind Logo — 3D infinity ribbon with teal-to-terracotta gradient.
 *
 * Represents the continuous GTD flow: capture (teal) → process → commit (terracotta).
 * The infinity ribbon = thoughts flowing endlessly until OffMind breaks the cycle.
 *
 * Shape reference: Wide 3D ribbon band, round loops, smooth diagonal crossover.
 * Colors: Vibrant Teal #0891b2 → Vibrant Terracotta #ea580c
 */

interface OffMindLogoProps {
  size?: number;
  className?: string;
  variant?: 'mark' | 'full';
}

export function OffMindLogo({
  size = 32,
  className = '',
  variant = 'mark',
}: OffMindLogoProps) {
  const id = `om-${Math.random().toString(36).slice(2, 7)}`;

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <InfinityMark size={size} id={id} />
        <Wordmark size={size} id={id} />
      </div>
    );
  }

  return <InfinityMark size={size} id={id} className={className} />;
}

/* ─── Wordmark: "Off" light + "Mind" bold, gradient text ─── */
function Wordmark({ size, id }: { size: number; id: string }) {
  const fontSize = size * 0.48;

  return (
    <svg
      width={fontSize * 4.2}
      height={fontSize * 1.3}
      viewBox="0 0 210 65"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`${id}-wg`}
          x1="0"
          y1="32"
          x2="210"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="40%" stopColor="#8a7a60" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>
      {/* "Off" — lighter weight */}
      <text
        x="0"
        y="48"
        fontFamily="var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
        fontSize="52"
        fontWeight="300"
        letterSpacing="-1"
        fill={`url(#${id}-wg)`}
      >
        Off
      </text>
      {/* "Mind" — bold weight */}
      <text
        x="82"
        y="48"
        fontFamily="var(--font-geist-sans), 'Geist Sans', system-ui, sans-serif"
        fontSize="52"
        fontWeight="700"
        letterSpacing="-1.5"
        fill={`url(#${id}-wg)`}
      >
        Mind
      </text>
    </svg>
  );
}

/* ─── Infinity mark: 3D ribbon band, round loops, thick crossover ─── */
function InfinityMark({
  size,
  id,
  className = '',
}: {
  size: number;
  id: string;
  className?: string;
}) {
  // Aspect ratio ~2.1:1 matching the reference's rounder loops
  const width = size;
  const height = size * 0.48;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="OffMind logo"
    >
      <defs>
        {/* ── LEFT LOOP GRADIENTS (Vibrant Teal) ── */}

        {/* Left loop main: rich teal with subtle variation */}
        <linearGradient
          id={`${id}-left`}
          x1="10"
          y1="30"
          x2="140"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0ea5c9" />
          <stop offset="40%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#0e7490" />
        </linearGradient>

        {/* Left loop highlight (top edge lighter = 3D ribbon top surface) */}
        <linearGradient
          id={`${id}-left-hi`}
          x1="70"
          y1="0"
          x2="70"
          y2="152"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="35%" stopColor="#06b6d4" />
          <stop offset="70%" stopColor="#0891b2" />
          <stop offset="100%" stopColor="#065f73" />
        </linearGradient>

        {/* ── RIGHT LOOP GRADIENTS (Vibrant Terracotta) ── */}

        {/* Right loop main: rich terracotta with variation */}
        <linearGradient
          id={`${id}-right`}
          x1="180"
          y1="30"
          x2="310"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="40%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#c2410c" />
        </linearGradient>

        {/* Right loop highlight (top edge lighter) */}
        <linearGradient
          id={`${id}-right-hi`}
          x1="250"
          y1="0"
          x2="250"
          y2="152"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fb923c" />
          <stop offset="35%" stopColor="#f97316" />
          <stop offset="70%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>

        {/* ── CROSSOVER GRADIENT (teal → terracotta blend) ── */}
        <linearGradient
          id={`${id}-cross`}
          x1="120"
          y1="20"
          x2="200"
          y2="132"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="35%" stopColor="#2a9a9e" />
          <stop offset="65%" stopColor="#c87438" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Crossover highlight */}
        <linearGradient
          id={`${id}-cross-hi`}
          x1="145"
          y1="10"
          x2="175"
          y2="142"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="30%" stopColor="#15a0b0" />
          <stop offset="70%" stopColor="#d97040" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>

        {/* ── 3D DEPTH: top-to-bottom highlight ── */}
        <linearGradient
          id={`${id}-depth`}
          x1="160"
          y1="0"
          x2="160"
          y2="152"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.08)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>

        {/* ── SHADOW ── */}
        <filter id={`${id}-shadow`} x="-8%" y="-5%" width="116%" height="125%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1a0e05" floodOpacity="0.15" />
        </filter>
      </defs>

      <g filter={`url(#${id}-shadow)`}>
        {/*
          3D Infinity ribbon — round loops matching logo6.png reference.
          ViewBox 320x152, center at 160,76.
          Left loop center ~80, right loop center ~240.
          Loops are nearly circular. Ribbon is very thick (strokeWidth 34).
          Layering: back strands → front crossover → highlight overlays.
        */}

        {/* ═══ LAYER 1: BACK STRANDS (behind the crossover) ═══ */}

        {/* Back: right loop (terracotta) — goes behind at center */}
        <path
          d="M160,48 C172,26 200,6 240,6 C286,6 312,34 312,76 C312,118 286,146 240,146 C200,146 172,126 160,104"
          stroke={`url(#${id}-right)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />

        {/* Back: left loop (teal) — goes behind at center */}
        <path
          d="M160,104 C148,126 120,146 80,146 C34,146 8,118 8,76 C8,34 34,6 80,6 C120,6 148,26 160,48"
          stroke={`url(#${id}-left)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
        />

        {/* ═══ LAYER 2: FRONT CROSSOVER (teal passes over terracotta) ═══ */}

        {/* Front crossover: teal from upper-left → terracotta at lower-right */}
        <path
          d="M144,32 C150,46 170,106 176,120"
          stroke={`url(#${id}-cross)`}
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
        />

        {/* ═══ LAYER 3: 3D HIGHLIGHT OVERLAYS ═══ */}

        {/* Highlight: left loop — brighter top edge, darker bottom */}
        <path
          d="M160,104 C148,126 120,146 80,146 C34,146 8,118 8,76 C8,34 34,6 80,6 C120,6 148,26 160,48"
          stroke={`url(#${id}-left-hi)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Highlight: right loop — brighter top edge, darker bottom */}
        <path
          d="M160,48 C172,26 200,6 240,6 C286,6 312,34 312,76 C312,118 286,146 240,146 C200,146 172,126 160,104"
          stroke={`url(#${id}-right-hi)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />

        {/* Highlight: crossover — smooth color transition */}
        <path
          d="M144,32 C150,46 170,106 176,120"
          stroke={`url(#${id}-cross-hi)`}
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />

        {/* ═══ LAYER 4: GLOBAL 3D DEPTH (top light, bottom dark) ═══ */}

        {/* Depth overlay on left loop */}
        <path
          d="M160,104 C148,126 120,146 80,146 C34,146 8,118 8,76 C8,34 34,6 80,6 C120,6 148,26 160,48"
          stroke={`url(#${id}-depth)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Depth overlay on right loop */}
        <path
          d="M160,48 C172,26 200,6 240,6 C286,6 312,34 312,76 C312,118 286,146 240,146 C200,146 172,126 160,104"
          stroke={`url(#${id}-depth)`}
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Depth overlay on crossover */}
        <path
          d="M144,32 C150,46 170,106 176,120"
          stroke={`url(#${id}-depth)`}
          strokeWidth="36"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

/**
 * Favicon-optimized version (simplified for 16-20px)
 */
export function OffMindIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  const id = `om-ico-${Math.random().toString(36).slice(2, 7)}`;

  const width = size;
  const height = size * 0.48;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 320 152"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id={`${id}-g`}
          x1="0"
          y1="76"
          x2="320"
          y2="76"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#0891b2" />
          <stop offset="45%" stopColor="#6d8868" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* Simplified single-path infinity for small sizes */}
      <path
        d="M160,48 C148,26 120,6 80,6 C34,6 8,34 8,76 C8,118 34,146 80,146 C120,146 148,126 160,104 C172,126 200,146 240,146 C286,146 312,118 312,76 C312,34 286,6 240,6 C200,6 172,26 160,48 Z"
        stroke={`url(#${id}-g)`}
        strokeWidth="28"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
