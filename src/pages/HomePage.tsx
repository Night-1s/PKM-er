import { Link } from "react-router-dom";
import { Book, Zap, Flame, Droplets, Leaf, Bug, Mountain, Ghost, Cog, Heart, Fighting, Wind, Skull, Globe, Psychic, Snowflake, Moon, Sparkles, Sword, Shield, AlertTriangle, CloudRain, ArrowRight } from "lucide-react";
import { typeNamesCN } from "../data/erPokedex";

const FEATURES = [
  {
    icon: Book,
    title: "宝可梦图鉴",
    description: "1907种宝可梦，含Redux/Mega形态与特殊形态",
    link: "/pokedex",
    color: "#2563EB",
  },
  {
    icon: Zap,
    title: "特性系统",
    description: "1个特性（3选1）+3个天性（固定）",
    link: "/abilities",
    color: "#F59E0B",
  },
  {
    icon: Sword,
    title: "技能招式",
    description: "原版技能数据，含ER改动说明",
    link: "/mechanics#moves",
    color: "#EF4444",
  },
  {
    icon: Shield,
    title: "机制手册",
    description: "新状态效果、雾天气、属性改动",
    link: "/mechanics",
    color: "#7C3AED",
  },
];

const DIFFICULTIES = [
  { name: "EASY", cnName: "简单", desc: "训练家没有努力值，但你可以拥有；战斗中禁用背包道具；强制使用「设置」对战模式", color: "#34D399" },
  { name: "EXPERT", cnName: "高手", desc: "在精英模式基础上附加：AI拥有所有先天特性，而你则需要升级才能解锁天性；队伍难度大幅提升；仅限高手挑战", color: "#60A5FA" },
  { name: "ELITE", cnName: "精英", desc: "队伍配置与简单模式相同，但附加：每一位训练家都拥有定制的努力值；这是标准难度", color: "#A78BFA" },
  { name: "HELL", cnName: "地狱", desc: "最高难度，包含19条特殊限制：伪nuzlock模式、等级压制、道具限制、额外buff、PP减少、伤害降低、克制削弱等", color: "#EF4444" },
];

const LEVEL_LIMITS = [
  { name: "简单", desc: "前六个徽章没有等级上限，挑战联盟前就能升到100级" },
  { name: "进阶", desc: "每获得一个徽章解锁新的等级上限，成为冠军前无法达到100级" },
  { name: "精英", desc: "等级上限限制最严格" },
];

const NEW_CONTENT = [
  {
    icon: CloudRain,
    title: "雾天气",
    desc: "降低命中率，遮蔽场地效果",
  },
  {
    icon: AlertTriangle,
    title: "新状态效果",
    desc: "流血、冻伤、恐惧",
  },
  {
    icon: Sparkles,
    title: "特性改动",
    desc: "4特性系统，1特性+3天性可选",
  },
];

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  NORMAL: Shield,
  FIRE: Flame,
  WATER: Droplets,
  GRASS: Leaf,
  ELECTRIC: Zap,
  PSYCHIC: Sparkles,
  ICE: Snowflake,
  DRAGON: Flame,
  DARK: Moon,
  FAIRY: Heart,
  FIGHTING: Sword,
  FLYING: Wind,
  POISON: Skull,
  GROUND: Globe,
  ROCK: Mountain,
  BUG: Bug,
  GHOST: Ghost,
  STEEL: Cog,
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-50/50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-yellow-300 blur-3xl" />
        </div>
        <div className="container relative py-16 px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-medium backdrop-blur-sm">
              POKÉMON ELITE REDUX · v2.65
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
              ER 2.65 · 通关阵容记录
            </h1>
            <p className="mt-4 text-lg opacity-90">
              记录你在各难度下的通关队伍，自由创建存档
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-ink-900 shadow-lg transition-all hover:shadow-xl hover:scale-105"
              >
                <Zap className="h-5 w-5" />
                开始记录
              </Link>
              <Link
                to="/pokedex"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                <Book className="h-5 w-5" />
                查看图鉴
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
            FEATURES
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
            网站功能
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <Link
              key={f.title}
              to={f.link}
              className="group card card-hover p-6"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                style={{ background: `${f.color}1A` }}
              >
                <f.icon className="h-6 w-6" style={{ color: f.color }} />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm text-ink-500">{f.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-ink-50 py-12">
        <div className="container px-4">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
              DIFFICULTY
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
              难度等级
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DIFFICULTIES.map((d) => (
              <div
                key={d.name}
                className="card p-6 text-center"
              >
                <div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: `${d.color}1A` }}
                >
                  <span className="font-display text-2xl font-bold" style={{ color: d.color }}>
                    {d.name[0]}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold text-ink-900">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-accent-600">{d.cnName}</p>
                <p className="mt-2 text-xs text-ink-500 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
              LEVEL LIMIT
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
              等级限制
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {LEVEL_LIMITS.map((l) => (
              <div
                key={l.name}
                className="card p-6 text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-100">
                  <span className="font-display text-lg font-bold text-accent-600">
                    {l.name[0]}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-ink-900">
                  {l.name}
                </h3>
                <p className="mt-2 text-xs text-ink-500 leading-relaxed">{l.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 px-4">
        <div className="text-center">
          <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
            NEW CONTENT
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
            ER 2.65 新增内容
          </h2>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {NEW_CONTENT.map((c) => (
            <div
              key={c.title}
              className="card p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-50">
                  <c.icon className="h-5 w-5 text-accent-600" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-ink-900">
                    {c.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-12">
        <div className="container px-4">
          <div className="text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-accent-600">
              18 TYPES
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-900">
              18 属性挑战
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              点击下方属性卡片，开始你的通关记录
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {Object.entries(TYPE_ICONS).map(([type, Icon]) => (
              <Link
                key={type}
                to={`/types/${type.toLowerCase()}`}
                className="group flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm transition-all hover:shadow-md"
              >
                <Icon className="h-4 w-4 text-accent-600" />
                <span className="text-sm font-medium text-ink-700">
                  {typeNamesCN[type] || type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}