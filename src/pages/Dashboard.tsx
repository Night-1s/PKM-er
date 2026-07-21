import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock, Plus, RotateCcw, Trophy, Users } from "lucide-react";
import TypeBadge from "@/components/TypeBadge";
import { TYPE_LIST } from "@/data/types";
import { useRunStore, useStats } from "@/store/runStore";
import type { TypeRun } from "@/store/runStore";

const STATUS_LABEL: Record<TypeRun["status"], string> = {
  not_started: "未开始",
  in_progress: "进行中",
  completed: "已通关",
};

const STATUS_STYLE: Record<TypeRun["status"], string> = {
  not_started: "bg-ink-100 text-ink-500",
  in_progress: "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default function Dashboard() {
  const runs = useRunStore((s) => s.runs);
  const resetAll = useRunStore((s) => s.resetAll);
  const stats = useStats();

  const handleReset = () => {
    if (window.confirm("确定要清空所有 18 属性的通关记录吗？此操作无法撤销。")) {
      resetAll();
    }
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
              我的地狱难度 · 全 18 属性通关记录
            </h1>
            <p className="max-w-2xl text-ink-500">
              点击下方任一属性卡片，录入你的通关队伍（最多 6 只）、4 能力搭配、4 招式与个人笔记。
              数据自动保存在本地浏览器。
            </p>
          </div>

          {/* 统计卡片 */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard
              icon={Trophy}
              label="已通关属性"
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
          <div className="mt-6 card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-500">整体通关进度</p>
                <p className="mt-1 font-display text-2xl font-bold text-ink-900">{stats.progress}%</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-500">
                  {stats.completed} / {stats.total} 属性已通关
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
            <p className="mt-2 text-xs text-ink-400">
              当 {stats.completed} = {stats.total} 时，你完成了 ER 2.65 HELL MODE 全 18 属性通关挑战 🎉
            </p>
          </div>
        </div>
      </section>

      {/* ============ 18 属性网格 ============ */}
      <section className="bg-ink-50 bg-dots">
        <div className="container py-12">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-ink-900">18 属性通关阵容</h2>
              <p className="mt-1 text-sm text-ink-500">点击卡片进入对应属性的阵容录入页</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {TYPE_LIST.map((t) => {
              const run = runs[t.id];
              const partyCount = run.party.length;
              return (
                <Link
                  key={t.id}
                  to={`/types/${t.id}`}
                  className="card card-hover group relative overflow-hidden p-5"
                  style={{ borderTopColor: t.color, borderTopWidth: 4 }}
                >
                  {/* 状态徽章 */}
                  <span
                    className={`chip absolute right-3 top-3 ${STATUS_STYLE[run.status]}`}
                  >
                    {run.status === "completed" && <CheckCircle2 className="h-3 w-3" />}
                    {STATUS_LABEL[run.status]}
                  </span>

                  <div className="flex items-center gap-3">
                    <TypeBadge type={t} size={48} />
                    <div>
                      <p className="font-display text-lg font-bold text-ink-900">{t.nameCn}</p>
                      <p className="text-xs uppercase tracking-wider text-ink-400">{t.nameEn}</p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs text-ink-500" title={t.tagline}>
                    {t.tagline}
                  </p>

                  {/* 队伍预览 */}
                  <div className="mt-4 border-t border-ink-100 pt-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-ink-500">队伍</span>
                      <span className="font-mono font-medium text-ink-700">{partyCount}/6</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {run.party.length === 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs text-ink-400">
                          <Plus className="h-3 w-3" />
                          点击录入
                        </span>
                      ) : (
                        run.party.slice(0, 6).map((m) => (
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

                  {run.completedAt && (
                    <p className="mt-3 text-[10px] text-ink-400">通关于 {run.completedAt}</p>
                  )}
                </Link>
              );
            })}
          </div>
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
