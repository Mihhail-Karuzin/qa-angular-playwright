// scripts/performance-gate.js
const fs = require("fs");
const path = require("path");

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`❌ Lighthouse report not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function getPerformanceScore(report, filePath) {
  const score = report?.categories?.performance?.score;
  if (typeof score !== "number") {
    throw new Error(`❌ Cannot read categories.performance.score from: ${filePath}`);
  }
  return score;
}

function toPct(n) {
  return Math.round(n * 100);
}

function parseThreshold(value) {
  const t = Number(value);
  if (!Number.isFinite(t)) throw new Error(`❌ LH_THRESHOLD is not a number: "${value}"`);
  // ожидаем 0..1 (0.85), а не 85
  if (t < 0 || t > 1) throw new Error(`❌ LH_THRESHOLD must be between 0 and 1 (example 0.85). Got: ${t}`);
  return t;
}

function main() {
  const threshold = parseThreshold(process.env.LH_THRESHOLD ?? "0.85");
  const reportsDir = process.env.LH_REPORTS_DIR ?? path.join("artifacts", "lighthouse");

  const targets = [
    { name: "login", file: path.join(reportsDir, "login.json") },
    { name: "dashboard", file: path.join(reportsDir, "dashboard.json") },
  ];

  console.log("===============================================");
  console.log("🚦 Lighthouse Performance Gate");
  console.log(`🎯 Threshold: ${toPct(threshold)} (>= ${threshold})`);
  console.log(`📁 Reports dir: ${reportsDir}`);
  console.log("===============================================");

  let failed = false;

  for (const t of targets) {
    const report = readJson(t.file);
    const score = getPerformanceScore(report, t.file);

    const ok = score >= threshold;
    console.log(`${ok ? "✅" : "❌"} ${t.name}: ${toPct(score)} (need >= ${toPct(threshold)})`);

    if (!ok) failed = true;
  }

  console.log("===============================================");

  if (failed) {
    console.error("❌ Performance Gate FAILED. CI must stop here.");
    process.exit(1);
  }

  console.log("✅ Performance Gate PASSED.");
  process.exit(0);
}

main();