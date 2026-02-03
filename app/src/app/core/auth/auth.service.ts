import { Injectable } from '@angular/core';

export type UserRole = 'anon' | 'user' | 'admin';

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';
const EXPIRES_KEY = 'auth_expires_at';

// TTL = 5 секунд (ДЛЯ ТЕСТОВ!)
const SESSION_TTL_MS = 5 * 60 * 1000; // 5 минут


@Injectable({ providedIn: 'root' })
export class AuthService {

  // ======================
  // Auth API
  // ======================

  login(username: string, password: string): boolean {
    // demo credentials
    if (username === 'user' && password === 'user123') {
      this.setSession('user');
      return true;
    }

    if (username === 'admin' && password === 'admin123') {
      this.setSession('admin');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EXPIRES_KEY);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAt = Number(localStorage.getItem(EXPIRES_KEY));

    if (!token || !expiresAt) {
      return false;
    }

    // ⏰ HARD EXPIRATION
    if (Date.now() > expiresAt) {
      this.logout();
      return false;
    }

    return true;
  }

  getRole(): UserRole {
    return (localStorage.getItem(ROLE_KEY) as UserRole) || 'anon';
  }

  /**
   * Используется RoleGuard'ом
   */
  hasRole(role: UserRole): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    return this.getRole() === role;
  }

  // ======================
  // private helpers
  // ======================

  private setSession(role: UserRole): void {
    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(
      EXPIRES_KEY,
      String(Date.now() + SESSION_TTL_MS)
    );
  }
}





