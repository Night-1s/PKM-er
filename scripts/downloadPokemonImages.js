const fs = require('fs');
const path = require('path');
const https = require('https');

const outputDir = path.join(__dirname, '../public/pokemon-images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const pokemonList = [
  { id: 29, name: 'nidoran-f' },
  { id: 32, name: 'nidoran-m' },
  { id: 1, name: 'bulbasaur' },
  { id: 4, name: 'charmander' },
  { id: 7, name: 'squirtle' },
  { id: 25, name: 'pikachu' },
  { id: 150, name: 'mewtwo' },
  { id: 151, name: 'mew' },
];

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function main() {
  console.log('开始下载宝可梦图片...');
  
  for (const pokemon of pokemonList) {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`;
    const filepath = path.join(outputDir, `${pokemon.name}.png`);
    
    try {
      await downloadImage(url, filepath);
      console.log(`✓ ${pokemon.name} (${pokemon.id})`);
    } catch (err) {
      console.log(`✗ ${pokemon.name} (${pokemon.id}): ${err.message}`);
    }
  }
  
  console.log('下载完成！');
}

main();
