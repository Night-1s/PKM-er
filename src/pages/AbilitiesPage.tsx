import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Sparkles, BookOpen } from "lucide-react";
import { loadERGameData, ERGameData, ERSpecies, typeNamesCN } from "../data/erPokedex";
import { getPokemonNameCN } from "../data/translations";
import { ABILITIES } from "../data/abilities";

export default function AbilitiesPage() {
  const [data, setData] = useState<ERGameData | null>(null);
  const [abilityCNMap, setAbilityCNMap] = useState<Record<string, { name: string; desc: string }>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([
      loadERGameData(),
      fetch("/er-ability-translation.json").then(r => r.json())
    ]).then(([gameData, nameTranslation]) => {
      const cnNameToDesc: Record<string, string> = {};
      for (const a of ABILITIES) {
        cnNameToDesc[a.name] = a.desc;
      }

      const map: Record<string, { name: string; desc: string }> = {};
      for (const [enName, cnName] of Object.entries(nameTranslation)) {
        map[enName] = {
          name: cnName as string,
          desc: cnNameToDesc[cnName as string] || ""
        };
      }
      setAbilityCNMap(map);
      setData(gameData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="container py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent-200 border-t-accent-600"></div>
        <p className="mt-4 text-sm text-ink-500">加载特性数据中...</p>
      </div>
    );
  }

  const getAbilityName = (name: string) => {
    const cn = abilityCNMap[name];
    if (cn?.name) return cn.name;
    return name;
  };

  const getAbilityDesc = (name: string) => {
    const cn = abilityCNMap[name];
    if (cn?.desc) return cn.desc;
    return "";
  };

  const abilities = data!.abilities.filter(a => 
    a.id !== 0 && a.name !== "------" && a.desc !== "Empty ability slot."
  );

  const filteredAbilities = abilities.filter((a) => {
    const cnName = getAbilityName(a.name);
    const cnDesc = getAbilityDesc(a.name);
    return (
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cnName.includes(searchTerm) ||
      cnDesc.includes(searchTerm)
    );
  });

  const getPokemonWithAbility = (abilityId: number): ERSpecies[] => {
    return data!.species.filter((s) => 
      s.stats.abis.includes(abilityId) || s.stats.inns.includes(abilityId)
    );
  };

  const getAbilityType = (species: ERSpecies) => {
    const types = species.stats.types.map((t) => data!.typeT[t]).filter(Boolean);
    return types.length > 0 ? types[0] : "NORMAL";
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="border-b border-ink-200 bg-white">
        <div className="container py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition-colors hover:text-ink-800"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <div className="mt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50">
                <Sparkles className="h-6 w-6 text-accent-600" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-ink-400">ER 2.65 Abilities</p>
                <h1 className="font-display text-3xl font-bold text-ink-900">特性图鉴</h1>
              </div>
            </div>
            <p className="mt-2 max-w-xl text-sm text-ink-500">
              ER 2.65 特性系统：1个特性（3选1）+3个天性（固定）。点击特性查看拥有该特性的宝可梦。
            </p>
          </div>

          <div className="mt-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-400" />
            <input
              type="text"
              placeholder="搜索特性名称或效果..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-ink-200 bg-ink-50 py-3 pl-10 pr-4 text-sm focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>
        </div>
      </section>

      <section className="bg-ink-50 py-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {filteredAbilities.map((ability) => (
              <div
                key={ability.id}
                onClick={() => setSelectedId(selectedId === ability.id ? null : ability.id)}
                className={`card p-5 cursor-pointer transition-all ${
                  selectedId === ability.id ? "ring-2 ring-accent-500" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-ink-900">
                      {getAbilityName(ability.name)}
                    </h3>
                    <p className="mt-1 text-xs text-ink-400">
                      {ability.name} · ID: {ability.id}
                    </p>
                  </div>
                  <Sparkles className="h-4 w-4 text-accent-400 shrink-0 ml-2" />
                </div>
                <p className="mt-3 text-sm text-ink-600 leading-relaxed">
                  {getAbilityDesc(ability.name) || ability.desc}
                </p>

                {selectedId === ability.id && (
                  <div className="mt-4 pt-4 border-t border-ink-100">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="h-4 w-4 text-accent-500" />
                      <span className="text-xs font-medium text-ink-600">拥有该特性的宝可梦</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getPokemonWithAbility(ability.id).map((species) => (
                        <div
                          key={species.id}
                          className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm"
                        >
                          <div
                            className="h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: getTypeColor(getAbilityType(species)) }}
                          >
                            {typeNamesCN[getAbilityType(species)]?.[0]}
                          </div>
                          <span className="text-xs text-ink-700">
                            {getPokemonNameCN(species.name)}
                          </span>
                        </div>
                      ))}
                    </div>
                    {getPokemonWithAbility(ability.id).length === 0 && (
                      <p className="text-xs text-ink-400">暂无宝可梦拥有此特性</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredAbilities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-ink-500">未找到匹配的特性</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function getTypeColor(typeName: string): string {
  const colors: Record<string, string> = {
    NORMAL: "#A8A878",
    FIRE: "#F08030",
    WATER: "#6890F0",
    ELECTRIC: "#F8D030",
    GRASS: "#78C850",
    ICE: "#98D8D8",
    FIGHTING: "#C03028",
    POISON: "#A040A0",
    GROUND: "#E0C068",
    FLYING: "#A890F0",
    PSYCHIC: "#F85888",
    BUG: "#A8B820",
    ROCK: "#B8A038",
    GHOST: "#705898",
    DRAGON: "#7038F8",
    DARK: "#705848",
    STEEL: "#B8B8D0",
    FAIRY: "#EE99AC",
  };
  return colors[typeName.toUpperCase()] || "#909090";
}
