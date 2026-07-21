import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, X } from "lucide-react";
import { ABILITIES } from "@/data/abilities";
import type { Ability } from "@/data/abilities";

interface AbilitySelectProps {
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  /** 高亮边框色 */
  accentColor?: string;
  /** 标签 */
  label?: string;
  /** 是否显示描述卡片 */
  showDesc?: boolean;
}

/**
 * 特性选择器：可搜索下拉 + 选中后显示描述
 * 数据来源 pokedream.cn ER2.65 全特性汉化
 */
export default function AbilitySelect({
  value,
  onChange,
  placeholder = "搜索并选择特性",
  accentColor = "#2563EB",
  label,
  showDesc = true,
}: AbilitySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // 选中的特性对象
  const selected: Ability | undefined = useMemo(
    () => ABILITIES.find((a) => a.name === value),
    [value],
  );

  // 过滤
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ABILITIES.slice(0, 200);
    return ABILITIES.filter(
      (a) => a.name.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q),
    ).slice(0, 200);
  }, [query]);

  // 点击外部关闭
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

  return (
    <div ref={ref} className="relative">
      {label && (
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-ink-500">{label}</span>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[10px] text-ink-400 hover:text-red-500"
            >
              清除
            </button>
          )}
        </div>
      )}

      {/* 触发器 */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="input-base flex w-full items-center justify-between text-left"
        style={value ? { borderColor: accentColor } : undefined}
      >
        <span className={value ? "font-medium text-ink-800" : "text-ink-400"}>
          {value || placeholder}
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
          {/* 搜索框 */}
          <div className="flex items-center gap-2 border-b border-ink-100 px-3 py-2">
            <Search className="h-3.5 w-3.5 text-ink-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索特性名或效果关键词…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-ink-400 hover:text-ink-700">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 列表 */}
          <div className="max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-ink-400">
                未找到匹配的特性，可关闭后手动输入
              </div>
            ) : (
              filtered.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => {
                    onChange(a.name);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`block w-full border-b border-ink-50 px-3 py-2 text-left transition-colors last:border-0 hover:bg-accent-50 ${
                    a.name === value ? "bg-accent-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink-800">{a.name}</span>
                    {a.name === value && (
                      <span
                        className="rounded px-1.5 py-0.5 text-[10px] text-white"
                        style={{ background: accentColor }}
                      >
                        已选
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-ink-500">
                    {a.desc}
                  </p>
                </button>
              ))
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
              placeholder="或直接手动输入自定义特性…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-ink-400"
            />
          </div>
        </div>
      )}

      {/* 选中后显示完整描述 */}
      {showDesc && selected && !open && (
        <div
          className="mt-1.5 rounded-lg border-l-2 bg-ink-50 px-2.5 py-1.5 text-[11px] leading-relaxed text-ink-600"
          style={{ borderColor: accentColor }}
        >
          {selected.desc}
        </div>
      )}
    </div>
  );
}
