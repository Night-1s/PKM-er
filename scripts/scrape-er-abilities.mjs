import { writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const POKEDREAM_URL = 'https://pokedream.cn/507.html';
const CACHE_PATH = resolve(ROOT, 'tmp_pokedream_507.html');
const GAMEDATA_PATH = resolve(ROOT, 'public', 'er-gamedata.json');
const ABILITIES_TS_PATH = resolve(ROOT, 'src', 'data', 'abilities.ts');
const OUTPUT_PATH = resolve(ROOT, 'public', 'er-ability-translation.json');

const FETCH_HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  'Accept-Encoding': 'gzip, deflate, br',
  Connection: 'keep-alive',
};

async function fetchHtml() {
  try {
    console.log(`Fetching ${POKEDREAM_URL} ...`);
    const res = await fetch(POKEDREAM_URL, { headers: FETCH_HEADERS });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const html = await res.text();
    console.log(`Fetched ${html.length} bytes.`);
    return html;
  } catch (err) {
    console.warn(`Failed to fetch website: ${err.message}`);
    if (existsSync(CACHE_PATH)) {
      console.warn(`Using cached file: ${CACHE_PATH}`);
      return readFile(CACHE_PATH, 'utf8');
    }
    throw err;
  }
}

function extractChineseAbilities(html) {
  // The page lists abilities in <div> tags as: "中文名 ： 描述"
  const matches = [...html.matchAll(/<div>([^<]*?)\s*：\s*([^<]+)<\/div>/g)];
  const items = matches.map((m) => ({
    name: m[1].trim(),
    desc: m[2].trim(),
  }));

  if (items.length === 0) {
    throw new Error('Could not parse any ability entries from pokedream page.');
  }

  console.log(`Parsed ${items.length} ability entries from pokedream page.`);
  return items;
}

async function loadGameData() {
  const raw = await readFile(GAMEDATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data.abilities)) {
    throw new Error('er-gamedata.json does not contain abilities array.');
  }
  return data.abilities;
}

async function loadAbilitiesTsNames() {
  const raw = await readFile(ABILITIES_TS_PATH, 'utf8');
  const names = [...raw.matchAll(/name:\s*[`"']([^`"']+)[`"']/g)].map((m) =>
    m[1].trim()
  );
  return names;
}

function buildMapping(englishAbilities, chineseAbilities) {
  // The pokedream page lists abilities by their in-game ID starting at 1.
  // er-gamedata.json may not be sorted by id, so use the id field directly.
  const mapping = {};
  let mapped = 0;
  let skippedEmpty = 0;
  let missing = 0;

  for (const eng of englishAbilities) {
    if (!eng || !eng.name || eng.id === 0) {
      skippedEmpty++;
      continue;
    }
    const chi = chineseAbilities[eng.id - 1];
    if (!chi) {
      console.warn(
        `Missing Chinese entry for English ability id=${eng.id}: ${eng.name}`
      );
      missing++;
      continue;
    }

    mapping[eng.name] = chi.name;
    mapped++;
  }

  console.log(
    `Mapped ${mapped} English abilities to Chinese names (skipped ${skippedEmpty} empty slots, missing ${missing}).`
  );
  return mapping;
}

function validateWithAbilitiesTs(mapping, tsNames) {
  const mappedChinese = new Set(Object.values(mapping));
  const missingFromMapping = tsNames.filter((n) => !mappedChinese.has(n));
  const extraInMapping = [...mappedChinese].filter((n) => !tsNames.includes(n));

  if (missingFromMapping.length > 0) {
    console.warn(
      `${missingFromMapping.length} names from abilities.ts are missing in the scraped mapping:`
    );
    missingFromMapping.slice(0, 20).forEach((n) => console.warn(`  - ${n}`));
  }
  if (extraInMapping.length > 0) {
    console.warn(
      `${extraInMapping.length} scraped names are not in abilities.ts (likely ER-specific duplicates or additions).`
    );
    extraInMapping.slice(0, 20).forEach((n) => console.warn(`  - ${n}`));
  }
  if (missingFromMapping.length === 0 && extraInMapping.length === 0) {
    console.log('Scraped mapping matches abilities.ts perfectly.');
  }
}

async function main() {
  const [html, englishAbilities, tsNames] = await Promise.all([
    fetchHtml(),
    loadGameData(),
    loadAbilitiesTsNames(),
  ]);

  const chineseAbilities = extractChineseAbilities(html);

  console.log(`English abilities: ${englishAbilities.length}`);
  console.log(`Chinese abilities from website: ${chineseAbilities.length}`);
  console.log(`Chinese abilities from abilities.ts: ${tsNames.length}`);

  if (chineseAbilities.length !== englishAbilities.length - 1) {
    console.warn(
      `Count mismatch: expected ${englishAbilities.length - 1} Chinese entries, got ${chineseAbilities.length}.`
    );
  }

  const mapping = buildMapping(englishAbilities, chineseAbilities);
  validateWithAbilitiesTs(mapping, tsNames);

  await writeFile(OUTPUT_PATH, JSON.stringify(mapping, null, 2), 'utf8');
  console.log(`\nWrote translation mapping to ${OUTPUT_PATH}`);
  console.log(`Total entries: ${Object.keys(mapping).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
