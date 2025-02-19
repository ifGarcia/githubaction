const fs = require('fs');

const envName = process.env.environment;
const version = process.env.version;
const repo = process.env.repo;

const badge = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
  <rect width="100" height="20" fill="#555"/>
  <rect x="37" width="63" height="20" fill="#4c1"/>
  <text x="19.5" y="14" fill="#fff" font-family="Verdana" font-size="11">${envName}</text>
  <text x="50" y="14" fill="#fff" font-family="Verdana" font-size="11">${version}</text>
</svg>`;

const fileName = `${repo.toLowerCase().replace(/\s+/g, '_')}/${envName.toLowerCase().replace(/\s+/g, '_')}.svg`;
fs.writeFileSync(fileName, badge);
