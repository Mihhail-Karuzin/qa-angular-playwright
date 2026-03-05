# Interview Guide — QA Angular Playwright

This document prepares you to confidently explain the project
as a Senior QA Automation Engineer / SDET.

---

# How to Introduce the Project (30-second version)

"This project demonstrates a production-style Angular SPA tested using Playwright,
executed fully inside Docker, and validated in CI with enforced performance gates via Lighthouse.

It focuses on deterministic execution, CI hardening, performance regression prevention,
and enterprise-grade test architecture."

---

# Key Engineering Decisions (And Why)

## Why Docker-first?

To ensure:
- Environment reproducibility
- Deterministic execution
- No 'works on my machine' issues
- CI parity with local runs

---

## Why test production build instead of dev server?

Because:
- Dev builds hide bundle size issues
- No real compression
- Different optimization behavior
- Real users never use dev builds

This project explicitly tests Angular production build served by Nginx.

---

## Why enforce performance in CI?

Because performance regression is a real production risk.

Instead of observing Lighthouse scores,
this project enforces them with branch-based thresholds.

---

## Why branch-based thresholds?

CI runners are weaker than local machines.

Strict threshold on main.
Slightly relaxed threshold for pull requests.

This reflects real-world CI variability.

---

## Why matrix builds?

To validate compatibility across Node versions
and prevent environment-specific failures.

---

# How This Reflects Real Enterprise Systems

| Enterprise Concern | Addressed Here |
|--------------------|----------------|
| Environment drift | Docker isolation |
| Flaky pipelines | Health-check gating |
| Performance regression | Lighthouse gate |
| Node compatibility | Matrix build |
| Artifact traceability | CI uploads reports |
| Deterministic startup | Docker health checks |

---

# Typical Interview Questions (And How to Answer)

## How do you prevent flakiness?

- Deterministic startup (health check)
- Dockerized execution
- Avoiding external dependencies
- CI isolation

---

## What would you improve next?

- Add backend stub or API integration
- Add accessibility testing (axe-core)
- Add session lifecycle tests
- Add distributed test execution

---

## How do you handle CI performance variability?

- Measure baseline in CI
- Adjust threshold based on runner environment
- Keep stricter threshold for main
- Document limitations

---

## Why not use Playwright against localhost?

Because:
- It bypasses production build
- It ignores real serving layer (Nginx)
- It hides deployment differences

This project intentionally mirrors deployment architecture.

---

# What Makes This Project Senior-Level?

✔ Production-aware testing  
✔ CI-enforced performance gates  
✔ Docker-first reproducibility  
✔ Matrix builds  
✔ Architectural documentation  
✔ Clear engineering reasoning  

---

# 60-Second Deep Technical Explanation

"This framework separates application runtime, E2E testing,
and performance auditing into isolated containers.
GitHub Actions orchestrates Docker Compose,
ensuring deterministic startup via health checks.

Performance is enforced via Lighthouse with branch-based thresholds,
preventing regressions before merging to main.

This setup simulates enterprise CI/CD environments
where reproducibility and quality gates are mandatory."

---

# Final Advice for Interview

Speak calmly.
Explain reasoning.
Highlight tradeoffs.
Mention CI variability.
Emphasize production-build testing.

Think like an engineer, not a test executor.