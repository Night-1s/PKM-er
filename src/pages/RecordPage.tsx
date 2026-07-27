import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Trophy,
  Zap,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";
import AbilitySelect from "@/components/AbilitySelect";
import MoveSelect from "@/components/MoveSelect";
import PokemonSelect from "@/components/PokemonSelect";
import { useRunStore, DIFFICULTY_LABELS } from "@/store/runStore";
import { useSpeciesAbilities } from "@/hooks/useERGameData";
import { TYPE_LIST, TYPE_IDS } from "@/data/types";
import type { PartyMember, RunRecord, Difficulty, LevelLimit, TypeId } from "@/store/runStore";

const STATUS_OPTIONS: { value: RunRecord["status"]; label: string; color: string }[] = [
  { value: "not_started", label: "未开始", color: "#94A3B8" },
  { value: "in_progress", label: "进行中", color: "#F59E0B" },
  { value: "completed", label: "已通关", color: "#10B981" },
];

const DIFFICULTY_OPTIONS: { value: Difficulty; cnName: string; color: string }[] = [
  { value: "EASY", cnName: "简单", color: "#34D399" },
  { value: "EXPERT", cnName: "高手", color: "#60A5FA" },
  { value: "ELITE", cnName: "精英", color: "#A78BFA" },
  { value: "HELL", cnName: "地狱", color: "#EF4444" },
];

const LEVEL_LIMIT_OPTIONS: { value: LevelLimit; cnName: string }[] = [
  { value: "simple", cnName: "简单" },
  { value: "advanced", cnName: "进阶" },
  { value: "elite", cnName: "精英" },
];

export default function RecordPage() {
  const { recordId } = useParams<{ recordId: string }>();

  const record = useRunStore((s) => s.records.find((r) => r.id === recordId));

  const {
    updateRecord,
    setRecordStatus,
    setRecordNote,
    setCompletedAt,
    addPartyMember,
    updatePartyMember,
    removePartyMember,
    clearRecord,
  } = useRunStore();

  if (!record) {
    return (
      <div className="container py-20 text-center">
        <p className="text-ink-500">未找到该存档。</p>
        <Link to="/dashboard" className="btn-ghost mt-4">
          返回通关记录
        </Link>
      </div>
    );
  }

  const partyCount = record.party.length;
  const canAddMore = partyCount < 6;
  const accentColor = DIFFICULTY_OPTIONS.find((d) => d.value === record.difficulty)?.color ?? "#2563EB";

  return (
    <>
      {/* 顶部 */}
      <section
        className="border-b border-ink-200 bg-white"
        style={{
          background: `linear-gradient(180deg, ${accentColor}10 0%, #ffffff 100%)`,
        }}
      >
        <div className="container py-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回通关记录
          </Link>

          {/* 存档标题 */}
          <div className="mt-6">
            <input
              value={record.title}
              onChange={(e) => updateRecord(record.id, { title: e.target.value })}
              className="w-full bg-transparent font-display text-3xl font-bold text-ink-900 outline-none md:text-4xl"
              style={{ color: accentColor }}
              placeholder="存档标题"
            />
          </div>

          {/* 难度 & 等级限制 */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink-600">难度：</span>
              <div className="flex flex-wrap gap-1.5">
                {DIFFICULTY_OPTIONS.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => updateRecord(record.id, { difficulty: d.value })}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      record.difficulty === d.value
                        ? "text-white shadow-md"
                        : "bg-white border border-ink-200 text-ink-600 hover:border-ink-300"
                    }`}
                    style={record.difficulty === d.value ? { backgroundColor: d.color } : undefined}
                  >
                    <span
                      className="flex h-2 w-2 items-center justify-center rounded-full"
                      style={{ backgroundColor: d.value === record.difficulty ? "#fff" : d.color }}
                    />
                    {d.cnName}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-ink-200" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink-600">等级限制：</span>
              <div className="flex flex-wrap gap-1.5">
                {LEVEL_LIMIT_OPTIONS.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => updateRecord(record.id, { levelLimit: l.value })}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                      record.levelLimit === l.value
                        ? "bg-accent-600 text-white shadow-md"
                        : "bg-white border border-ink-200 text-ink-600 hover:border-accent-300"
                    }`}
                  >
                    {l.cnName}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-6 w-px bg-ink-200" />
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-ink-600">单属性：</span>
              <div className="flex flex-wrap gap-1.5">
                {!record.singleType ? (
                  <button
                    onClick={() => updateRecord(record.id, { singleType: "normal" })}
                    className="rounded-lg px-3 py-1.5 text-sm font-medium bg-accent-600 text-white shadow-md"
                  >
                    <Tag className="inline h-3 w-3 mr-1" />
                    单属性通关
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => updateRecord(record.id, { singleType: undefined })}
                      className="rounded-lg px-3 py-1.5 text-sm font-medium bg-white border border-ink-200 text-ink-600 hover:border-ink-300"
                    >
                      <X className="inline h-3 w-3 mr-1" />
                      取消单属性
                    </button>
                    <select
                      value={record.singleType}
                      onChange={(e) => updateRecord(record.id, { singleType: e.target.value as TypeId })}
                      className="input-base text-sm"
                    >
                      {TYPE_LIST.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.nameCn}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 状态切换 */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-ink-500">通关状态：</span>
            <div className="flex rounded-xl border border-ink-200 bg-white p-1">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRecordStatus(record.id, opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    record.status === opt.value
                      ? "text-white"
                      : "text-ink-600 hover:bg-ink-50"
                  }`}
                  style={record.status === opt.value ? { background: opt.color } : undefined}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {record.status === "completed" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-ink-500">通关日期：</span>
                <input
                  type="date"
                  value={record.completedAt ?? ""}
                  onChange={(e) => setCompletedAt(record.id, e.target.value)}
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
                已录入 {partyCount} / 6 只 · 每只宝可梦 1 特性（3 选 1）+ 3 天性 + 4 招式
              </p>
            </div>
            <button
              onClick={() => canAddMore && addPartyMember(record.id)}
              disabled={!canAddMore}
              className="btn-primary"
            >
              <Plus className="h-4 w-4" />
              {canAddMore ? "添加宝可梦" : "队伍已满"}
            </button>
          </div>

          {partyCount === 0 ? (
            <EmptyParty onAdd={() => addPartyMember(record.id)} />
          ) : (
            <div className="space-y-4">
              {record.party.map((m, idx) => (
                <MemberCard
                  key={m.id}
                  index={idx}
                  member={m}
                  accentColor={accentColor}
                  onChange={(patch) => updatePartyMember(record.id, m.id, patch)}
                  onRemove={() => removePartyMember(record.id, m.id)}
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
              value={record.note ?? ""}
              onChange={(e) => setRecordNote(record.id, e.target.value)}
              placeholder="记录一下通关时的关键思路、坑点、某只宝可梦表现如何……"
              rows={4}
              className="input-base mt-2 font-sans"
            />
          </div>

          {partyCount > 0 && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (window.confirm(`确定要清空「${record.title}」的全部阵容吗？`)) {
                    clearRecord(record.id);
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-500 transition-all hover:bg-red-50 active:scale-95"
              >
                <Trash2 className="h-3.5 w-3.5" />
                清空此存档
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
  accentColor,
  onChange,
  onRemove,
}: {
  index: number;
  member: PartyMember;
  accentColor: string;
  onChange: (patch: Partial<PartyMember>) => void;
  onRemove: () => void;
}) {
  const { abilities: candidateAbilities, innates: candidateInnates, species, loading } =
    useSpeciesAbilities(member.name);

  // 当候选列表加载完成且当前为空时，自动填充第一个
  const filledRef = useRef(false);
  useEffect(() => {
    if (loading || filledRef.current) return;
    if (candidateAbilities.length === 0 && candidateInnates.length === 0) return;
    filledRef.current = true;
    const patch: Partial<PartyMember> = {};
    if (candidateAbilities.length > 0 && !member.chosenAbility) {
      patch.chosenAbility = candidateAbilities[0];
    }
    if (candidateInnates.length === 3) {
      const next = [...member.innateAbilities] as [string, string, string];
      let changed = false;
      for (let i = 0; i < 3; i++) {
        if (!next[i] && candidateInnates[i]) {
          next[i] = candidateInnates[i];
          changed = true;
        }
      }
      if (changed) patch.innateAbilities = next;
    }
    if (Object.keys(patch).length > 0) {
      onChange(patch);
    }
  }, [loading]);

  return (
    <article className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg font-mono text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            #{index + 1}
          </span>
          <PokemonSelect
            value={member.name}
            onChange={(name) =>
              onChange({
                name,
                chosenAbility: "",
                innateAbilities: ["", "", ""],
              })
            }
            placeholder="宝可梦名"
            accentColor={accentColor}
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
            <Zap className="h-3.5 w-3.5" style={{ color: accentColor }} />
            <span className="text-xs font-medium text-ink-700">
              特性（Ability）· 3 选 1，可随时切换
            </span>
          </div>
          <div className="mt-2">
            <AbilitySelect
              value={member.chosenAbility}
              onChange={(name) => onChange({ chosenAbility: name })}
              placeholder={candidateAbilities.length > 0 ? "选择该宝可梦拥有的特性" : "选择当前选用的特性"}
              accentColor={accentColor}
              candidateAbilities={candidateAbilities}
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
                placeholder={candidateInnates[i] ? candidateInnates[i] : `天性 ${i + 1}`}
                accentColor="#10B981"
                candidateAbilities={candidateInnates}
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
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>
    </article>
  );
}
