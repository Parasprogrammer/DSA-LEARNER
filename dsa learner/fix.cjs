const fs = require('fs');
const path = require('path');
const dir = 'd:/dsa learner/src/algorithms';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
for (const file of files) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  let changed = false;
  if (content.includes('\\`')) {
    content = content.replace(/\\`/g, '`');
    changed = true;
  }
  if (content.includes('\\${')) {
    content = content.replace(/\\\$\{/g, '${');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(p, content);
    console.log('Fixed', file);
  }
}
