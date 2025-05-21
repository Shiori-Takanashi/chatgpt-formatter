// generate-index.cjs
const fs = require("fs");
const path = require("path");

const rulesDir = path.resolve(__dirname, "../rules");
const outputPath = path.join(rulesDir, "index.ts");

const ruleFiles = fs.readdirSync(rulesDir)
    .filter(f => /.*\.rule\.ts$/.test(f))
    .sort();

const lines = ruleFiles.map(filename => {
    const fullPath = path.join(rulesDir, filename);
    const content = fs.readFileSync(fullPath, "utf-8");
    const match = content.match(/export\s+const\s+(\w+)/);
    if (!match) throw new Error(`Export not found in ${filename}`);
    const exportName = match[1];
    const moduleName = filename.replace(/\.ts$/, "");
    return `export { ${exportName} } from "./${moduleName}";`;
});

fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf-8");
console.log(`✔ index.ts generated with ${lines.length} exports.`);
