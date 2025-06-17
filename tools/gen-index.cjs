// generate-index.cjs
const fs = require("fs");
const path = require("path");

const rulesDir = path.resolve(__dirname, "../rules");
const outputPath = path.join(rulesDir, "index.ts");

const categories = ["setup", "head", "quote"];
const excludeDir = path.join(rulesDir, "_exclude");
const lines = [];

categories.forEach(category => {
    const categoryDir = path.join(rulesDir, category);
    if (fs.existsSync(categoryDir)) {
        const ruleFiles = fs.readdirSync(categoryDir)
            .filter(f => /.*\.rule\.ts$/.test(f))
            .sort();

        ruleFiles.forEach(filename => {
            const fullPath = path.join(categoryDir, filename);
            const content = fs.readFileSync(fullPath, "utf-8");
            const match = content.match(/export\s+const\s+(\w+)/);
            if (!match) throw new Error(`Export not found in ${filename}`);
            const exportName = match[1];
            const moduleName = `./${category}/${filename.replace(/\.ts$/, "")}`;
            lines.push(`export { ${exportName} } from "${moduleName}";`);
        });
    }
});

// Exclude _exclude directory
if (fs.existsSync(excludeDir)) {
    console.log(`Ignoring files in _exclude directory.`);
}

fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf-8");
console.log(`✔ index.ts generated with ${lines.length} exports.`);
