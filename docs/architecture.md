# 🏗 System Architecture — QA Angular Playwright

This document explains the architectural design of the project
from an engineering perspective.

---

# 1️⃣ High-Level Architecture

Developer / CI Trigger
│
▼
GitHub Actions
│
▼
Docker Compose Orchestration
│
┌──────────────────────────────────────────┐
│ Docker Network │
│ │
│ ┌──────────────────────────────┐ │
│ │ app container │ │
│ │ Angular production build │ │
│ │ Served by Nginx │ │
│ └──────────────────────────────┘ │
│ │
│ ┌──────────────────────────────┐ │
│ │ e2e container │ │
│ │ Playwright (TypeScript) │ │
│ │ BASE_URL=http://app:80
 │ │
│ └──────────────────────────────┘ │
│ │
│ ┌──────────────────────────────┐ │
│ │ lighthouse container │ │
│ │ Performance audit │ │
│ └──────────────────────────────┘ │
│ │
└──────────────────────────────────────────┘
│
▼
Artifacts (reports, results)


---

# 2️⃣ Execution Flow in CI

1. GitHub Actions starts workflow
2. Docker Compose builds containers
3. Angular app starts (Nginx)
4. Health check ensures readiness
5. Playwright E2E tests execute
6. Lighthouse performance audit runs
7. Performance gate script validates threshold
8. Artifacts are uploaded
9. Containers are destroyed

Everything runs inside Docker.
No dependency on host environment.

---

# 3️⃣ Container Responsibilities

## 🟦 app container

- Multi-stage Angular production build
- Static files served via Nginx
- Gzip enabled
- Health check enabled

## 🟩 e2e container

- Playwright test execution
- Page Object Model
- Fixtures & auth state handling
- Reports exported to mounted volumes

## 🟨 lighthouse container

- Runs performance audit
- Generates JSON + HTML reports
- Used in CI pipeline
- Enforces performance thresholds

---

# 4️⃣ CI Strategy

The CI pipeline is designed for:

- Deterministic execution
- Environment reproducibility
- Performance regression prevention
- Node compatibility validation (matrix builds)
- Concurrency control
- Scheduled nightly execution

---

# 5️⃣ Why Production Build Testing Matters

Testing against a dev server hides:

- Real bundle size
- Compression behavior
- Performance bottlenecks
- Optimization differences

This project explicitly tests:

Angular production build + Nginx runtime

This mirrors real deployment environments.

---

# 6️⃣ Performance Engineering Strategy

- Lighthouse integrated in CI
- Branch-based threshold control
- CI-adjusted performance expectations
- Performance budget enforcement
- Gzip optimization applied

Performance is enforced, not observed.

---

# 7️⃣ Enterprise Design Philosophy

This project demonstrates:

- Separation of concerns (UI / Tests / Performance)
- Container isolation
- CI-first mindset
- Reproducible environments
- Engineering reasoning, not just automation

---

# 8️⃣ What Makes This Project Enterprise-Grade

✔ Docker-first execution  
✔ CI-enforced quality gates  
✔ Performance regression control  
✔ Matrix builds  
✔ Health-check gated startup  
✔ Deterministic artifact handling  
✔ Documented architectural decisions  

---

End of architecture documentation.