# QA Angular Playwright (Enterprise Demo)

## 🚦 CI Status

![CI](https://github.com/Mihhail-Karuzin/qa-angular-playwright/actions/workflows/ci-docker-e2e.yml/badge.svg)

![Dockerized](https://img.shields.io/badge/Dockerized-Yes-blue)
![Playwright](https://img.shields.io/badge/Playwright-1.x-green)
![Angular](https://img.shields.io/badge/Angular-17-red)

Enterprise-grade Angular + Playwright E2E framework  
with Dockerized CI orchestration.

---

## 🧱 System Architecture

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

## 🏗 Architecture

- Angular 17 (Production build)
- nginx runtime (multi-stage Docker)
- Playwright (TypeScript)
- Page Object Model
- Custom fixtures
- Deterministic Docker Compose execution
- GitHub Actions CI (Docker-based)

---

## 🐳 Dockerized Execution

Full stack runs inside Docker:

- `app` → Angular production build served via nginx
- `e2e` → Playwright official container
- Healthcheck-gated startup
- Artifacts exported from containers

CI runs:

```bash
docker compose up --abort-on-container-exit