import { POKEMONS } from './pokemon';

export const pokemonNameMap: Record<string, string> = Object.fromEntries(
  POKEMONS.filter((p) => p.nameEn.trim() !== '').map((p) => [p.nameEn, p.nameCn])
);

const TYPE_CN: Record<string, string> = {
  Normal: '一般', Fighting: '格斗', Fire: '火', Ice: '冰',
  Electric: '电', Bug: '虫', Flying: '飞行', Steel: '钢',
  Grass: '草', Ground: '地面', Poison: '毒', Dark: '恶',
  Water: '水', Psychic: '超能', Rock: '岩石', Dragon: '龙',
  Ghost: '幽灵', Fairy: '妖精',
};

const VIVILLON_PATTERN_CN: Record<string, string> = {
  'Polar': '极地', 'Tundra': '雪原', 'Continental': '大陆', 'Gardens': '花园',
  'Elegant': '高雅', 'Meadow': '草原', 'Modern': '现代', 'Marine': '大海',
  'Archipelago': '群岛', 'High Plains': '高原', 'Sandstorm': '砂漠', 'River': '河流',
  'Monsoon': '雨季', 'Savanna': '热带草原', 'Sun': '太阳', 'Ocean': '大洋',
  'Jungle': '丛林', 'Fancy': '华丽', 'Pokéball': '精灵球',
};

const FLABEBE_COLOR_CN: Record<string, string> = {
  'Yellow': '黄', 'Orange': '橙', 'Blue': '蓝', 'White': '白',
};

const FURFROU_TRIM_CN: Record<string, string> = {
  'Heart': '心形', 'Star': '星形', 'Diamond': '钻石', 'Debutante': '贵妇人',
  'Matron': '淑女', 'Dandy': '丹迪', 'La Reine': '女王', 'Kabuki': '歌舞伎',
  'Pharaoh': '法老',
};

const PUMPKABOO_SIZE_CN: Record<string, string> = {
  'Small': '小', 'Large': '大', 'Super': '特大',
};

const MINIOR_COLOR_CN: Record<string, string> = {
  'Orange': '橙', 'Yellow': '黄', 'Green': '绿', 'Blue': '蓝',
  'Indigo': '靛', 'Violet': '紫',
};

const ALCREMIE_FLAVOR_CN: Record<string, string> = {
  'Ruby': '红宝石', 'Matcha': '抹茶', 'Mint': '薄荷', 'Lemon': '柠檬',
  'Salted': '盐奶油', 'Ruby Swirl': '红宝石漩涡', 'Caramel': '焦糖', 'Rainbow': '彩虹',
};

const TATSUGIRI_FORM_CN: Record<string, string> = {
  'Curly': '卷曲', 'Stretchy': '延伸', 'Droopy': '下垂',
};

const SQUAWKABILLY_COLOR_CN: Record<string, string> = {
  'Green Plumage': '绿头', 'Blue': '蓝头', 'Yellow': '黄头', 'White': '白头',
};

const OGERPON_MASK_CN: Record<string, string> = {
  'Wellspring Mask': '碧草', 'Hearthflame': '火灶', 'Cornerstone': '磐石',
};

const GENESECT_DRIVE_CN: Record<string, string> = {
  'Douse Drive': '水压卡带', 'Shock Drive': '闪电卡带',
  'Burn Drive': '火焰卡带', 'Chill Drive': '冰冻卡带',
};

const ROTOM_FORM_CN: Record<string, string> = {
  'Heat': '加热', 'Wash': '清洗', 'Frost': '结冰', 'Fan': '旋转', 'Mow': '切割',
};

export const erPokemonMap: Record<string, string> = {
  'Arachtres': '阿拉克托斯',
  'Beefender': '蜜蜂守卫',
  'Marbeep': '玛比蜂',
  'Fluffbee': '蓬松蜂',
  'Amphybuzz': '水陆蜂',
  'Frostula': '霜蛛',
  'Tyranjoula': '暴龙蛛',
  'Wispywaspy': '幽火蜂',
  'Wooly Worm': '毛虫子',
  'Torrentula': '激流蛛',
  'Selenumbra': '暗月蛛',
  'Iron Heart': '铁心',
  'Kipmodo': '水蜥兽',
  'Marshmodo': '沼蜥兽',
  'Swampage': '沼暴君',
  'Frostuccino': '冰奇诺',
  'Rexcadrill': '霸王鼹',
  'Luxzero': '光零',
  'Clawtificer': '钳匠',
  'Kecleong': '变色龙王',
  'Eraticate': '异变拉达',
  'Slate': '石板',
  'Pentadug Alolan': '阿罗拉三地鼠',
  'Gyaradeath Mega X': '暴鲤死 Mega X',
  'Gyaradeath Mega Y': '暴鲤死 Mega Y',
  'Carbonix Mega': '碳大钢蛇 Mega',
  'Grotom Glass': '洛托姆 玻璃',
  'Grotom Roll': '洛托姆 滚筒',
  'Grotom Drum': '洛托姆 鼓',
  'Grotom Kick': '洛托姆 踢',
  'Grotom Fill': '洛托姆 填充',
  'Heracreus Mega': '赫拉克勒斯 Mega',
  'Merrykarp': '欢乐鲤鱼王',
  'Gyarevelry': '欢乐暴鲤龙',
  'Terrow': '暗夜雀',
  'Kilozuna': '千钧相扑',
  'Fogging': '雾化',
  'Breezing': '微风',
  'Storming': '暴风',
  'Polartic Bluemoon': '极北 蓝月',
  'Lumbering Sloth Engulfed': '巨懒兽 吞噬',
  'Dragonite Delivery': '快龙 配送',
  'Mimikyu Rayquaza': '谜拟丘 烈空坐',
  'Kartana Fallen': '纸御剑 堕落',
  'Zapdos Ex': '闪电鸟 Ex',
  'Articuno Ex': '急冻鸟 Ex',
  'Moltres Ex': '火焰鸟 Ex',
  'Mimikyu Apex': '谜拟丘 顶点',
  'Mimikyu Apex Busted': '谜拟丘 顶点 现形',
  'Mimikyu Primal': '谜拟丘 原始',
  'Wigglytuff Apex': '胖可丁 顶点',
  'Wigglytuff Primal': '胖可丁 原始',
  'Espeon Primal': '太阳伊布 原始',
  'Snorlax Primal': '卡比兽 原始',
  'Victini Primal': '比克提尼 原始',
  'Darkrai Nightmare': '达克莱伊 噩梦',
  'Solrock System': '太阳岩 系统',
  'Spectrier Cloud': '灵幽马 云',
  'Calyrex Cloud Rider': '蕾冠王 云骑',
  'Abomasnow Santa': '暴雪王 圣诞',
  'Bewear Angry': '穿着熊 愤怒',
  'Darmanitan Aura': '达摩狒狒 气场',
  'Darmanitan Redux Bond': '达摩狒狒 Redux 羁绊',
  'Blunder-Darmanitan': '失误达摩狒狒',
  'Clemont-Chesnaught': '希特隆-布里卡隆',
  'Serena-Delphox': '莎莉娜-妖火红狐',
  'Morpekyll Hangry': '莫鲁贝可 空腹',
  'Unown Revelation': '未知图腾 启示',
  'Lycanroc Eclipse': '鬃岩狼人 日食',
  'Lycanroc Twilight': '鬃岩狼人 黄昏',
  'Ash-Greninja': '小智版甲贺忍蛙',
  'Dusk Mane': '黄昏之鬃',
  'Dawn Wings': '拂晓之翼',
  'Necrozma Ultra': '奈克洛兹玛 究极',
  'Eternatus Primal': '无极汰那 原始',
  'Terapagos Primal': '太乐巴戈斯 原始',
  'Hydroar F': '水主兽 F',
  'Basculegion F': '幽尾玄鱼 F',
  'Castform Sandy': '漂浮泡泡 沙',
  'Castform Foggy': '漂浮泡泡 雾',
  'Gimmighoul Roaming': '索财灵 漫游',
  'Pikachu Partner': '皮卡丘 搭档',
  'Eevee Partner': '伊布 搭档',
  'Meowth Partner': '喵喵 搭档',
  'Slaking Mega Ape Shift': '请假王 Mega 猿变',
  'Flygon Redux B': '沙漠蜻蜓 Redux B',
  'Flygon Redux B Mega': '沙漠蜻蜓 Redux B Mega',
  'Mawile Redux B': '大嘴娃 Redux B',
  'Mawile Redux B Mega': '大嘴娃 Redux B Mega',
  'Infernape Redux B': '烈焰猴 Redux B',
  'Toxtricity Redux Fuzz': '颤弦蝾螈 Redux 毛球',
  'Toxtricity Redux Fuzz Mega': '颤弦蝾螈 Redux 毛球 Mega',
  'Cormoth Mega': '柯莫蛾 Mega',
  'Popcorm Mega': '爆米花 Mega',
  'Iron Exo': '铁外骨骼',
};

function getBaseNameAndSuffix(name: string): { base: string; suffix: string } | null {
  const patterns: [RegExp, (m: RegExpMatchArray) => string][] = [
    [/ Mega Redux$/, () => ' Redux Mega'],
    [/ Mega X$/, () => ' Mega X'],
    [/ Mega Y$/, () => ' Mega Y'],
    [/ Mega Z$/, () => ' Mega Z'],
    [/ Redux Mega$/, () => ' Redux Mega'],
    [/ Primal$/, () => ' 原始'],
    [/ Mega$/, () => ' Mega'],
    [/ Alolan$/, () => ' 阿罗拉'],
    [/ Galarian$/, () => ' 伽勒尔'],
    [/ Hisuian$/, () => ' 洗翠'],
    [/ Paldean$/, () => ' 帕底亚'],
    [/ Gmax$/, () => ' 超极巨'],
    [/ Battle Bond$/, () => ' 羁绊变身'],
  ];
  
  for (const [re, getSuffix] of patterns) {
    const m = name.match(re);
    if (m) {
      return { base: name.replace(re, ''), suffix: getSuffix(m) };
    }
  }
  return null;
}

function translateSpecialForm(name: string): string | null {
  if (name.startsWith('Arceus ') && name !== 'Arceus') {
    const type = name.replace('Arceus ', '');
    return '阿尔宙斯 ' + (TYPE_CN[type] || type);
  }
  if (name.startsWith('Silvally ') && name !== 'Silvally') {
    const type = name.replace('Silvally ', '');
    return '银伴战兽 ' + (TYPE_CN[type] || type);
  }
  if (name.startsWith('Vivillon ')) {
    const pattern = name.replace('Vivillon ', '');
    return '彩粉蝶 ' + (VIVILLON_PATTERN_CN[pattern] || pattern);
  }
  if (name.startsWith('Burmy Sandy')) {
    return '结草儿 沙土';
  }
  if (name.startsWith('Burmy Trash')) {
    return '结草儿 垃圾';
  }
  if (name.startsWith('Burmy Eterna')) {
    return '结草儿 永恒';
  }
  if (name.startsWith('Wormadam Sandy')) {
    return '结草贵妇 沙土';
  }
  if (name.startsWith('Wormadam Trash')) {
    return '结草贵妇 垃圾';
  }
  if (name.startsWith('Genesect ')) {
    const drive = name.replace('Genesect ', '');
    return '盖诺赛克特 ' + (GENESECT_DRIVE_CN[drive] || drive);
  }
  if (name.startsWith('Rotom ')) {
    const form = name.replace('Rotom ', '');
    return '洛托姆 ' + (ROTOM_FORM_CN[form] || form);
  }
  if (name.startsWith('Flabebe ')) {
    const color = name.replace('Flabebe ', '');
    return '花蓓蓓 ' + (FLABEBE_COLOR_CN[color] || color);
  }
  if (name.startsWith('Floette ')) {
    const color = name.replace('Floette ', '');
    if (color === 'Eternal Flower') return '花叶蒂 永恒之花';
    return '花叶蒂 ' + (FLABEBE_COLOR_CN[color] || color);
  }
  if (name.startsWith('Florges ')) {
    const color = name.replace('Florges ', '');
    return '花洁夫人 ' + (FLABEBE_COLOR_CN[color] || color);
  }
  if (name.startsWith('Furfrou ')) {
    const trim = name.replace('Furfrou ', '');
    return '多丽米亚 ' + (FURFROU_TRIM_CN[trim] || trim);
  }
  if (name.startsWith('Pumpkaboo ')) {
    const size = name.replace('Pumpkaboo ', '');
    return '南瓜精 ' + (PUMPKABOO_SIZE_CN[size] || size);
  }
  if (name.startsWith('Gourgeist ')) {
    const size = name.replace('Gourgeist ', '');
    return '南瓜怪人 ' + (PUMPKABOO_SIZE_CN[size] || size);
  }
  if (name.startsWith('Minior ') && name.includes('Core')) {
    const color = name.replace('Minior Core ', '');
    return '小陨星 核心 ' + (MINIOR_COLOR_CN[color] || color);
  }
  if (name.startsWith('Minior ')) {
    const color = name.replace('Minior ', '');
    return '小陨星 ' + (MINIOR_COLOR_CN[color] || color);
  }
  if (name.startsWith('Alcremie ')) {
    const flavor = name.replace('Alcremie ', '');
    return '霜奶仙 ' + (ALCREMIE_FLAVOR_CN[flavor] || flavor);
  }
  if (name.startsWith('Tatsugiri ')) {
    const form = name.replace('Tatsugiri ', '');
    return '米立龙 ' + (TATSUGIRI_FORM_CN[form] || form);
  }
  if (name.startsWith('Squawkabilly ')) {
    const color = name.replace('Squawkabilly ', '');
    return '花舞鸟 ' + (SQUAWKABILLY_COLOR_CN[color] || color);
  }
  if (name.startsWith('Ogerpon ')) {
    const mask = name.replace('Ogerpon ', '');
    return '厄鬼椪 ' + (OGERPON_MASK_CN[mask] || mask);
  }
  if (name.startsWith('Deoxys ')) {
    const form = name.replace('Deoxys ', '');
    const cn: Record<string, string> = { 'Attack': '攻击', 'Defense': '防御', 'Speed': '速度' };
    return '代欧奇希斯 ' + (cn[form] || form);
  }
  if (name.startsWith('Giratina ')) {
    return '骑拉帝纳 起源';
  }
  if (name.startsWith('Shaymin ')) {
    return '谢米 天空';
  }
  if (name.startsWith('Kyurem ')) {
    const form = name.replace('Kyurem ', '');
    const cn: Record<string, string> = { 'White': '白', 'Black': '黑' };
    return '酋雷姆 ' + (cn[form] || form);
  }
  if (name.startsWith('Tornadus ') || name.startsWith('Thundurus ') || name.startsWith('Landorus ') || name.startsWith('Enamorus ')) {
    const base = name.replace(' Therian', '');
    const baseCn = pokemonNameMap[base] || base;
    return baseCn + ' 灵兽形态';
  }
  if (name.startsWith('Castform ')) {
    const form = name.replace('Castform ', '');
    const cn: Record<string, string> = { 'Sunny': '太阳', 'Rainy': '下雨', 'Snowy': '下雪', 'Sandy': '沙', 'Foggy': '雾' };
    return '漂浮泡泡 ' + (cn[form] || form);
  }
  if (name.startsWith('Cherrim ')) {
    return '樱花儿 晴天';
  }
  if (name.startsWith('Shellos ') || name.startsWith('Gastrodon ')) {
    const base = name.replace(' East', '');
    const baseCn = pokemonNameMap[base] || base;
    return baseCn + ' 东海';
  }
  if (name.startsWith('Basculin ')) {
    const base = name.replace(' Blue', '').replace(' White', '');
    const baseCn = pokemonNameMap['Basculin'] || base;
    const color = name.includes('Blue') ? ' 蓝条纹' : (name.includes('White') ? ' 白条纹' : '');
    return baseCn + color;
  }
  if (name.startsWith('Darmanitan ')) {
    if (name.includes('Zen Mode Galarian')) return '伽勒尔达摩狒狒 达摩模式';
    if (name.includes('Zen')) return '达摩狒狒 达摩模式';
    if (name.includes('Galarian')) return '伽勒尔达摩狒狒';
  }
  if (name.startsWith('Deerling ') || name.startsWith('Sawsbuck ')) {
    const seasonMap: Record<string, string> = { 'Summer': '夏天', 'Autumn': '秋天', 'Winter': '冬天' };
    for (const [en, cn] of Object.entries(seasonMap)) {
      if (name.endsWith(en)) {
        const base = name.replace(' ' + en, '');
        const baseCn = pokemonNameMap[base] || base;
        return baseCn + ' ' + cn;
      }
    }
  }
  if (name.startsWith('Meowstic ')) {
    return '超能妙喵 雌性';
  }
  if (name.startsWith('Aegislash Blade')) {
    return '坚盾剑怪 刀剑形态';
  }
  if (name.startsWith('Xerneas ')) {
    return '哲尔尼亚斯 活跃';
  }
  if (name.startsWith('Zygarde ')) {
    if (name.includes('Complete')) return '基格尔德 完全体形态';
    if (name.includes('10 Power Construct')) return '基格尔德 10%形态 群聚变形';
    if (name.includes('50 Power Construct')) return '基格尔德 50%形态 群聚变形';
    if (name.includes('10')) return '基格尔德 10%形态';
  }
  if (name.startsWith('Hoopa ')) {
    return '胡帕 解放';
  }
  if (name.startsWith('Oricorio ')) {
    const styleMap: Record<string, string> = { 'Pom Pom': '热情', 'Pau': '欢笑', 'Sensu': '月夜' };
    const style = name.replace('Oricorio ', '');
    return '花舞鸟 ' + (styleMap[style] || style);
  }
  if (name.startsWith('Rockruff ')) {
    return '岩狗狗 我行我素';
  }
  if (name.startsWith('Lycanroc ')) {
    if (name.includes('Midnight')) return '鬃岩狼人 黑夜';
    if (name.includes('Dusk')) return '鬃岩狼人 黄昏';
    if (name.includes('Eclipse')) return '鬃岩狼人 日食';
    if (name.includes('Twilight')) return '鬃岩狼人 拂晓';
  }
  if (name.startsWith('Wishiwashi ')) {
    return '弱丁鱼 鱼群';
  }
  if (name.startsWith('Mimikyu ')) {
    if (name.includes('Busted')) return '谜拟丘 现形';
  }
  if (name.startsWith('Cramorant ')) {
    if (name.includes('Gulping')) return '古月鸟 一口吞';
    if (name.includes('Gorging')) return '古月鸟 饱食';
  }
  if (name.startsWith('Toxtricity ')) {
    if (name.includes('Low Key')) return '颤弦蝾螈 低调';
  }
  if (name.startsWith('Sinistea ') || name.startsWith('Polteageist ')) {
    if (name.includes('Antique')) {
      const base = name.replace(' Antique', '');
      const baseCn = pokemonNameMap[base] || base;
      return baseCn + ' 破损的';
    }
  }
  if (name.startsWith('Eiscue ')) {
    return '冰砌鹅 冻头';
  }
  if (name.startsWith('Indeedee ')) {
    return '爱管侍 雌性';
  }
  if (name.startsWith('Morpeko ')) {
    if (name.includes('Hangry')) return '莫鲁贝可 空腹';
  }
  if (name.startsWith('Zacian ')) {
    return '苍响 剑之王';
  }
  if (name.startsWith('Zamazenta ')) {
    return '藏玛然特 盾之王';
  }
  if (name.startsWith('Urshifu ')) {
    if (name.includes('Rapid Strike Style')) {
      const rest = name.replace('Urshifu Rapid Strike Style', '').trim();
      return '武道熊师 连击流' + (rest ? ' ' + rest : '');
    }
    const rest = name.replace('Urshifu', '').trim();
    return '武道熊师 一击流' + (rest ? ' ' + rest : '');
  }
  if (name.startsWith('Zarude ')) {
    return '萨戮德 爸爸';
  }
  if (name.startsWith('Calyrex ')) {
    if (name.includes('Ice Rider')) return '蕾冠王 骑雪白马';
    if (name.includes('Shadow Rider')) return '蕾冠王 骑黑马';
    if (name.includes('Cloud Rider')) return '蕾冠王 云骑';
  }
  if (name.startsWith('Tauros Paldean ')) {
    const breed = name.replace('Tauros Paldean ', '');
    const cn: Record<string, string> = { 'Aqua Breed': '水澜', 'Blaze Breed': '火炽', 'Combat Breed': '格斗' };
    return '肯泰罗 帕底亚 ' + (cn[breed] || breed);
  }
  if (name.startsWith('Ursaluna ')) {
    if (name.includes('Bloodmoon')) return '月月熊 赫月';
  }
  if (name.startsWith('Palafin ')) {
    return '海豚侠 英雄';
  }
  if (name.startsWith('Dudunsparce ')) {
    return '大电鼠 三节';
  }
  if (name.startsWith('Maushold ')) {
    return '一家鼠 四口之家';
  }
  if (name.startsWith('Dialga ')) {
    return '帝牙卢卡 起源';
  }
  if (name.startsWith('Palkia ')) {
    return '帕路奇亚 起源';
  }
  if (name.startsWith('Magearna ')) {
    if (name.includes('Original')) return '玛机雅娜 魂心';
  }
  if (name.startsWith('Pikachu ')) {
    const cosMap: Record<string, string> = {
      'Rock Star': '摇滚明星', 'Belle': '偶像', 'Pop Star': '博士',
      'Ph D': '博士', 'Libre': '摔角手', 'Cosplay': '换装',
      'Kanto': '关都', 'Hoenn': '丰缘', 'Sinnoh': '神奥',
      'Unova': '合众', 'Kalos': '卡洛斯', 'Alola': '阿罗拉',
      'Partner Cap': '帽子', 'World': '世界', 'Partner': '搭档',
    };
    const form = name.replace('Pikachu ', '');
    return '皮卡丘 ' + (cosMap[form] || form);
  }
  if (name.startsWith('Eevee Partner')) {
    return '伊布 搭档';
  }
  if (name.startsWith('Meowth Partner')) {
    return '喵喵 搭档';
  }
  if (name.startsWith('Pichu ')) {
    return '皮丘 刺刺耳';
  }
  if (name.startsWith('Unown ')) {
    const letter = name.replace('Unown ', '');
    if (letter === 'Emark') return '未知图腾 !';
    if (letter === 'Qmark') return '未知图腾 ?';
    if (letter === 'Revelation') return '未知图腾 启示';
    return '未知图腾 ' + letter;
  }
  if (name.startsWith('Keldeo ')) {
    return '凯路迪欧 觉悟';
  }
  if (name.startsWith('Meloetta ')) {
    return '美洛耶塔 舞步';
  }
  if (name.startsWith('Greninja Battle Bond')) {
    return '甲贺忍蛙 羁绊变身';
  }
  if (name.startsWith('Chesnaught Battle Bond')) {
    return '布里卡隆 羁绊变身';
  }
  if (name.startsWith('Delphox Battle Bond')) {
    return '妖火红狐 羁绊变身';
  }
  if (name.startsWith('Wooper Paldean')) {
    return '乌波 帕底亚';
  }
  
  return null;
}

export function getPokemonNameCN(enName: string): string {
  if (erPokemonMap[enName]) {
    return erPokemonMap[enName];
  }
  
  const special = translateSpecialForm(enName);
  if (special) return special;
  
  const baseSuffix = getBaseNameAndSuffix(enName);
  if (baseSuffix) {
    const baseCn = pokemonNameMap[baseSuffix.base] || getPokemonNameCN(baseSuffix.base);
    if (baseCn !== baseSuffix.base || pokemonNameMap[baseSuffix.base]) {
      return baseCn + baseSuffix.suffix;
    }
  }
  
  return pokemonNameMap[enName] ?? enName;
}
