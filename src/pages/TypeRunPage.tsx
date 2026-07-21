import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Trophy,
  Zap,
  Sparkles,
} from "lucide-react";
import TypeBadge from "@/components/TypeBadge";
import AbilitySelect from "@/components/AbilitySelect";
import MoveSelect from "@/components/MoveSelect";
import PokemonSelect from "@/components/PokemonSelect";
import { TYPE_IDS, TYPE_MAP } from "@/data/types";
import type { TypeId } from "@/data/types";
import { useRunStore } from "@/store/runStore";
import type { PartyMember, TypeRun } from "@/store/runStore";

const STATUS_OPTIONS: { value: TypeRun["status"]; label: string; color: string }[] = [
  { value: "not_started", label: "未开始", color: "#94A3B8" },
  { value: "in_progress", label: "进行中", color: "#F59E0B" },
  { value: "completed", label: "已通关", color: "#10B981" },
];

export default function TypeRunPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const navigate = useNavigate();

  const activeId = (typeId as TypeId) || "fire";
  const activeType = TYPE_MAP[activeId];
  const run = useRunStore((s) => s.runs[activeId]);

  const {
    setRunStatus,
    addPartyMember,
    updatePartyMember,
    removePartyMember,
    setRunNote,
    setCompletedAt,
    clearRun,
  } = useRunStore();

  const switchType = (delta: number) => {
    const idx = TYPE_IDS.indexOf(activeId);
    const next = TYPE_IDS[(idx + delta + TYPE_IDS.length) % TYPE_IDS.length];
    navigate(`/types/${next}`);
  };

  if (!activeType) {
    return (
      <div className="container py-20 text-center">
        <p className="text-ink-500">未找到该属性。</p>
        <Link to="/" className="btn-ghost mt-4">
          返回仪表盘
        </Link>
      </div>
    );
  }

  const partyCount = run.party.length;
  const canAddMore = partyCount < 6;

  return (
    <>
      {/* 顶部属性切换 */}
      <section
        className="border-b border-ink-200 bg-white"
        style={{
          background: `linear-gradient(180deg, ${activeType.color}10 0%, #ffffff 100%)`,
        }}
      >
        <div className="container py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回仪表盘
          </Link>

          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => switchType(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-all hover:border-ink-300 hover:bg-ink-50"
              aria-label="上一个属性"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex flex-1 items-center gap-4">
              <div style={{ filter: `drop-shadow(0 4px 12px ${activeType.color}55)` }}>
                <TypeBadge type={activeType} size={72} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-400">{activeType.nameEn}</p>
                <h1
                  className="font-display text-3xl font-bold md:text-4xl"
                  style={{ color: activeType.color }}
                >
                  {activeType.nameCn}系
                </h1>
                <p className="mt-1 max-w-xl text-sm text-ink-500">{activeType.tagline}</p>
              </div>
            </div>

            <button
              onClick={() => switchType(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-600 transition-all hover:border-ink-300 hover:bg-ink-50"
              aria-label="下一个属性"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* 状态切换 */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-ink-500">通关状态：</span>
            <div className="flex rounded-xl border border-ink-200 bg-white p-1">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRunStatus(activeId, opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    run.status === opt.value
                      ? "text-white"
                      : "text-ink-600 hover:bg-ink-50"
                  }`}
                  style={run.status === opt.value ? { background: opt.color } : undefined}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {run.status === "completed" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-500">通关日期：</span>
                <input
                  type="date"
                  value={run.completedAt ?? ""}
                  onChange={(e) => setCompletedAt(activeId, e.target.value)}
                  className="input-base w-auto py-1.5"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 队伍录入 */}
      <section className="bg-ink-50 bg-dots">
        <div className="container py-10">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">通关队伍</h2>
              <p className="mt-1 text-sm text-ink-500">
                已录入 {partyCount} / 6 只 · 每只宝可梦 3 天性 + 1 特性（3 选 1）+ 4 招式
              </p>
            </div>
            <button
              onClick={() => canAddMore && addPartyMember(activeId)}
              disabled={!canAddMore}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
              {canAddMore ? "添加宝可梦" : "队伍已满"}
            </button>
          </div>

          {partyCount === 0 ? (
            <EmptyParty onAdd={() => addPartyMember(activeId)} />
          ) : (
            <div className="space-y-4">
              {run.party.map((m, idx) => (
                <MemberCard
                  key={m.id}
                  index={idx}
                  member={m}
                  typeColor={activeType.color}
                  onChange={(patch) => updatePartyMember(activeId, m.id, patch)}
                  onRemove={() => removePartyMember(activeId, m.id)}
                />
              ))}
            </div>
          )}

          {/* 整体笔记 */}
          <div className="mt-8 card p-6">
            <label className="text-sm font-medium text-ink-700">
              通关心得 / 笔记
              <span className="ml-2 text-xs font-normal text-ink-400">（可选）</span>
            </label>
            <textarea
              value={run.note ?? ""}
              onChange={(e) => setRunNote(activeId, e.target.value)}
              placeholder="记录一下这属性通关时的关键思路、坑点、某只宝可梦表现如何……"
              rows={4}
              className="input-base mt-2 font-sans"
            />
          </div>

          {partyCount > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm(`确定要清空 ${activeType.nameCn}系的全部阵容吗？`)) {
                    clearRun(activeId);
                  }
                }}
                className="btn-danger"
              >
                <Trash2 className="h-3.5 w-3.5" />
                清空此属性记录
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function EmptyParty({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50">
        <Trophy className="h-7 w-7 text-accent-600" />
      </div>
      <p className="mt-4 font-display text-lg font-bold text-ink-800">还没有录入队伍</p>
      <p className="mt-1 max-w-sm text-sm text-ink-500">
        点击下方按钮添加你的第一只通关宝可梦。
      </p>
      <button onClick={onAdd} className="btn-primary mt-6">
        <Plus className="h-4 w-4" />
        添加第一只
      </button>
    </div>
  );
}

function MemberCard({
  index,
  member,
  typeColor,
  onChange,
  onRemove,
}: {
  index: number;
  member: PartyMember;
  typeColor: string;
  onChange: (patch: Partial<PartyMember>) => void;
  onRemove: () => void;
}) {
  return (
    <article className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold text-white"
            style={{ background: typeColor }}
          >
            #{index + 1}
          </span>
          <PokemonSelect
            value={member.name}
            onChange={(name) => onChange({ name })}
            placeholder="宝可梦名"
            accentColor={typeColor}
          />
          <input
            value={member.form ?? ""}
            onChange={(e) => onChange({ form: e.target.value })}
            placeholder="形态"
            className="input-base w-28"
          />
        </div>
        <button
          onClick={onRemove}
          className="flex-shrink-0 rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
          aria-label="删除"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* 1 特性（3 选 1） + 3 天性（innate） */}
      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* 特性（3 选 1） */}
        <div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5" style={{ color: typeColor }} />
            <span className="text-xs font-medium text-ink-700">
              特性（Ability）· 3 选 1，可随时切换
            </span>
          </div>
          <div className="mt-2">
            <AbilitySelect
              value={member.chosenAbility}
              onChange={(name) => onChange({ chosenAbility: name })}
              placeholder="选择当前选用的特性"
              accentColor={typeColor}
            />
          </div>
        </div>

        {/* 3 个天性 */}
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-medium text-ink-700">
              天性（Innate）· 3 个，固定不变
            </span>
          </div>
          <div className="mt-2 space-y-2">
            {member.innateAbilities.map((ab, i) => (
              <AbilitySelect
                key={i}
                value={ab}
                onChange={(name) => {
                  const next = [...member.innateAbilities] as [string, string, string];
                  next[i] = name;
                  onChange({ innateAbilities: next });
                }}
                placeholder={`天性 ${i + 1}`}
                accentColor="#10B981"
              />
            ))}
          </div>
        </div>
      </div>

      {/* 4 招式 */}
      <div className="mt-5">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-ink-700">4 招式</span>
        </div>
        <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          {member.moves.map((mv, i) => (
            <MoveSelect
              key={i}
              value={mv}
              onChange={(name) => {
                const next = [...member.moves];
                next[i] = name;
                onChange({ moves: next });
              }}
              placeholder={`招式 ${i + 1}`}
              accentColor={typeColor}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
