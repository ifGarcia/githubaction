const fs = require('fs');
const path = require('path');

const envName = process.env.environment;
const version = process.env.version;
const repo = process.env.GITHUB_REPOSITORY.split('/')[1];

const badge = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="40">
  <rect rx="20" ry="20" width="300" height="40" fill="#555"/>
  <rect rx="20" ry="20" x="150" width="150" height="40" fill="#808080"/>
  <text x="75" y="25" fill="#fff" font-family="Verdana" font-size="15" text-anchor="middle">${envName}</text>
  <text x="225" y="25" fill="#fff" font-family="Verdana" font-size="15" text-anchor="middle">${version}</text>
</svg>`;

const fileName = `${repo.toLowerCase().replace(/\s+/g, '_')}/${envName.toLowerCase().replace(/\s+/g, '_')}.svg`;

// Certifique-se de que o diretório existe
const dir = path.dirname(fileName);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(fileName, badge);
