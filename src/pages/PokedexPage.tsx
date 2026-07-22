import { useState, useEffect, useMemo, useRef } from 'react';
import { loadERGameData, ERSpecies, ERGameData, getTypes, getAbilities, getMoves, getMoveName, getBST, typeColors, typeNamesCN, ERAbility } from '../data/erPokedex';
import { getPokemonNameCN } from '../data/translations';
import { ABILITIES } from '../data/abilities';
import SmartPokemonImg from '../components/SmartPokemonImg';

const getTypeCN = (type: string) => typeNamesCN[type.toUpperCase()] || type;

const getAbilityDesc = (abilityName: string): string => {
  const ability = ABILITIES.find(a => a.name === abilityName);
  return ability?.desc || '';
};

const getPokemonImgUrls = (name: string, dexId?: number): string[] => {
  let baseName = name.toLowerCase();
  baseName = baseName.replace(/ redux$/, '');
  baseName = baseName.replace(/ redux mega$/, '');
  baseName = baseName.replace(/ mega$/, '');
  baseName = baseName.replace(/(-gmax|-alola|-galar|-hisui|-paldea|-mega)$/, '');
  
  if (baseName.includes('♀')) {
    baseName = baseName.replace(/♀/g, '-f');
  }
  if (baseName.includes('♂')) {
    baseName = baseName.replace(/♂/g, '-m');
  }
  
  baseName = baseName.replace(/[\s\u2640\u2642]/g, '-');
  
  const urls: string[] = [];
  
  urls.push(`/pokemon-images/${baseName}.png`);
  
  urls.push(`https://img.pokemondb.net/sprites/home/normal/${baseName}.png`);
  urls.push(`https://img.pokemondb.net/sprites/home/normal/${baseName.replace(/-/g, '')}.png`);
  
  if (dexId && dexId > 0) {
    urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexId}.png`);
    urls.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${dexId}.png`);
  }
  
  const simpleName = baseName.split('-')[0];
  if (simpleName !== baseName) {
    urls.push(`/pokemon-images/${simpleName}.png`);
    urls.push(`https://img.pokemondb.net/sprites/home/normal/${simpleName}.png`);
  }
  
  return urls;
};

const dedupeTypes = (types: string[]): string[] => {
  const seen = new Set<string>();
  return types.filter(t => {
    if (seen.has(t)) return false;
    seen.add(t);
    return true;
  });
};

export default function PokedexPage() {
  const [data, setData] = useState<ERGameData | null>(null);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<ERSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const detailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadERGameData(setProgress).then(d => {
      setData(d);
      setLoading(false);
    });
  }, []);

  const filteredSpecies = useMemo(() => {
    if (!data) return [];
    
    return data.species.filter(sp => {
      if (sp.id <= 0) return false;
      
      const name = sp.name.toLowerCase();
      if (name.includes(' redux') && !name.includes('mega redux')) return false;
      if (name.includes(' drive')) return false;
      if (name.includes(' polar')) return false;
      if (name.includes(' sandstorm')) return false;
      if (name.includes(' ocean')) return false;
      if (name.includes(' continental')) return false;
      if (name.includes(' elegant')) return false;
      if (name.includes(' garden')) return false;
      if (name.includes(' high plains')) return false;
      if (name.includes(' monsoon')) return false;
      if (name.includes(' savanna')) return false;
      if (name.includes(' sun')) return false;
      if (name.includes(' tundra')) return false;
      
      const matchName = name.includes(search.toLowerCase()) ||
        getPokemonNameCN(sp.name).toLowerCase().includes(search.toLowerCase());
      
      let matchType = true;
      if (selectedType) {
        const typeMatch = sp.stats.types.some(t => {
          const typeName = data.typeT[t];
          return typeName === selectedType || 
                 typeNamesCN[typeName.toUpperCase()] === selectedType;
        });
        matchType = typeMatch;
      }
      
      return matchName && matchType;
    });
  }, [data, search, selectedType]);

  const validTypeNames = ['NORMAL', 'FIRE', 'WATER', 'ELECTRIC', 'GRASS', 'ICE', 'FIGHTING', 'POISON', 'GROUND', 'FLYING', 'PSYCHIC', 'BUG', 'ROCK', 'GHOST', 'DRAGON', 'DARK', 'STEEL', 'FAIRY'];
  
  const uniqueTypes = useMemo(() => {
    if (!data) return [];
    const types = new Set(data.typeT.filter(t => t && validTypeNames.includes(t.toUpperCase())));
    return Array.from(types).sort();
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="text-2xl font-bold text-gray-700 mb-6">加载图鉴数据中...</div>
        <div className="w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-gray-500 mt-2">{progress}%</div>
      </div>
    );
  }

  if (!data) {
    return <div className="p-4 text-red-500">无法加载图鉴数据</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Elite Redux 2.65 图鉴</h1>
          <p className="text-gray-600 mt-2">共 {filteredSpecies.length} 种宝可梦</p>
        </div>

        {/* 搜索和筛选 */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <div className="flex flex-wrap gap-4">
            <input
              type="text"
              placeholder="搜索宝可梦名称..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部属性</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>
                  {typeNamesCN[type.toUpperCase()] || type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* 宝可梦列表 */}
          <div className="lg:w-80 bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="h-[calc(100vh-320px)] overflow-y-auto">
              {filteredSpecies.map(sp => (
                <div
                  key={sp.id}
                  onClick={() => {
                    setSelectedSpecies(sp);
                    setTimeout(() => {
                      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 50);
                  }}
                  className={`flex items-center gap-3 p-4 cursor-pointer border-b border-gray-100 hover:bg-blue-50 transition-colors ${
                    selectedSpecies?.id === sp.id ? 'bg-blue-100' : ''
                  }`}
                >
                  <SmartPokemonImg 
                    urls={getPokemonImgUrls(sp.name, sp.dex?.id)} 
                    alt={sp.name}
                    size="small"
                  />
                  <div className="flex-1 font-medium">
                    <div>{getPokemonNameCN(sp.name)}</div>
                    {getPokemonNameCN(sp.name) !== sp.name && (
                      <div className="text-xs text-gray-400">{sp.name}</div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {dedupeTypes(sp.stats.types.map(t => data.typeT[t])).map((typeName, i) => {
                      const typeNameUpper = typeName.toUpperCase();
                      return (
                        <span
                          key={i}
                          className={`px-2 py-0.5 text-xs text-white rounded ${typeColors[typeNameUpper] || 'bg-gray-400'}`}
                        >
                          {typeNamesCN[typeNameUpper] || typeName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 详情面板 */}
          <div ref={detailRef} className="flex-1 bg-white rounded-xl shadow-sm p-8">
            {selectedSpecies ? (
              <SpeciesDetail species={selectedSpecies} data={data} />
            ) : (
              <div className="flex flex-col items-center justify-center h-80 text-gray-400">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">?</span>
                </div>
                <p className="text-lg">请从左侧选择一只宝可梦</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SpeciesDetail({ species, data }: { species: ERSpecies; data: ERGameData }) {
  const types = dedupeTypes(getTypes(species.stats.types, data.typeT));
  const abilities = getAbilities(species.stats.abis, data.abilities);
  const innates = getAbilities(species.stats.inns, data.abilities);
  const bst = getBST(species.stats.base);

  return (
    <div className="space-y-8">
      {/* 头部信息 */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <SmartPokemonImg 
              urls={getPokemonImgUrls(species.name, species.dex?.id)} 
              alt={species.name}
              size="large"
              className="rounded-2xl shadow-inner"
            />
          <div>
            <div className="text-sm text-gray-500">#{species.dex?.id || species.id}</div>
            <h2 className="text-3xl font-bold text-gray-800 mt-1">
              {getPokemonNameCN(species.name)}
              {getPokemonNameCN(species.name) !== species.name && (
                <span className="text-lg text-gray-500 ml-2">({species.name})</span>
              )}
            </h2>
            <div className="flex gap-2 mt-3">
              {types.map((type, i) => (
                <span
                  key={i}
                  className={`px-4 py-1.5 text-white rounded-xl font-medium shadow-sm ${typeColors[type] || 'bg-gray-400'}`}
                >
                  {getTypeCN(type)}
                </span>
              ))}
            </div>
          </div>
        </div>
        {species.dex?.desc && (
          <div className="max-w-md text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
            {species.dex.desc}
          </div>
        )}
      </div>

      {/* 基础数值 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">基础数值</h3>
          <div className="grid grid-cols-2 gap-3">
            {['HP', '攻击', '防御', '特攻', '特防', '速度'].map((label, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <div className="text-sm text-gray-500">{label}</div>
                <div className="text-2xl font-bold mt-1">{species.stats.base[i]}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-blue-50 rounded-xl p-4">
            <div className="text-sm text-gray-500">种族值合计</div>
            <div className="text-3xl font-bold text-blue-700 mt-1">{bst}</div>
          </div>
        </div>

        {species.dex?.hw && (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">体型</h3>
            <div className="space-y-3">
              <div className="flex justify-between bg-gray-50 rounded-xl p-3">
                <span className="text-gray-600">身高</span>
                <span className="font-bold">{species.dex.hw[0] / 10}m</span>
              </div>
              <div className="flex justify-between bg-gray-50 rounded-xl p-3">
                <span className="text-gray-600">体重</span>
                <span className="font-bold">{species.dex.hw[1] / 10}kg</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 特性 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">特性 (三选一)</h3>
          <div className="space-y-3">
            {abilities.map((abi, i) => {
              const cnName = abi.split(' / ')[0];
              const enName = abi.includes(' / ') ? abi.split(' / ')[1] : '';
              const desc = getAbilityDesc(cnName);
              return (
                <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="font-bold text-green-800 text-lg">{cnName}</div>
                  {enName && (
                    <div className="text-sm text-gray-500">({enName})</div>
                  )}
                  {desc && (
                    <div className="text-sm text-gray-600 mt-2 leading-relaxed bg-green-100/50 rounded-lg p-3">
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">天性 (固定)</h3>
          <div className="space-y-3">
            {innates.map((inn, i) => {
              const cnName = inn.split(' / ')[0];
              const enName = inn.includes(' / ') ? inn.split(' / ')[1] : '';
              const desc = getAbilityDesc(cnName);
              return (
                <div key={i} className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="font-bold text-purple-800 text-lg">{cnName}</div>
                  {enName && (
                    <div className="text-sm text-gray-500">({enName})</div>
                  )}
                  {desc && (
                    <div className="text-sm text-gray-600 mt-2 leading-relaxed bg-purple-100/50 rounded-lg p-3">
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 升级招式 */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">升级招式</h3>
        <div className="bg-gray-50 rounded-xl p-5 max-h-80 overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {species.levelUpMoves
              .sort((a, b) => a.lv - b.lv)
              .map((move, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-white rounded-lg px-3 py-2">
                  <span className="text-gray-500 w-10 font-mono">Lv.{move.lv}</span>
                  <span className="font-medium">{getMoveName(move.id, data.moves).split(' / ')[0]}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 教学/定点招式 */}
      {species.tutor.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">教学/定点招式</h3>
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="flex flex-wrap gap-2">
              {getMoves(species.tutor, data.moves).map((move, i) => (
                <span key={i} className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm">
                  {move.split(' / ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 进化链 */}
      {species.evolutions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">进化</h3>
          <div className="bg-gray-50 rounded-xl p-5">
            {species.evolutions.map((evo, i) => {
              const target = data.species.find(s => s.id === evo.in);
              return (
                <div key={i} className="flex flex-wrap items-center gap-3">
                  <span className="font-bold text-lg">{getPokemonNameCN(species.name)}</span>
                  <span className="text-gray-500 text-xl">→</span>
                  <span className="font-bold text-blue-600 text-lg">{target?.name ? getPokemonNameCN(target.name) : `Species${evo.in}`}</span>
                  <span className="text-gray-500 text-sm">({evo.rs})</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}