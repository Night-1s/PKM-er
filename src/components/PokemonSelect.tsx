import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { POKEMONS } from "@/data/pokemon";
import type { Pokemon } from "@/data/pokemon";

interface PokemonSelectProps {
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  accentColor?: string;
}

const TYPE_COLOR: Record<string, string> = {
  一般: "#A8A77A",
  火: "#EE8130",
  水: "#6390F0",
  草: "#7AC74C",
  电: "#F7D02C",
  冰: "#96D9D6",
  格斗: "#C22E28",
  毒: "#A33EA1",
  地面: "#E2BF65",
  飞行: "#A98FF3",
  超能: "#F95587",
  超能力: "#F95587",
  虫: "#A6B91A",
  岩石: "#B6A136",
  幽灵: "#735797",
  龙: "#6F35FC",
  恶: "#705746",
  钢: "#B7B7CE",
  妖精: "#D685AD",
};

export default function PokemonSelect({
  value,
  onChange,
  placeholder = "搜索并选择宝可梦",
  accentColor = "#2563EB",
}: PokemonSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected: Pokemon | undefined = useMemo(
    () => POKEMONS.find((p) => p.nameCn === value || p.nameEn === value),
    [value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POKEMONS.slice(0, 200);
    return POKEMONS.filter(
      (p) =>
        p.nameCn.includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        String(p.dex).padStart(4, "0") === q.padStart(4, "0") ||
        String(p.dex) === q,
    ).slice(0, 200);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const primaryType = selected?.types[0] || "";

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-base flex w-full items-center justify-between text-left"
        style={value ? { borderColor: accentColor } : undefined}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected && (
            <>
              <span className="flex-shrink-0 font-mono text-xs text-ink-400">
                #{String(selected.dex).padStart(4, "0")}
              </span>
              {selected.types.map((t) => (
                <span
                  key={t}
                  className="flex-shrink-0 rounded text-[10px] font-bold text-white"
                  style={{ background: TYPE_COLOR[t] || "#94A3B8", padding: "1px 4px" }}
                >
                  {t}
                </span>
              ))}
            </>
          )}
          <span className={`truncate ${value ? "font-medium text-ink-800" : "text-ink-400"}`}>
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-ink-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-ink-200 bg-white shadow-cardHover">
          <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-ink-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜中文名 / 英文名 / 图鉴号…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-ink-400 hover:text-ink-700">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-ink-400">
                未找到匹配宝可梦，可手动输入
              </div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.dex}
                  type="button"
                  onClick={() => {
                    onChange(p.nameCn);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center gap-2 border-b border-ink-50 px-3 py-2 text-left transition-colors last:border-0 hover:bg-accent-50 ${
                    p.nameCn === value ? "bg-accent-50" : ""
                  }`}
                >
                  <span className="flex-shrink-0 font-mono text-[10px] text-ink-400">
                    #{String(p.dex).padStart(4, "0")}
                  </span>
                  {p.types.map((t) => (
                    <span
                      key={t}
                      className="flex-shrink-0 rounded text-[10px] font-bold text-white"
                      style={{ background: TYPE_COLOR[t] || "#94A3B8", padding: "1px 4px" }}
                    >
                      {t}
                    </span>
                  ))}
                  <span className="flex-1 truncate text-sm font-medium text-ink-800">
                    {p.nameCn}
                  </span>
                  {p.nameEn && (
                    <span className="flex-shrink-0 truncate text-[11px] text-ink-500">
                      {p.nameEn}
                    </span>
                  )}
                  {p.nameCn === value && (
                    <span
                      className="flex-shrink-0 rounded px-1 py-0.5 text-[10px] text-white"
                      style={{ background: accentColor }}
                    >
                      已选
                    </span>
                  )}
                </button>
              ))
            )}
            {filtered.length === 200 && (
              <div className="px-3 py-2 text-center text-[11px] text-ink-400">
                结果过多，请输入更精确的关键词
              </div>
            )}
          </div>

          <div className="border-t border-ink-100 bg-ink-50 px-3 py-2">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="或直接手动输入自定义形态…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
          </div>
        </div>
      )}
    </div>
  );
}
