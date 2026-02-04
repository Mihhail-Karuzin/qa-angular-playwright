// /**
//  * Lighthouse performance audit runner
//  *
//  * IMPORTANT:
//  * - Angular app MUST already be running on http://localhost:4200
//  * - This script is intentionally NOT coupled to Playwright
//  */

// import lighthouse from 'lighthouse';
// import chromeLauncher from 'chrome-launcher';

// (async () => {
//   // =========================
//   // 1️⃣ Launch Chrome
//   // =========================
//   const chrome = await chromeLauncher.launch({
//     chromeFlags: [
//       '--headless',
//       '--no-sandbox',
//       '--disable-gpu',
//       '--disable-dev-shm-usage',
//     ],
//   });

//   try {
//     // =========================
//     // 2️⃣ Lighthouse options
//     // =========================
//     const options = {
//       port: chrome.port,
//       onlyCategories: ['performance', 'accessibility'],
//     };

//     // =========================
//     // 3️⃣ LOGIN PAGE AUDIT
//     // =========================
//     const loginResult = await lighthouse(
//       'http://localhost:4200/login',
//       options
//     );

//     const loginPerf =
//       loginResult?.lhr?.categories?.performance?.score ?? 0;
//     const loginA11y =
//       loginResult?.lhr?.categories?.accessibility?.score ?? 0;

//     console.log('LOGIN → performance:', loginPerf);
//     console.log('LOGIN → accessibility:', loginA11y);

//     // =========================
//     // 4️⃣ DASHBOARD PAGE AUDIT
//     // =========================
//     const dashboardResult = await lighthouse(
//       'http://localhost:4200/dashboard',
//       options
//     );

//     const dashPerf =
//       dashboardResult?.lhr?.categories?.performance?.score ?? 0;
//     const dashA11y =
//       dashboardResult?.lhr?.categories?.accessibility?.score ?? 0;

//     console.log('DASHBOARD → performance:', dashPerf);
//     console.log('DASHBOARD → accessibility:', dashA11y);

//     // =========================
//     // 5️⃣ Budgets (DEV-REALISTIC)
//     // =========================
//     const PERF_BUDGET = 0.7;
//     const A11Y_BUDGET = 0.9;

//     if (
//       loginPerf < PERF_BUDGET ||
//       dashPerf < PERF_BUDGET ||
//       loginA11y < A11Y_BUDGET ||
//       dashA11y < A11Y_BUDGET
//     ) {
//       console.error('❌ Lighthouse budgets NOT met');
//       process.exitCode = 1;
//     } else {
//       console.log('✅ Lighthouse budgets met');
//       process.exitCode = 0;
//     }
//   } catch (err) {
//     console.error('❌ Lighthouse execution failed');
//     console.error(err);
//     process.exitCode = 1;
//   } finally {
//     // =========================
//     // 6️⃣ Always close Chrome
//     // =========================
//     await chrome.kill();
//   }
// })();


