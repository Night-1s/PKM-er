import { Link } from "react-router-dom";
import { ArrowLeft, AlertCircle, BookOpen, CloudFog, Sparkles, Zap } from "lucide-react";
import {
  STATUS_EFFECTS,
  WEATHER_EFFECTS,
  ABILITY_CHANGES,
  ITEM_CHANGES,
  ANGEL_WRATH_MOVES,
  MOVE_CATEGORY_EXTRA,
  STARTER_GROUPS,
  RESOURCES,
} from "@/data/erMechanics";

export default function MechanicsPage() {
  return (
    <>
      {/* 顶部 */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回通关记录
          </Link>

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-400">ER 2.65 Mechanics</p>
                <h1 className="font-display text-3xl font-bold text-ink-900">ER 2.65 机制手册</h1>
              </div>
            </div>
            <p className="mt-2 max-w-xl text-sm text-ink-500">
              汇总 ER 2.65 相对于原版的所有机制改动：新状态、天气改动、特性调整、道具变更等。
              数据来源：作者官方 Wiki + pokedream.cn 汉化文档。
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink-50 bg-dots">
        <div className="container py-10">
          {/* 状态异常 */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <AlertCircle className="h-5 w-5 text-red-500" />
              状态异常改动
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {STATUS_EFFECTS.map((status) => (
                <article key={status.name} className="card p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink-800">{status.name}</span>
                    {status.nameEn && (
                      <span className="text-xs text-ink-400">({status.nameEn})</span>
                    )}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {status.description.map((desc, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-600">
                        <span className="flex-shrink-0 text-accent-500">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                  {status.notes && status.notes.length > 0 && (
                    <div className="mt-3 rounded-lg bg-amber-50 p-2.5">
                      <p className="text-xs font-medium text-amber-800">备注</p>
                      <ul className="mt-1 space-y-1">
                        {status.notes.map((note, i) => (
                          <li key={i} className="text-xs text-amber-700">
                            • {note}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* 天气 */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <CloudFog className="h-5 w-5 text-cyan-500" />
              天气改动
            </h2>
            <div className="mt-4 space-y-4">
              {WEATHER_EFFECTS.map((weather) => (
                <article key={weather.name} className="card overflow-hidden">
                  <div className="flex items-center justify-between bg-ink-50 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-ink-800">{weather.name}</span>
                      {weather.nameEn && (
                        <span className="text-xs text-ink-400">({weather.nameEn})</span>
                      )}
                    </div>
                    {weather.duration && (
                      <span className="text-xs text-ink-500">持续时间：{weather.duration}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <ul className="mb-4 space-y-1.5">
                      {weather.description.map((desc, i) => (
                        <li key={i} className="flex gap-2 text-sm text-ink-600">
                          <span className="flex-shrink-0 text-accent-500">•</span>
                          {desc}
                        </li>
                      ))}
                    </ul>
                    {weather.associatedAbilities && weather.associatedAbilities.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-medium text-ink-500">关联特性</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {weather.associatedAbilities.map((ab) => (
                            <div
                              key={ab.name}
                              className="rounded-lg bg-purple-50 px-3 py-2 text-xs"
                            >
                              <span className="font-medium text-purple-800">{ab.name}</span>
                              <p className="mt-0.5 text-purple-600">{ab.effect}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {weather.associatedItems && weather.associatedItems.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-ink-500">关联道具</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {weather.associatedItems.map((item) => (
                            <div
                              key={item.name}
                              className="rounded-lg bg-amber-50 px-3 py-2 text-xs"
                            >
                              <span className="font-medium text-amber-800">{item.name}</span>
                              <p className="mt-0.5 text-amber-600">{item.effect}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 特性改动 */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <Sparkles className="h-5 w-5 text-emerald-500" />
              特性改动
            </h2>
            <div className="mt-4 space-y-4">
              {ABILITY_CHANGES.map((change) => (
                <article key={change.category} className="card p-5">
                  <h3 className="font-medium text-ink-800">{change.category}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {change.description.map((desc, i) => (
                      <li key={i} className="flex gap-2 text-sm text-ink-600">
                        <span className="flex-shrink-0 text-accent-500">•</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* 道具改动 */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <Zap className="h-5 w-5 text-orange-500" />
              道具改动
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-200 bg-ink-50">
                    <th className="px-4 py-2 text-left font-medium text-ink-700">道具名</th>
                    <th className="px-4 py-2 text-left font-medium text-ink-700">原版效果</th>
                    <th className="px-4 py-2 text-left font-medium text-ink-700">ER 2.65 效果</th>
                  </tr>
                </thead>
                <tbody>
                  {ITEM_CHANGES.map((item) => (
                    <tr key={item.name} className="border-b border-ink-100">
                      <td className="px-4 py-2 font-medium text-ink-800">{item.name}</td>
                      <td className="px-4 py-2 text-ink-500">{item.oldEffect}</td>
                      <td className="px-4 py-2 text-accent-600">{item.newEffect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 天使暴怒 */}
          <section className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink-900">天使暴怒（Angel's Wrath）</h2>
            <p className="mt-1 text-sm text-ink-500">彩蛋精灵 Mega 盾甲茧的专属特性，改变所有技能效果</p>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {ANGEL_WRATH_MOVES.map((move) => (
                <article key={move.nameEn} className="card p-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-ink-800">{move.nameCn}</span>
                    <span className="text-xs text-ink-400">({move.nameEn})</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-600">{move.effect}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 招式分类 */}
          <section className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink-900">ER 招式分类（7 种）</h2>
            <p className="mt-1 text-sm text-ink-500">原版只有物理/特殊/变化 3 种，ER 扩展为 7 种</p>
            <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
              {MOVE_CATEGORY_EXTRA.map((cat) => (
                <div
                  key={cat.id}
                  className="rounded-lg border bg-white p-3 text-center"
                  style={{
                    borderColor:
                      cat.id <= 2 ? "#94A3B8" : cat.id <= 4 ? "#F59E0B" : "#8B5CF6",
                  }}
                >
                  <p className="text-xs font-mono text-ink-400">{cat.id}</p>
                  <p className="font-medium text-ink-800">{cat.nameCn}</p>
                  <p className="mt-0.5 text-[10px] text-ink-500">{cat.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 初始可选精灵 */}
          <section className="mb-12">
            <h2 className="font-display text-xl font-bold text-ink-900">初始可选精灵</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
              {STARTER_GROUPS.map((group) => (
                <div key={group.region} className="card p-4">
                  <p className="text-xs font-medium text-ink-500">{group.region}</p>
                  <p className="mt-1 text-sm font-medium text-ink-800">
                    {group.starters.join(" / ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 地狱难度规则 */}
          <section className="mb-12">
            <h2 className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
              <Sparkles className="h-5 w-5 text-red-500" />
              地狱难度特殊规则
            </h2>
            <div className="mt-4 card p-6">
              <p className="mb-4 text-sm text-ink-600">
                地狱难度（HELL）是 ER 2.65 的最高难度，在高手模式基础上额外增加了 19 条限制：
              </p>
              <div className="space-y-3">
                {[
                  { text: "伪 nuzlock 模式：闪光宝可梦可无视限制，或找 NPC 投降一次解锁背包精灵", highlight: true },
                  { text: "藤树之后对方精灵比己方高 5 级", highlight: true },
                  { text: "道具限制：己方道具不能重复", highlight: true },
                  { text: "对方队伍拥有至少一个额外 buff，老爹之后上升到 3 个", highlight: true },
                  { text: "馆主有额外的馆主 buff（与路人 buff 分开计算）", highlight: true },
                  { text: "己方精灵的 PP 不满（8→5）", highlight: false },
                  { text: "造成睡眠的招式 PP 只有 2", highlight: false },
                  { text: "睡觉梦话的 PP 只有 2", highlight: false },
                  { text: "对方麻痹的精灵减速正常，但不会麻痹不动而是一定能动", highlight: false },
                  { text: "整体伤害 -25%，对方和己方都减", highlight: true },
                  { text: "克制类招式伤害 2 倍→1.5 倍，4 倍→2 倍", highlight: true },
                  { text: "藤树之后对方精灵受到伤害 -10%（配合整体减伤 25% 就是 35%）", highlight: true },
                  { text: "天性习得等级提高（实际还是 17 和 24 没变）", highlight: false },
                  { text: "亚莎之后对方精灵会有一个非法招式", highlight: true },
                  { text: "对方可能有多个 mega", highlight: true },
                  { text: "己方强化最高 +3（实际好像可以加到 6）", highlight: true },
                  { text: "己方除了必定畏缩的招式（比如拍），其他概率造成畏缩的招式必定不会畏缩", highlight: true },
                  { text: "己方适用闪避条款（加闪避率无用）", highlight: true },
                  { text: "铁旋之后对方精灵有额外 252 努力值", highlight: true },
                ].map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 font-mono text-sm text-ink-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`text-sm ${rule.highlight ? "text-red-600 font-medium" : "text-ink-600"}`}>
                      {rule.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 资源链接 */}
          <section>
            <h2 className="font-display text-xl font-bold text-ink-900">官方资源</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {RESOURCES.map((res) => (
                <a
                  key={res.name}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm text-ink-700 transition-colors hover:border-accent-300 hover:text-accent-600"
                >
                  {res.name}
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
