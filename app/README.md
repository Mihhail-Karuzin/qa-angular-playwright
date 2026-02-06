![CI](https://github.com/Mihhail-Karuzin/qa-angular-playwright/actions/workflows/main.yml/badge.svg)

# 🧪 QA Angular Playwright — Security-Focused E2E Testing

Enterprise-grade end-to-end testing project for an Angular SPA, focused on **authentication, authorization, and session lifecycle validation** using Playwright.

This repository demonstrates how a QA Automation Engineer / SDET validates **client-side security behavior** in a predictable, CI-safe, and well-documented manner.

---

## 🎯 Project Goals

- Validate authentication and authorization flows in an Angular SPA
- Ensure protected routes are not accessible without proper session state
- Demonstrate session lifecycle testing (expiration, forced logout)
- Provide deterministic, CI-friendly E2E tests
- Document security-related limitations transparently

---

## 🔐 Security Test Coverage

| Scenario                          | Test Type | Expected Behavior                               | Status |
|----------------------------------|----------:|--------------------------------------------------|:------:|
| Unauthenticated dashboard access | E2E       | Redirect to `/login`                             | ✅     |
| Authenticated dashboard access   | E2E       | Dashboard rendered                               | ✅     |
| Login with invalid credentials   | E2E       | Error message displayed                          | ✅     |
| Access after logout              | E2E       | Redirect to `/login`                             | ✅     |
| Session expiration               | E2E       | Redirect to `/login` with `returnUrl`            | ✅     |
| Forced logout (token missing)    | E2E       | Access denied on protected routes                | ✅     |
| Role-based access control (RBAC) | E2E       | Admin-only routes protected                     | ✅     |

---

## 🔒 Security & Access Control (Phase 2)

This phase focuses on **client-side security enforcement** and access control for the Angular application.

The goal is not to replace backend security, but to ensure that:
- frontend guards behave correctly
- access control rules are enforced consistently
- edge cases are covered by automated tests

---

## 🔑 Authentication & Route Guards

The application uses a **client-side session model** stored in `localStorage`.

Protected routes are guarded using Angular `CanActivate` guards:

### AuthGuard
- Blocks unauthenticated access
- Redirects users to `/login`
- Preserves the originally requested route via `returnUrl`

### RoleGuard
- Enforces role-based access control
- Redirects unauthorized users away from restricted routes

#### Protected routes

/dashboard → requires authentication
/admin → requires admin role


---

## 🧑‍💼 Role-Based Access Control (RBAC)

### RBAC Test Coverage

Role-based access control is validated using Playwright E2E tests to ensure
that protected routes cannot be accessed by unauthorized roles.

Covered scenarios:
- Unauthenticated users are redirected to `/login`
- Standard users are denied access to `/admin`
- Admin users are granted access to `/admin`
- Invalid or unknown roles are treated as unauthenticated

RBAC enforcement is validated at route-guard level and covered by regression tests.


### Supported roles
- `anon`  — unauthenticated user
- `user`  — authenticated standard user
- `admin` — privileged user

### RBAC behavior

| Scenario            | Expected Behavior              |
|---------------------|--------------------------------|
| anon → /dashboard   | Redirected to `/login`         |
| anon → /admin       | Redirected to `/login`         |
| user → /admin       | Redirected to `/dashboard`     |
| admin → /admin      | Access granted                 |

RBAC behavior is validated through **Playwright E2E tests** and reflects real-world frontend authorization patterns.

---

## ♿ Accessibility (A11Y)

Basic accessibility checks are validated using Playwright E2E tests to ensure
the application remains usable for keyboard and assistive technology users.

Covered areas:
- Keyboard-only navigation for the login form
- Accessible labels for form inputs
- Proper ARIA roles for interactive elements
- Accessible error messages for authentication failures

Accessibility tests are treated as regression checks to prevent accidental
accessibility regressions during UI changes.

## ⚡ Performance Testing

Performance validation is implemented using **Lighthouse CLI** to provide
deterministic, CI-friendly performance and accessibility insights.

### Scope
- Login page (`/login`)
- Dashboard page (`/dashboard`)

### Tooling
- Lighthouse (CLI)
- Chromium (headless)
- WSL / CI–friendly configuration

### Execution

```bash
npm run performance:login
npm run performance:dashboard
Artifacts
performance/reports/login.html

performance/reports/dashboard.html

Notes
Lighthouse is executed via CLI for deterministic results

Explicit CHROME_PATH is used for WSL / container compatibility

Performance testing is intentionally separated from E2E flows

HTML reports are generated for manual review

Limitations
Audits are executed against Angular dev server

Results may differ from production builds
---

## ⏳ Session Model & Lifecycle

Session state is stored in `localStorage`:

auth_token = demo token
auth_role = user | admin
auth_expires_at = timestamp (TTL-based)


### Key properties
- Session expiration is enforced via timestamp comparison
- Expired sessions are rejected at **route-guard level**
- Logout clears all session-related keys
- Session model is intentionally simple and deterministic to ensure test stability

---

## 🚪 Logout Behavior

Logout is treated as a **security-critical flow** and explicitly validated:

- Clears all authentication-related data
- Redirects user to `/login`
- Prevents access to protected routes after logout

Regression tests ensure logout behavior cannot be bypassed via navigation or state manipulation.

---

## ⚠️ Documented Security Limitations

This project intentionally documents its limitations to reflect real-world engineering tradeoffs.

### Token Validation
- Token integrity is **not validated on the client side**
- Token validation is considered a **backend responsibility**
- Client-side token verification would introduce false security guarantees

### Forced Logout
- Forced logout on `auth_token` removal during an **active session** is **not supported by design**
- Authentication state is validated at **route-guard level only**
- Security tests validate access denial **on navigation**, not during runtime state mutation

### UI Stability (Security-Related Scenarios)
- UI stability is validated for security-related redirects (no white screen, no uncaught errors)
- Login page remains interactive after forced logout and corrupted auth state

These limitations are **explicitly documented and covered by tests**, not hidden.

---

## 🧪 Testing Strategy

Security behavior is verified using **Playwright E2E tests** with isolated authentication scopes:

- Separate auth states (`anon`, `user`, `admin`)
- `storageState`-based session injection
- Clear separation between:
  - authentication tests
  - authorization tests
  - session lifecycle tests
  - security regression tests

All security-related tests:
- run in CI
- are deterministic
- must pass for the pipeline to succeed

---

## 🚀 CI Integration

- GitHub Actions executes all E2E tests
- Failures block the pipeline
- Ensures security regressions are detected early

---

## 📌 Summary

This project demonstrates how a QA Automation Engineer / SDET:

- tests client-side security realistically
- adapts test strategy to application design
- avoids false assumptions
- documents limitations transparently
- builds recruiter-ready, enterprise-grade test artifacts
clear


