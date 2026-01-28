import { Injectable } from '@angular/core';

const AUTH_KEY = 'qa_auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Demo login logic.
   * In real apps this would be an API call.
   */
  login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'admin123';

    if (isValid) {
      // Store auth token (demo purpose)
      localStorage.setItem(AUTH_KEY, 'fake-token');
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
   * IMPORTANT:
   * - Works after page reload
   * - Works with Playwright storageState
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }
}

