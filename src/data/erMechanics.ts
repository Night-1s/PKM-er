export interface StatusEffect {
  name: string;
  nameEn?: string;
  description: string[];
  notes?: string[];
}

export interface WeatherEffect {
  name: string;
  nameEn?: string;
  description: string[];
  duration?: string;
  notes?: string[];
  associatedAbilities?: { name: string; effect: string }[];
  associatedMoves?: { name: string; power: string; type: string; category: string; effect: string }[];
  associatedItems?: { name: string; effect: string }[];
}

export interface AbilityChange {
  category: string;
  description: string[];
}

export interface ItemChange {
  name: string;
  oldEffect: string;
  newEffect: string;
}

export interface AngelWrathMove {
  nameEn: string;
  nameCn: string;
  effect: string;
}

export interface StarterGroup {
  region: string;
  starters: string[];
}

export const STATUS_EFFECTS: StatusEffect[] = [
  {
    name: "流血",
    nameEn: "Bleed",
    description: [
      "每回合损失最大 HP 的 1/16",
      "造成伤害时不计算能力上升（类似对方纯朴特性）",
      "剩饭、草场等回复效果失效",
      "岩石系和幽灵系免疫流血",
    ],
    notes: [
      "使用回复类招式才能解除，但该回复招式本回合不回血",
      "必须是真正的回复招式（如生蛋）才能解除，超级吸取、归天之翼等不能解除",
      "睡觉也可以解除流血",
    ],
  },
  {
    name: "冻伤",
    nameEn: "Frostbite",
    description: [
      "ER 中删除了冰冻状态，改为冻伤状态",
      "冻伤状态下特殊招式的伤害减半",
      "回合结束时损失最大 HP 的 1/16",
    ],
    notes: ["与烧伤对应（烧伤减半物理伤害）"],
  },
  {
    name: "恐惧",
    nameEn: "Fear",
    description: ["恐惧状态下两回合不能换走", "受到的伤害增加 50%"],
    notes: [],
  },
  {
    name: "混乱",
    nameEn: "Confusion",
    description: [
      "ER 里重做了混乱：不再随机打自己，正常使用招式",
      "使用招式后受到造成伤害 1/3 的反伤",
    ],
    notes: ["2.65 版本又改回原版随机打自己的机制"],
  },
  {
    name: "着迷",
    nameEn: "Infatuation",
    description: ["着迷状态下招式威力减半"],
    notes: ["原版是 50% 概率不能动"],
  },
];

export const WEATHER_EFFECTS: WeatherEffect[] = [
  {
    name: "雾天",
    nameEn: "Fog",
    description: [
      "超能系和幽灵系以外的精灵每回合失去 1 级强化，直至归零",
      "降了能力的不会升回 0",
      "幽灵系精灵受到伤害减少 20%",
      "天气类回复招式回复量减半（月光、晨光、光合作用）",
      "招式复生祈祷、收获会失效",
      "雾天下所有精灵使用诅咒都会是幽灵系的效果",
      "气象球变为幽灵系且威力翻倍",
    ],
    duration: "8 回合，携带烟雾球（雾天岩石）为 12 回合",
    associatedAbilities: [
      { name: "低能见度", effect: "入场时激活雾天，持续 8-12 回合" },
      { name: "画皮", effect: "保护一次，在雾天中恢复保护" },
      { name: "灵质", effect: "雾天中最高攻击能力提升 1.5 倍" },
      { name: "惊喜！", effect: "雾天中对先手使用者造成惊吓" },
      { name: "大灵", effect: "雾天入场时最高能力 +1" },
      { name: "幽灵冲刺", effect: "雾天中速度提升 1.5 倍" },
      { name: "浅坟", effect: "雾天中濒死时以 25% HP 复活一次" },
      { name: "安息", effect: "雾天中每回合恢复 1/8 最大 HP" },
      { name: "烟雾战术", effect: "雾天中闪避率提升 1.25 倍" },
    ],
    associatedItems: [{ name: "烟雾球", effect: "雾天持续时间从 8 回合增加到 12 回合" }],
  },
  {
    name: "冰雹天",
    nameEn: "Hail",
    description: [
      "ER 中删除了雪天，改成了老版的冰雹天",
      "每回合砸 1/16 的血量",
      "冰雹天对冰系的物防加成和原版 9 代雪天一样",
    ],
    notes: [],
  },
  {
    name: "妖精场地",
    nameEn: "Fairy Terrain",
    description: ["较之原版，对妖精类招式有 1.3 倍加成"],
    notes: [],
  },
];

export const ABILITY_CHANGES: AbilityChange[] = [
  {
    category: "天气类特性",
    description: [
      "天气类持续时间都改为 8 回合",
      "带上对应岩石为 12 回合",
      "天气类加速特性一律从原版 2 倍改为 1.5 倍",
    ],
  },
  {
    category: "猛类特性",
    description: [
      "所有「猛*」类特性都给了普通状态下 1.2 倍的伤害提升",
      "例如：草属性招式 1.2 倍，HP 1/3 以下 1.5 倍",
      "额外有一些猛猛类特性：幽灵属性招式 1.3 倍，HP 1/3 以下 1.8 倍",
    ],
  },
  {
    category: "皮肤类特性",
    description: ["皮肤类特性一律调整为 1.1 倍", "额外新加了一些高级皮肤特性（地之歌、猛鬼之声等）为 1.2 倍"],
  },
  {
    category: "多头特性",
    description: ["两个头的是 1+0.25 伤害加成", "三个头的是 1+0.2+0.15 伤害加成"],
  },
];

export const ITEM_CHANGES: ItemChange[] = [
  { name: "电气球", oldEffect: "皮卡丘携带时特攻和速度×2", newEffect: "皮卡丘全家包括各种雷丘都能使用" },
  { name: "贝壳之铃", oldEffect: "造成伤害的 1/8 回复 HP", newEffect: "造成伤害的 1/4 回复 HP" },
  { name: "烟雾球", oldEffect: "不会被野生宝可梦发现", newEffect: "改为雾天岩石，开雾天从 8 回合变为 12 回合" },
];

export const ANGEL_WRATH_MOVES: AngelWrathMove[] = [
  { nameEn: "Tackle", nameCn: "撞击", effect: "100 威力，必中，为对手施加定身法和再来一次效果" },
  { nameEn: "String Shot", nameCn: "吐丝", effect: "使对手速度 -2，在对手侧设置所有入场陷阱（Hazard）" },
  { nameEn: "Poison Sting", nameCn: "毒针", effect: "120 威力，必中，必定中剧毒，对钢系效果拔群" },
  { nameEn: "Harden", nameCn: "变硬", effect: "全能力 +1" },
  { nameEn: "Iron Defense", nameCn: "铁壁", effect: "物防 +2，使自身进入强化版王者盾牌状态（被击时攻击方全能力 -1）" },
  { nameEn: "Electroweb", nameCn: "电网", effect: "155 威力，必中，使对手速度 -12，困住对手，对地面系效果拔群" },
  { nameEn: "Bug Bite", nameCn: "虫咬", effect: "140 威力，必中，等额回复造成的伤害，吃掉对手树果，如果不能吃则拍落对手物品" },
];

export const MOVE_CATEGORY_EXTRA = [
  { id: 0, name: "PHYSICAL", nameCn: "物理" },
  { id: 1, name: "SPECIAL", nameCn: "特殊" },
  { id: 2, name: "STATUS", nameCn: "变化" },
  { id: 3, name: "USE_HIGHEST_OFFENSE", nameCn: "使用最高攻击" },
  { id: 4, name: "HITS_DEF", nameCn: "对方物防结算" },
  { id: 5, name: "USE_HIGHEST_DAMAGE", nameCn: "造成最高伤害" },
  { id: 6, name: "HITS_SPDEF", nameCn: "对方特防结算" },
];

export const STARTER_GROUPS: StarterGroup[] = [
  { region: "关都", starters: ["妙蛙种子", "小火龙", "杰尼龟"] },
  { region: "城都", starters: ["菊草叶", "火球鼠", "小锯鳄"] },
  { region: "丰缘", starters: ["木守宫", "火稚鸡", "水跃鱼"] },
  { region: "神奥", starters: ["草苗龟", "小火焰猴", "波加曼"] },
  { region: "合众", starters: ["藤藤蛇", "暖暖猪", "水水獭"] },
  { region: "卡洛斯", starters: ["哈力栗", "火狐狸", "呱呱泡蛙"] },
  { region: "阿罗拉", starters: ["木木枭", "火斑喵", "球球海狮"] },
  { region: "伽勒尔", starters: ["敲音猴", "炎兔儿", "泪眼蜥"] },
  { region: "帕底亚", starters: ["新叶喵", "呆火鳄", "润水鸭"] },
  { region: "虫系", starters: ["索侦虫", "大颚蚁", "百足蜈蚣"] },
  { region: "恶系", starters: ["捣蛋小妖", "蛇纹熊-伽勒尔", "驹刀小兵"] },
  { region: "龙系", starters: ["宝贝龙", "凉脊龙", "心鳞宝"] },
  { region: "电系", starters: ["布拨", "小猫怪", "小拳石-阿罗拉"] },
  { region: "妖精系", starters: ["波克比", "拉鲁拉丝", "小锻匠"] },
  { region: "格斗系", starters: ["腕力", "搬运小匠", "猴怪"] },
  { region: "飞行系", starters: ["毽子草", "超音蝠", "咕咕"] },
  { region: "幽灵系", starters: ["鬼斯", "烛光灵", "小木灵"] },
  { region: "地面系", starters: ["独角犀牛", "圆陆鲨", "黑眼鳄"] },
  { region: "冰系", starters: ["迷唇娃", "海豹球", "小山猪"] },
  { region: "一般系", starters: ["多边兽", "宝宝丁", "咕妞妞"] },
  { region: "毒系", starters: ["尼多兰", "圆丝蛛", "走路草"] },
  { region: "超能系", starters: ["魔尼尼", "迷布莉姆", "铁哑铃"] },
  { region: "岩石系", starters: ["小炭仔", "幼基拉斯", "石丸子"] },
  { region: "钢系", starters: ["齿轮儿", "小磁怪", "可可多拉"] },
];

export const RESOURCES = [
  { name: "作者 Wiki", url: "https://wiki.elite-redux.com/index.php?title=Main_Page" },
  { name: "作者 Discord", url: "https://discord.gg/Du7Vw84Cae" },
  { name: "作者 YouTube", url: "https://www.youtube.com/@ProjectEliteRedux" },
  { name: "游戏下载页", url: "https://elite-redux.com/" },
  { name: "作者图鉴", url: "https://forwardfeed.github.io/ER-nextdex/static/" },
  { name: "ER Pokemon Showdown", url: "https://elitereduxshowdown.com/" },
];
