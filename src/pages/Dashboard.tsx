import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock, Plus, RotateCcw, Trophy, Users, Trash2, Tag } from "lucide-react";
import { useRunStore, useStats, DIFFICULTY_LABELS } from "@/store/runStore";
import { TYPE_LIST } from "@/data/types";
import type { RunRecord, Difficulty, LevelLimit } from "@/store/runStore";

const STATUS_LABEL: Record<RunRecord["status"], string> = {
  not_started: "未开始",
  in_progress: "进行中",
  completed: "已通关",
};

const STATUS_STYLE: Record<RunRecord["status"], string> = {
  not_started: "bg-ink-100 text-ink-500",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  EASY: "#34D399",
  EXPERT: "#60A5FA",
  ELITE: "#A78BFA",
  HELL: "#EF4444",
};

const LEVEL_LIMIT_CN: Record<LevelLimit, string> = {
  simple: "简单",
  advanced: "进阶",
  elite: "精英",
};

export default function Dashboard() {
  const records = useRunStore((s) => s.records);
  const addRecord = useRunStore((s) => s.addRecord);
  const removeRecord = useRunStore((s) => s.removeRecord);
  const resetAll = useRunStore((s) => s.resetAll);
  const stats = useStats();

  const handleReset = () => {
    if (window.confirm("确定要清空所有通关记录吗？此操作无法撤销。")) {
      resetAll();
    }
  };

  const handleAdd = () => {
    addRecord();
  };

  return (
    <>
      {/* ============ Hero / 进度总览 ============ */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container py-10">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
              POKÉMON ELITE REDUX · v2.65
            </span>
            <h1 className="font-display text-3xl font-bold text-ink-900 md:text-4xl">
              我的通关记录
            </h1>
            <p className="max-w-2xl text-ink-500">
              记录你在 ER 2.65 各难度下的通关队伍（最多 6 只）、4 能力搭配、4 招式与个人笔记。
              数据自动保存在本地浏览器。
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={Trophy}
              label="已通关"
              value={`${stats.completed}`}
              suffix={`/ ${stats.total}`}
              color="#10B981"
            />
            <StatCard
              icon={Clock}
              label="进行中"
              value={`${stats.inProgress}`}
              color="#F59E0B"
            />
            <StatCard
              icon={Circle}
              label="未开始"
              value={`${stats.notStarted}`}
              color="#94A3B8"
            />
            <StatCard
              icon={Users}
              label="已录入宝可梦"
              value={`${stats.totalMembers}`}
              suffix="只"
              color="#2563EB"
            />
          </div>

          {/* 进度条 */}
          {stats.total > 0 && (
            <div className="mt-6 card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-ink-500">通关完成度</p>
                  <p className="mt-1 font-display text-2xl font-bold text-ink-900">{stats.progress}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-500">
                    {stats.completed} / {stats.total} 个存档已通关
                  </p>
                  <button
                    onClick={handleReset}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                  >
                    <RotateCcw className="h-3 w-3" />
                    清空全部记录
                  </button>
                </div>
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-ink-100">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${stats.progress}%`,
                    background: "linear-gradient(90deg, #2563EB 0%, #7C3AED 100%)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============ 通关存档列表 ============ */}
      <section className="bg-ink-50 bg-dots">
        <div className="container py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">通关存档</h2>
              <p className="mt-1 text-sm text-ink-500">点击存档进入队伍录入页</p>
            </div>
            <button onClick={handleAdd} className="btn-primary">
              <Plus className="h-4 w-4" />
              新建存档
            </button>
          </div>

          {records.length === 0 ? (
            <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50">
                <Trophy className="h-7 w-7 text-accent-600" />
              </div>
              <p className="mt-4 font-display text-lg font-bold text-ink-800">还没有通关存档</p>
              <p className="mt-1 max-w-sm text-sm text-ink-500">
                新建一个存档，记录你的通关队伍。
              </p>
              <button onClick={handleAdd} className="btn-primary mt-6">
                <Plus className="h-4 w-4" />
                新建第一个存档
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {records.map((r) => (
                <div
                  key={r.id}
                  className="card card-hover group relative overflow-hidden p-5"
                  style={{ borderTopColor: DIFFICULTY_COLOR[r.difficulty], borderTopWidth: 4 }}
                >
                  {/* 状态徽章 */}
                  <span
                    className={`chip absolute right-3 top-3 ${STATUS_STYLE[r.status]}`}
                  >
                    {r.status === "completed" && <CheckCircle2 className="h-3 w-3" />}
                    {STATUS_LABEL[r.status]}
                  </span>

                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                      style={{ backgroundColor: DIFFICULTY_COLOR[r.difficulty] }}
                    >
                      {DIFFICULTY_LABELS[r.difficulty][0]}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-display text-lg font-bold text-ink-900">{r.title}</p>
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-xs text-ink-400">
                          {DIFFICULTY_LABELS[r.difficulty]} · 等级限制 {LEVEL_LIMIT_CN[r.levelLimit]}
                        </span>
                        {r.singleType && (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-accent-50 px-1.5 py-0.5 text-[10px] font-medium text-accent-600">
                            <Tag className="h-2.5 w-2.5" />
                            单属性{TYPE_LIST.find((t) => t.id === r.singleType)?.nameCn}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 队伍预览 */}
                  <div className="mt-4 border-t border-ink-100 pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-500">队伍</span>
                      <span className="font-mono font-medium text-ink-700">{r.party.length}/6</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {r.party.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-ink-400">
                          <Plus className="h-3 w-3" />
                          点击录入
                        </span>
                      ) : (
                        r.party.slice(0, 6).map((m) => (
                          <span
                            key={m.id}
                            className="inline-flex items-center rounded-md bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-700"
                          >
                            {m.name || "未命名"}
                          </span>
                        ))
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    {r.completedAt && (
                      <p className="text-[10px] text-ink-400">通关于 {r.completedAt}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/runs/${r.id}`}
                        className="text-xs font-medium text-accent-600 hover:text-accent-700"
                      >
                        编辑队伍
                      </Link>
                      <button
                        onClick={() => {
                          if (window.confirm(`确定要删除「${r.title}」吗？`)) {
                            removeRecord(r.id);
                          }
                        }}
                        className="text-ink-400 transition-colors hover:text-red-500"
                        aria-label="删除存档"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ background: `${color}1A` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </span>
        <div>
          <p className="text-xs text-ink-500">{label}</p>
          <p className="mt-0.5 font-display text-xl font-bold text-ink-900">
            {value}
            {suffix && <span className="ml-1 text-sm font-normal text-ink-400">{suffix}</span>}
          </p>
        </div>
      </div>
    </div>
  );
}
