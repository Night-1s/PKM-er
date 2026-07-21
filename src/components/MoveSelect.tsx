import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { MOVES } from "@/data/moves";
import type { Move } from "@/data/moves";

interface MoveSelectProps {
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
  超能力: "#F95587",
  超能: "#F95587",
  虫: "#A6B91A",
  岩石: "#B6A136",
  幽灵: "#735797",
  龙: "#6F35FC",
  恶: "#705746",
  钢: "#B7B7CE",
  妖精: "#D685AD",
};

const CATEGORY_COLOR: Record<string, string> = {
  物理: "#C22E28",
  特殊: "#6390F0",
  变化: "#94A3B8",
};

export default function MoveSelect({
  value,
  onChange,
  placeholder = "搜索并选择招式",
  accentColor = "#2563EB",
}: MoveSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected: Move | undefined = useMemo(
    () => MOVES.find((m) => m.name === value),
    [value],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOVES.slice(0, 200);
    return MOVES.filter(
      (m) => m.name.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q) || m.type.includes(q),
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

  const typeColor = selected ? TYPE_COLOR[selected.type] || "#94A3B8" : accentColor;

  return (
    <div ref={ref} className="relative">
      {/* 触发器 */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-base flex w-full items-center justify-between text-left"
        style={value ? { borderColor: typeColor } : undefined}
      >
        <span className="flex min-w-0 items-center gap-1.5">
          {selected && (
            <span
              className="inline-flex flex-shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
              style={{ background: typeColor, padding: "1px 4px" }}
            >
              {selected.type}
            </span>
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

      {/* 下拉面板 */}
      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-ink-200 bg-white shadow-cardHover">
          <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-ink-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索招式名 / 属性 / 效果…"
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
                未找到匹配招式，可手动输入
              </div>
            ) : (
              filtered.map((m) => {
                const color = TYPE_COLOR[m.type] || "#94A3B8";
                const catColor = CATEGORY_COLOR[m.category] || "#94A3B8";
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => {
                      onChange(m.name);
                      setOpen(false);
                      setQuery("");
                    }}
                    className={`block w-full border-b border-ink-50 px-3 py-2 text-left transition-colors last:border-0 hover:bg-accent-50 ${
                      m.name === value ? "bg-accent-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="flex-shrink-0 rounded text-[10px] font-bold text-white"
                        style={{ background: color, padding: "1px 4px" }}
                      >
                        {m.type}
                      </span>
                      <span
                        className="flex-shrink-0 rounded text-[10px] font-medium"
                        style={{ background: `${catColor}20`, color: catColor, padding: "1px 4px" }}
                      >
                        {m.category}
                      </span>
                      <span className="flex-1 truncate text-sm font-medium text-ink-800">
                        {m.name}
                      </span>
                      {m.power && (
                        <span className="flex-shrink-0 font-mono text-[11px] text-ink-600">
                          威{m.power}
                        </span>
                      )}
                      {m.name === value && (
                        <span
                          className="flex-shrink-0 rounded px-1 py-0.5 text-[10px] text-white"
                          style={{ background: accentColor }}
                        >
                          已选
                        </span>
                      )}
                    </div>
                    {m.desc && (
                      <p className="mt-0.5 line-clamp-1 text-[11px] leading-snug text-ink-500">
                        {m.desc}
                      </p>
                    )}
                  </button>
                );
              })
            )}
            {filtered.length === 200 && (
              <div className="px-3 py-2 text-center text-[11px] text-ink-400">
                结果过多，请输入更精确的关键词
              </div>
            )}
          </div>

          {/* 手动输入兜底 */}
          <div className="border-t border-ink-100 bg-ink-50 px-3 py-2">
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="或直接手动输入自定义招式…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
          </div>
        </div>
      )}

      {/* 选中后显示完整描述 */}
      {selected && !open && (
        <div
          className="mt-1 rounded-lg border-l-2 bg-ink-50 px-2 py-1 text-[10px] leading-relaxed text-ink-600"
          style={{ borderColor: typeColor }}
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-mono text-ink-700">
              {selected.power && `威力 ${selected.power}`}
              {selected.power && selected.accuracy && " · "}
              {selected.accuracy && `命中 ${selected.accuracy}`}
              {selected.pp && " · PP " + selected.pp}
            </span>
          </div>
          {selected.desc && <p className="mt-0.5">{selected.desc}</p>}
        </div>
      )}
    </div>
  );
}
