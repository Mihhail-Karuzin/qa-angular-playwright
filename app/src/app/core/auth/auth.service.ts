import { Injectable } from '@angular/core';

const AUTH_KEY = 'qa_auth_token';

/**
 * Demo-only valid token.
 * In real apps this would be a JWT validated by backend.
 */
const VALID_TOKEN = 'fake-token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Demo login logic.
   * In real apps this would be an API call.
   */
  login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'admin123';

    if (isValid) {
      localStorage.setItem(AUTH_KEY, VALID_TOKEN);
    }

    return isValid;
  }

  /**
   * Logout user and clear auth state
   */
  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }

  /**
   * Auth check used by guards and app logic
   *
   * SECURITY NOTE:
   * - Demo-level token validation
   * - Prevents access with invalid / tampered tokens
   * - Makes security E2E tests deterministic
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_KEY);
    return token === VALID_TOKEN;
  }
}


