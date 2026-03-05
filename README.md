# QA Angular Playwright (Enterprise Demo)

## CI Status

![CI](https://github.com/Mihhail-Karuzin/qa-angular-playwright/actions/workflows/ci-docker-e2e.yml/badge.svg)

![Dockerized](https://img.shields.io/badge/Dockerized-Yes-blue)
![Playwright](https://img.shields.io/badge/Playwright-1.x-green)
![Angular](https://img.shields.io/badge/Angular-17-red)

Enterprise-grade Angular + Playwright E2E framework  
with Dockerized CI orchestration.

---

## System Architecture

```
                +----------------------------------+
                |      GitHub Actions (CI)         |
                |----------------------------------|
                |  docker compose up --build       |
                +-------------------+--------------+
                                    |
                                    v
                +----------------------------------+
                |          Docker Network          |
                |                                  |
                |  +----------------------------+  |
                |  |  app (nginx)               |  |
                |  |  Angular production build  |  |
                |  +----------------------------+  |
                |                                  |
                |  +----------------------------+  |
                |  |  e2e (Playwright)          |  |
                |  |  BASE_URL=http://app:80    |  |
                |  +----------------------------+  |
                +----------------------------------+
```

## Architecture

- Angular 17 (Production build)
- nginx runtime (multi-stage Docker)
- Playwright (TypeScript)
- Page Object Model
- Custom fixtures
- Deterministic Docker Compose execution
- GitHub Actions CI (Docker-based)

---

## Dockerized Execution

Full stack runs inside Docker:

- `app` → Angular production build served via nginx
- `e2e` → Playwright official container
- Healthcheck-gated startup
- Artifacts exported from containers

CI runs:

```bash
docker compose up --abort-on-container-exit

---

## Performance Engineering

This project integrates Lighthouse into CI with enforced thresholds.

- Performance budgets defined
- Branch-based thresholds (main stricter than PR)
- Nginx gzip optimization
- Production-only build testing
- CI-adjusted performance scoring

Performance score improved from **87 → 98**
after enabling Angular production optimization and gzip.

Performance is not observed — it is enforced.

---

## CI/CD Strategy (Hardening)

- Matrix build (Node 20, 22)
- Daily scheduled run
- Concurrency control (cancel in-progress runs)
- Docker-first reproducibility
- Artifacts always uploaded
- Performance gate enforced in CI

CI does not rely on local environments.

Everything runs inside Docker.

---

## Enterprise Design Decisions

Why production build instead of dev server?
→ To simulate real user conditions.

Why Docker-first?
→ Environment consistency and deterministic execution.

Why matrix builds?
→ Node compatibility validation.

Why performance gate in CI?
→ Prevent performance regressions.

Why CI-adjusted thresholds?
→ GitHub runners differ from local machines.

---

## Known Limitations

- Authentication is simulated (no real backend)
- No distributed microservices integration
- Lighthouse scores may slightly vary in CI

---

## How This Maps to Real Enterprise Systems

| Enterprise Pattern | Implemented Here |
|-------------------|------------------|
| Production SPA build | Angular + Nginx |
| Containerized testing | Docker Compose |
| E2E framework | Playwright |
| CI/CD pipeline | GitHub Actions |
| Performance regression guard | Lighthouse gate |
| Deterministic execution | Health-check gated startup |

---

## Interview Talking Points

- How Docker ensures reproducibility
- Why performance must be enforced in CI
- Tradeoffs of CI performance scoring
- Production vs development build testing
- Handling flakiness in CI
- Why deterministic startup matters