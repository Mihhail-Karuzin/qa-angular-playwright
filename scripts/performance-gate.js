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

function getPerformanceScore(report) {
  const score = report?.categories?.performance?.score;
  if (typeof score !== "number") {
    throw new Error("❌ Cannot read categories.performance.score from report");
  }
  return score;
}

function formatScore(score) {
  return Math.round(score * 100);
}

function main() {
  const threshold = Number(process.env.LH_THRESHOLD ?? "0.80"); // 0.80 = 80
  const reportsDir = process.env.LH_REPORTS_DIR ?? path.join("artifacts", "lighthouse");

  const targets = [
    { name: "login", file: path.join(reportsDir, "login.json") },
    { name: "dashboard", file: path.join(reportsDir, "dashboard.json") },
  ];

  console.log("===============================================");
  console.log("🚦 Lighthouse Performance Gate");
  console.log(`✅ Threshold: ${Math.round(threshold * 100)} (score ${threshold})`);
  console.log(`📁 Reports: ${reportsDir}`);
  console.log("===============================================");

  let failed = false;

  for (const t of targets) {
    const report = readJson(t.file);
    const score = getPerformanceScore(report);
    const scorePct = formatScore(score);
    const thresholdPct = formatScore(threshold);

    const ok = score >= threshold;

    console.log(`${ok ? "✅" : "❌"} ${t.name}: ${scorePct} (need >= ${thresholdPct})`);

    if (!ok) failed = true;
  }

  console.log("===============================================");

  if (failed) {
    console.error("❌ Performance Gate FAILED. CI must stop here.");
    process.exit(1);
  } else {
    console.log("✅ Performance Gate PASSED.");
    process.exit(0);
  }
}

main();