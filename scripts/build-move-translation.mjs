import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const GAME_DATA_PATH = join(ROOT, 'public', 'er-gamedata.json');
const MOVES_TS_PATH = join(ROOT, 'src', 'data', 'moves.ts');
const OUT_PATH = join(ROOT, 'public', 'er-move-translation.json');

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/move';
const BATCH_SIZE = 20;
const BATCH_DELAY_MS = 200;
const FETCH_RETRIES = 3;

function parseMovesChinese(text) {
  const names = [];
  const re = /name:\s*`([^`]+)`/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    names.push(m[1]);
  }
  return names;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function slugifyMoveName(name) {
  // PokeAPI slugs are lower-case and hyphen-separated.
  // e.g. "Baby-Doll Eyes" -> "baby-doll-eyes", "Will-O-Wisp" -> "will-o-wisp"
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function fetchMove(slug) {
  const url = `${POKEAPI_BASE}/${slug}`;
  for (let attempt = 0; attempt < FETCH_RETRIES; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === FETCH_RETRIES - 1) throw err;
      await sleep(500 * (attempt + 1));
    }
  }
}

function pickChinese(enName, zhHans, zhHant, movesSet) {
  const candidates = [zhHans, zhHant].filter(Boolean);

  // 1. Exact match against the local Chinese move list
  for (const cand of candidates) {
    if (movesSet.has(cand)) return cand;
  }

  // 2. NFKC-normalized match (handles full-width V, etc.)
  for (const cand of candidates) {
    const norm = cand.normalize('NFKC');
    for (const localName of movesSet) {
      if (localName.normalize('NFKC') === norm) return localName;
    }
  }

  // 3. Fallback to any available Chinese name (simplified preferred)
  return zhHans || zhHant || enName;
}

async function run() {
  const [gameText, movesText] = await Promise.all([
    readFile(GAME_DATA_PATH, 'utf8'),
    readFile(MOVES_TS_PATH, 'utf8'),
  ]);

  const gameData = JSON.parse(gameText);
  const moves = gameData.moves || [];
  const chineseNames = parseMovesChinese(movesText);
  const movesSet = new Set(chineseNames);

  const uniqueNames = [...new Set(moves.map((m) => m.name).filter((n) => n && n !== '-'))].sort();
  console.log(`Found ${moves.length} game moves and ${chineseNames.length} local Chinese names.`);
  console.log(`Querying PokeAPI for ${uniqueNames.length} unique move names...`);

  const nameToChinese = new Map();

  for (let i = 0; i < uniqueNames.length; i += BATCH_SIZE) {
    const batch = uniqueNames.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(
      batch.map(async (enName) => {
        try {
          const slug = slugifyMoveName(enName);
          const data = await fetchMove(slug);
          return { enName, data };
        } catch (err) {
          console.warn(`Failed to fetch move "${enName}": ${err.message}`);
          return { enName, data: null };
        }
      })
    );

    for (const { enName, data } of results) {
      if (!data) continue;
      const zhHans = data.names.find((n) => n.language.name === 'zh-hans')?.name || '';
      const zhHant = data.names.find((n) => n.language.name === 'zh-hant')?.name || '';
      nameToChinese.set(enName, { zhHans, zhHant });
    }

    if (i + BATCH_SIZE < uniqueNames.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  const translation = {};
  let translated = 0;
  let fallback = 0;

  for (const move of moves) {
    const { name: enName } = move;
    if (!enName || enName === '-') {
      translation[enName] = enName;
      continue;
    }

    let zh;
    if (nameToChinese.has(enName)) {
      const { zhHans, zhHant } = nameToChinese.get(enName);
      zh = pickChinese(enName, zhHans, zhHant, movesSet);
      if (zh && zh !== enName) {
        translated++;
      } else {
        zh = enName;
        fallback++;
      }
    } else {
      zh = enName;
      fallback++;
    }

    translation[enName] = zh;
  }

  const sorted = Object.fromEntries(
    Object.entries(translation).sort((a, b) => a[0].localeCompare(b[0]))
  );

  await writeFile(OUT_PATH, JSON.stringify(sorted, null, 2), 'utf8');

  console.log(`\nSaved ${Object.keys(sorted).length} entries to ${OUT_PATH}`);
  console.log(`Translated to Chinese: ${translated}`);
  console.log(`Fallback to English (custom / unmatched): ${fallback}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
