const fs = require('fs');
const badge = `
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="20">
  <rect width="100" height="20" fill="#555"/>
  <rect x="37" width="63" height="20" fill="#4c1"/>
  <text x="19.5" y="14" fill="#fff" font-family="Verdana" font-size="11">${{ env.environment }}</text>
  <text x="50" y="14" fill="#fff" font-family="Verdana" font-size="11">${{ env.version }}</text>
</svg>`;
fs.writeFileSync('badge.svg', badge);
