// 18 宝可梦属性元数据
// 颜色与 tailwind.config.js 中 type 调色板一致

export type TypeId =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

export interface PokeType {
  id: TypeId;
  nameCn: string;
  nameEn: string;
  color: string;
  // 单字符号用于像素徽章
  symbol: string;
  // 在 HELL MODE 下，纯属性通关的难度评级
  tier: "S" | "A" | "B" | "C";
  // 一句话风格描述
  tagline: string;
  // 攻击克制（造成 2x）
  strongAgainst: TypeId[];
  // 被克制（受到 2x）
  weakTo: TypeId[];
  // 抵抗（受到 0.5x）
  resists: TypeId[];
  // 免疫
  immuneTo: TypeId[];
}

export const TYPE_LIST: PokeType[] = [
  {
    id: "normal",
    nameCn: "一般",
    nameEn: "Normal",
    color: "#A8A77A",
    symbol: "一",
    tier: "B",
    tagline: "无属性即全属性 · 大胆的均衡挑战",
    strongAgainst: [],
    weakTo: ["fighting"],
    resists: [],
    immuneTo: ["ghost"],
  },
  {
    id: "fire",
    nameCn: "火",
    nameEn: "Fire",
    color: "#EE8130",
    symbol: "火",
    tier: "A",
    tagline: "烈焰焚天 · 输出爆表的脆皮刺客",
    strongAgainst: ["grass", "ice", "bug", "steel"],
    weakTo: ["water", "ground", "rock"],
    resists: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    immuneTo: [],
  },
  {
    id: "water",
    nameCn: "水",
    nameEn: "Water",
    color: "#6390F0",
    symbol: "水",
    tier: "S",
    tagline: "深渊潮汐 · 全程稳健的最强属性",
    strongAgainst: ["fire", "ground", "rock"],
    weakTo: ["electric", "grass"],
    resists: ["fire", "water", "ice", "steel"],
    immuneTo: [],
  },
  {
    id: "electric",
    nameCn: "电",
    nameEn: "Electric",
    color: "#F7D02C",
    symbol: "电",
    tier: "A",
    tagline: "雷霆扫穴 · 速攻麻痹控场流",
    strongAgainst: ["water", "flying"],
    weakTo: ["ground"],
    resists: ["electric", "flying", "steel"],
    immuneTo: [],
  },
  {
    id: "grass",
    nameCn: "草",
    nameEn: "Grass",
    color: "#7AC74C",
    symbol: "草",
    tier: "B",
    tagline: "腐殖蔓延 · 状态干扰但被克制多",
    strongAgainst: ["water", "ground", "rock"],
    weakTo: ["fire", "ice", "poison", "flying", "bug"],
    resists: ["water", "electric", "grass", "ground"],
    immuneTo: [],
  },
  {
    id: "ice",
    nameCn: "冰",
    nameEn: "Ice",
    color: "#96D9D6",
    symbol: "冰",
    tier: "C",
    tagline: "永冻裂痕 · 高伤但脆如薄冰",
    strongAgainst: ["grass", "ground", "flying", "dragon"],
    weakTo: ["fire", "fighting", "rock", "steel"],
    resists: ["ice"],
    immuneTo: [],
  },
  {
    id: "fighting",
    nameCn: "格斗",
    nameEn: "Fighting",
    color: "#C22E28",
    symbol: "格",
    tier: "A",
    tagline: "拳破千军 · 高压制近战输出",
    strongAgainst: ["normal", "ice", "rock", "dark", "steel"],
    weakTo: ["flying", "psychic", "fairy"],
    resists: ["bug", "rock", "dark"],
    immuneTo: [],
  },
  {
    id: "poison",
    nameCn: "毒",
    nameEn: "Poison",
    color: "#A33EA1",
    symbol: "毒",
    tier: "B",
    tagline: "腐肉蚀骨 · 持续消耗的拖延流",
    strongAgainst: ["grass", "fairy"],
    weakTo: ["ground", "psychic"],
    resists: ["grass", "fighting", "poison", "bug", "fairy"],
    immuneTo: [],
  },
  {
    id: "ground",
    nameCn: "地面",
    nameEn: "Ground",
    color: "#E2BF65",
    symbol: "地",
    tier: "S",
    tagline: "裂地崩山 · 电免 + 高打击面",
    strongAgainst: ["fire", "electric", "poison", "rock", "steel"],
    weakTo: ["water", "grass", "ice"],
    resists: ["poison", "rock"],
    immuneTo: ["electric"],
  },
  {
    id: "flying",
    nameCn: "飞行",
    nameEn: "Flying",
    color: "#A98FF3",
    symbol: "飞",
    tier: "A",
    tagline: "翱翔天际 · 地免 + 高速压制",
    strongAgainst: ["grass", "fighting", "bug"],
    weakTo: ["electric", "ice", "rock"],
    resists: ["grass", "fighting", "bug"],
    immuneTo: ["ground"],
  },
  {
    id: "psychic",
    nameCn: "超能",
    nameEn: "Psychic",
    color: "#F95587",
    symbol: "超",
    tier: "A",
    tagline: "心灵之眼 · 特攻爆发型控场",
    strongAgainst: ["fighting", "poison"],
    weakTo: ["bug", "ghost", "dark"],
    resists: ["fighting", "psychic"],
    immuneTo: [],
  },
  {
    id: "bug",
    nameCn: "虫",
    nameEn: "Bug",
    color: "#A6B91A",
    symbol: "虫",
    tier: "C",
    tagline: "蜂群吞噬 · 低数值高技巧",
    strongAgainst: ["grass", "psychic", "dark"],
    weakTo: ["fire", "flying", "rock"],
    resists: ["grass", "fighting", "ground"],
    immuneTo: [],
  },
  {
    id: "rock",
    nameCn: "岩石",
    nameEn: "Rock",
    color: "#B6A136",
    symbol: "岩",
    tier: "B",
    tagline: "磐石堡垒 · 高防低速的抗伤流",
    strongAgainst: ["fire", "ice", "flying", "bug"],
    weakTo: ["water", "grass", "fighting", "ground", "steel"],
    resists: ["normal", "fire", "poison", "flying"],
    immuneTo: [],
  },
  {
    id: "ghost",
    nameCn: "幽灵",
    nameEn: "Ghost",
    color: "#735797",
    symbol: "灵",
    tier: "S",
    tagline: "冥府低语 · 双免 + 高爆发的王者",
    strongAgainst: ["psychic", "ghost"],
    weakTo: ["ghost", "dark"],
    resists: ["poison", "bug"],
    immuneTo: ["normal", "fighting"],
  },
  {
    id: "dragon",
    nameCn: "龙",
    nameEn: "Dragon",
    color: "#6F35FC",
    symbol: "龙",
    tier: "S",
    tagline: "古龙之怒 · 全属性霸主",
    strongAgainst: ["dragon"],
    weakTo: ["ice", "dragon", "fairy"],
    resists: ["fire", "water", "electric", "grass"],
    immuneTo: [],
  },
  {
    id: "dark",
    nameCn: "恶",
    nameEn: "Dark",
    color: "#705746",
    symbol: "恶",
    tier: "A",
    tagline: "诡谲暗影 · 超能免疫的破坏者",
    strongAgainst: ["psychic", "ghost"],
    weakTo: ["fighting", "bug", "fairy"],
    resists: ["ghost", "dark"],
    immuneTo: ["psychic"],
  },
  {
    id: "steel",
    nameCn: "钢",
    nameEn: "Steel",
    color: "#B7B7CE",
    symbol: "钢",
    tier: "S",
    tagline: "钢铁壁垒 · 10 项抗性的终极防线",
    strongAgainst: ["ice", "rock", "fairy"],
    weakTo: ["fire", "fighting", "ground"],
    resists: ["normal", "grass", "ice", "flying", "psychic", "bug", "rock", "dragon", "steel", "fairy"],
    immuneTo: ["poison"],
  },
  {
    id: "fairy",
    nameCn: "妖精",
    nameEn: "Fairy",
    color: "#D685AD",
    symbol: "妖",
    tier: "S",
    tagline: "幻梦之光 · 龙克星的现代霸主",
    strongAgainst: ["fighting", "dragon", "dark"],
    weakTo: ["poison", "steel"],
    resists: ["fighting", "bug", "dark"],
    immuneTo: ["dragon"],
  },
];

export const TYPE_IDS: TypeId[] = TYPE_LIST.map((t) => t.id);

export const TYPE_MAP: Record<TypeId, PokeType> = TYPE_LIST.reduce(
  (acc, t) => {
    acc[t.id] = t;
    return acc;
  },
  {} as Record<TypeId, PokeType>,
);

export const TIER_COLOR: Record<PokeType["tier"], string> = {
  S: "#F5C518",
  A: "#FF6B1A",
  B: "#96D9D6",
  C: "#705746",
};
