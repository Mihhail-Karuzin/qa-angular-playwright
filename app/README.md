![CI](https://github.com/Mihhail-Karuzin/qa-angular-playwright/actions/workflows/main.yml/badge.svg)

## 🔐 Security Test Coverage

| Scenario                          | Test Type | Expected Behavior                          | Status |
|----------------------------------|----------:|---------------------------------------------|:------:|
| Unauthenticated dashboard access | E2E       | Redirect to `/login`                        | ✅     |
| Invalid auth token               | E2E       | Forced logout + redirect                   | ✅     |
| Access after logout              | E2E       | Redirect to `/login`                        | ✅     |
| Authenticated dashboard access   | E2E       | Dashboard rendered                         | ✅     |
| Login with invalid credentials   | E2E       | Error message shown                        | ✅     |

**Notes**
- Token validation is demo-level and deterministic.
- In real production systems token validation is handled by backend.
- Security E2E tests ensure frontend guards behave correctly.

