#!/usr/bin/env node
const fs = require("fs");
const [f1, f2] = process.argv.slice(2);
if (!f1 || !f2 || f1 === "-h" || f1 === "--help") {
  console.log("Usage: json-diff <file1.json> <file2.json>");
  process.exit(f1 ? 0 : 1);
}
try {
  const o1 = JSON.parse(fs.readFileSync(f1, "utf8"));
  const o2 = JSON.parse(fs.readFileSync(f2, "utf8"));
  const keys = new Set([...Object.keys(o1), ...Object.keys(o2)]);
  console.log(`\x1b[36mComparing ${f1} vs ${f2}:\x1b[0m\n`);
  keys.forEach(k => {
    if (!(k in o2)) console.log(`\x1b[31m- ${k}: ${JSON.stringify(o1[k])}\x1b[0m`);
    else if (!(k in o1)) console.log(`\x1b[32m+ ${k}: ${JSON.stringify(o2[k])}\x1b[0m`);
    else if (JSON.stringify(o1[k]) !== JSON.stringify(o2[k])) {
      console.log(`\x1b[33m~ ${k}: ${JSON.stringify(o1[k])} -> ${JSON.stringify(o2[k])}\x1b[0m`);
    }
  });
} catch (e) {
  console.error("Error: " + e.message);
  process.exit(1);
}
