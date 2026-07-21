import type { PokeType, TypeId } from "@/data/types";

interface TypeBadgeProps {
  type: PokeType;
  size?: number;
  active?: boolean;
  className?: string;
}

/**
 * 18 属性徽章（明亮风格）
 */
export default function TypeBadge({ type, size = 40, className = "" }: TypeBadgeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      className={className}
      style={{ transition: "transform 0.2s ease" }}
    >
      <defs>
        <radialGradient id={`grad-${type.id}`} cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor={type.color} stopOpacity="1" />
          <stop offset="100%" stopColor={type.color} stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <circle cx="28" cy="28" r="24" fill={`url(#grad-${type.id})`} />
      <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      <ellipse cx="22" cy="20" rx="6" ry="3" fill="#ffffff" opacity="0.5" />
      <text
        x="28"
        y="28"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="18"
        fontWeight="900"
        fill="#ffffff"
        style={{ fontFamily: '"Noto Serif SC", serif' }}
      >
        {type.symbol}
      </text>
    </svg>
  );
}

const TYPE_COLOR_FALLBACK: Record<TypeId, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export function TypeDot({ id, size = 14 }: { id: TypeId; size?: number }) {
  return (
    <span
      style={{ width: size, height: size, background: TYPE_COLOR_FALLBACK[id] }}
      className="inline-block rounded-full border border-white"
    />
  );
}
