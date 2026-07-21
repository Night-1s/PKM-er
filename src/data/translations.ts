import { POKEMONS } from './pokemon';

/**
 * 英文宝可梦名称 -> 中文宝可梦名称
 * 仅包含 nameEn 非空的条目
 */
export const pokemonNameMap: Record<string, string> = Object.fromEntries(
  POKEMONS.filter((p) => p.nameEn.trim() !== '').map((p) => [p.nameEn, p.nameCn])
);

/**
 * 根据英文名称获取中文名称；若未找到则返回原英文名称
 */
export function getPokemonNameCN(enName: string): string {
  return pokemonNameMap[enName] ?? enName;
}
