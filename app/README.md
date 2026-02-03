![CI](https://github.com/Mihhail-Karuzin/qa-angular-playwright/actions/workflows/main.yml/badge.svg)

## 🔐 Security Test Coverage

| Scenario                          | Test Type | Expected Behavior                          | Status |
|----------------------------------|----------:|---------------------------------------------|:------:|
| Unauthenticated dashboard access | E2E       | Redirect to `/login`                        | ✅     |
| Invalid auth token               | E2E       | Forced logout + redirect                   | ✅     |
| Access after logout              | E2E       | Redirect to `/login`                        | ✅     |
| Authenticated dashboard access   | E2E       | Dashboard rendered                         | ✅     |
| Login with invalid credentials   | E2E       | Error message shown                        | 
✅     |
| Role-based access control (RBAC) | E2E | Admin-only routes protected |

**Notes**
- Token validation is demo-level and deterministic.
- In real production systems token validation is handled by backend.
- Security E2E tests ensure frontend guards behave correctly.

- Unauthenticated access → redirected to `/login`
- Access after logout → redirected to `/login`
- RBAC (role-based access control) enforced on protected routes
- Invalid token handling is **demo-level**
  - Token validation is assumed to be backend responsibility
  - Frontend reacts to backend `401/403` responses in real systems



Security & Access Control (Phase 2)
Scope

This phase focuses on client-side security validation and access control enforcement for the Angular application, ensuring predictable and testable authentication behavior.

Covered areas include:

Authentication guards

Role-based access control (RBAC)

Logout behavior

Unauthorized access handling

Security-related limitations documentation

Authentication & Guards

The application uses a client-side session model based on localStorage.

Protected routes are guarded using Angular CanActivate guards:

AuthGuard

Blocks unauthenticated access

Redirects users to /login

Preserves the originally requested route via returnUrl

RoleGuard

Enforces role-based access (user, admin)

Redirects unauthorized roles away from restricted routes

/dashboard  → requires authentication
/admin      → requires admin role

Role-Based Access Control (RBAC)

Supported roles:

anon — unauthenticated

user — authenticated standard user

admin — privileged user

RBAC behavior is validated through both manual verification and automated Playwright tests.

Scenario	Expected Behavior
anon → /dashboard	Redirected to /login
anon → /admin	Redirected to /login
user → /admin	Redirected to /dashboard
admin → /admin	Access granted
Session Model

Session state is stored in localStorage:

auth_token       = demo-token
auth_role        = user | admin
auth_expires_at  = timestamp (TTL-based)


Key properties:

Hard expiration enforced via timestamp comparison

Expired sessions automatically invalidate authentication state

Logout clears all session-related keys

This model is intentionally simple and deterministic to ensure test stability.

Logout Behavior

Logout is treated as a security-critical flow and validated explicitly:

Clears all session storage

Redirects user to /login

Prevents access to protected routes after logout

Regression tests ensure logout behavior cannot be bypassed via navigation.

Invalid Token Handling (Documented Limitation)

The application does not validate token integrity on the client side.

Reasoning:

Token validation is considered a backend responsibility

Client-side token parsing or verification would introduce false security guarantees

This limitation is explicitly documented and covered by tests

Invalid or tampered tokens are treated as an out-of-scope scenario
for client-side enforcement.

Testing Strategy

Security behavior is verified using Playwright E2E tests with isolated auth scopes:

Separate auth states (anon, user, admin)

storageState-based session injection

Clear separation between:

authentication tests

authorization tests

security regression tests

All security-related tests run in CI and are required to pass.


