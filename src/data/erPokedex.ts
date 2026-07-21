// ER 2.65 图鉴数据服务

export interface ERAbility {
  name: string;
  desc: string;
  id: number;
}

export interface ERMove {
  name: string;
  NAME: string;
  sName: string;
  eff: number;
  pwr: number;
  types: number[];
  acc: number;
  pp: number;
  chance: number;
  target: number;
  prio: number;
  split: number;
  flags: number[];
  arg: string;
  desc: string;
  lDesc: string;
  sDesc: string;
  id: number;
}

export interface ERSpecies {
  id: number;
  name: string;
  NAME: string;
  stats: {
    base: [number, number, number, number, number, number]; // HP, Atk, Def, SpA, SpD, Spe
    types: number[];
    catchR: number;
    exp: number;
    EVY: number[];
    gender: number;
    eggC: number;
    fren: number;
    grow: number;
    eggG: number[];
    abis: number[]; // 普通特性 (3选1)
    inns: number[]; // 天性 (3个)
    col: number;
    noFlip: boolean;
    flags: string;
  };
  evolutions: Array<{
    kd: number; // 进化方式
    rs: string; // 条件
    in: number; // 进化目标ID
  }>;
  eggMoves: number[];
  levelUpMoves: Array<{
    id: number;
    lv: number;
  }>;
  TMHMMoves: number[];
  tutor: number[];
  forms: string[];
  SEnc: Array<{
    map: number;
    how: number;
  }>;
  dex: {
    id: number;
    desc: string;
    hw: [number, number]; // height, weight
  };
}

export interface ERGameData {
  abilities: ERAbility[];
  moves: ERMove[];
  species: ERSpecies[];
  locations: string[];
  typeT: string[];
  items: string[];
}

let gameData: ERGameData | null = null;
let abilityTranslation: Record<string, string> | null = null;
let moveTranslation: Record<string, string> | null = null;

export async function loadERGameData(
  onProgress?: (progress: number) => void
): Promise<ERGameData> {
  if (gameData) {
    onProgress?.(100);
    return gameData;
  }

  let loaded = 0;
  const total = 3;
  const reportProgress = () => {
    loaded++;
    onProgress?.(Math.round((loaded / total) * 100));
  };

  const [gameRes, abilityRes, moveRes] = await Promise.all([
    fetch('/er-gamedata.json').then(r => { reportProgress(); return r; }),
    fetch('/er-ability-translation.json').then(r => { reportProgress(); return r; }),
    fetch('/er-move-translation.json').then(r => { reportProgress(); return r; }),
  ]);

  gameData = await gameRes.json();
  abilityTranslation = await abilityRes.json();
  moveTranslation = await moveRes.json();
  onProgress?.(100);
  return gameData!;
}

export function getSpeciesName(species: ERSpecies): string {
  return species.name;
}

export function getTypes(typeIds: number[], types: string[]): string[] {
  return typeIds.map(id => types[id] || `Type${id}`);
}

export function getAbilityName(abilityId: number, abilities: ERAbility[]): string {
  const a = abilities[abilityId];
  if (!a) return `Ability${abilityId}`;
  const cn = abilityTranslation?.[a.name];
  return cn ? `${cn} / ${a.name}` : a.name;
}

export function getMoveName(moveId: number, moves: ERMove[]): string {
  const m = moves[moveId];
  if (!m) return `Move${moveId}`;
  const cn = moveTranslation?.[m.name];
  return cn ? `${cn} / ${m.name}` : m.name;
}

export function getAbilities(abilityIds: number[], abilities: ERAbility[]): string[] {
  return abilityIds.map(id => getAbilityName(id, abilities));
}

export function getMoves(moveIds: number[], moves: ERMove[]): string[] {
  return moveIds.map(id => getMoveName(id, moves));
}

export function getBST(base: number[]): number {
  return base.reduce((a, b) => a + b, 0);
}

// 类型颜色映射
export const typeColors: Record<string, string> = {
  'NORMAL': 'bg-gray-400',
  'FIRE': 'bg-orange-500',
  'WATER': 'bg-blue-500',
  'ELECTRIC': 'bg-yellow-400',
  'GRASS': 'bg-green-500',
  'ICE': 'bg-cyan-300',
  'FIGHTING': 'bg-red-700',
  'POISON': 'bg-purple-500',
  'GROUND': 'bg-yellow-700',
  'FLYING': 'bg-indigo-300',
  'PSYCHIC': 'bg-pink-500',
  'BUG': 'bg-lime-500',
  'ROCK': 'bg-yellow-800',
  'GHOST': 'bg-purple-600',
  'DRAGON': 'bg-indigo-600',
  'DARK': 'bg-gray-800',
  'STEEL': 'bg-gray-500',
  'FAIRY': 'bg-pink-300',
};

// 类型中文名映射
export const typeNamesCN: Record<string, string> = {
  'NORMAL': '一般',
  'FIRE': '火',
  'WATER': '水',
  'ELECTRIC': '电',
  'GRASS': '草',
  'ICE': '冰',
  'FIGHTING': '格斗',
  'POISON': '毒',
  'GROUND': '地面',
  'FLYING': '飞行',
  'PSYCHIC': '超能',
  'BUG': '虫',
  'ROCK': '岩石',
  'GHOST': '幽灵',
  'DRAGON': '龙',
  'DARK': '恶',
  'STEEL': '钢',
  'FAIRY': '妖精',
};