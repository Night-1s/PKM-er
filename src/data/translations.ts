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
  const suffixMap: [RegExp, string][] = [
    [/ Mega Redux$/, ' Mega R'],
    [/ Mega X$/, ' Mega X'],
    [/ Mega Y$/, ' Mega Y'],
    [/ Redux$/, ' R'],
    [/ Mega$/, ' Mega'],
    [/ Gmax$/, ' Gmax'],
    [/ Alola$/, ' Alola'],
    [/ Galar$/, ' Galar'],
    [/ Hisui$/, ' Hisui'],
    [/ Paldea$/, ' Paldea'],
    [/ Polar$/, ' Polar'],
    [/ Sandstorm$/, ' Sandstorm'],
    [/ Ocean$/, ' Ocean'],
    [/ Continental$/, ' Continental'],
    [/ Elegant$/, ' Elegant'],
    [/ Garden$/, ' Garden'],
    [/ High Plains$/, ' High Plains'],
    [/ Monsoon$/, ' Monsoon'],
    [/ Savanna$/, ' Savanna'],
    [/ Sun$/, ' Sun'],
    [/ Tundra$/, ' Tundra'],
    [/ Douse Drive$/, ' Douse Drive'],
    [/ Shock Drive$/, ' Shock Drive'],
    [/ Burn Drive$/, ' Burn Drive'],
    [/ Chill Drive$/, ' Chill Drive'],
  ];
  
  for (const [re, cnSuffix] of suffixMap) {
    if (re.test(enName)) {
      const baseName = enName.replace(re, '');
      const baseCn = pokemonNameMap[baseName] ?? baseName;
      return baseCn + cnSuffix;
    }
  }
  
  return pokemonNameMap[enName] ?? enName;
}
