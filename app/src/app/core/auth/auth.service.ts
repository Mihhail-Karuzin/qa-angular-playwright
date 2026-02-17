import { Injectable } from '@angular/core';

export type UserRole = 'anon' | 'user' | 'admin';

const TOKEN_KEY = 'auth_token';
const ROLE_KEY = 'auth_role';
const EXPIRES_KEY = 'auth_expires_at';

// TTL = 5 минут (для тестов)
const SESSION_TTL_MS = 5 * 60 * 1000;

@Injectable({ providedIn: 'root' })
export class AuthService {

  // ======================
  // Auth API
  // ======================

  login(username: string, password: string): boolean {
    console.log('[AuthService] login attempt:', username);

    if (username === 'user' && password === 'user123') {
      this.setSession('user');
      console.log('[AuthService] login SUCCESS as user');
      return true;
    }

    if (username === 'admin' && password === 'admin123') {
      this.setSession('admin');
      console.log('[AuthService] login SUCCESS as admin');
      return true;
    }

    console.log('[AuthService] login FAILED');
    return false;
  }

  logout(): void {
    console.log('[AuthService] logout called');

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(EXPIRES_KEY);

    console.log('[AuthService] storage cleared');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiresAtRaw = localStorage.getItem(EXPIRES_KEY);
    const expiresAt = Number(expiresAtRaw);

    console.log('----------------------------');
    console.log('[AuthService] isAuthenticated check');
    console.log('TOKEN:', token);
    console.log('ROLE:', localStorage.getItem(ROLE_KEY));
    console.log('EXPIRES_RAW:', expiresAtRaw);
    console.log('NOW:', Date.now());
    console.log('----------------------------');

    if (!token || !expiresAt) {
      console.log('[AuthService] NOT authenticated (missing token or expires)');
      return false;
    }

    if (Date.now() > expiresAt) {
      console.log('[AuthService] token expired -> forcing logout');
      this.logout();
      return false;
    }

    console.log('[AuthService] AUTHENTICATED');
    return true;
  }

  getRole(): UserRole {
    const role = (localStorage.getItem(ROLE_KEY) as UserRole) || 'anon';
    console.log('[AuthService] getRole:', role);
    return role;
  }

  hasRole(role: UserRole): boolean {
    console.log('[AuthService] hasRole check:', role);

    if (!this.isAuthenticated()) {
      console.log('[AuthService] hasRole -> false (not authenticated)');
      return false;
    }

    const result = this.getRole() === role;
    console.log('[AuthService] hasRole result:', result);

    return result;
  }

  // ======================
  // private helpers
  // ======================

  private setSession(role: UserRole): void {
    const expires = Date.now() + SESSION_TTL_MS;

    localStorage.setItem(TOKEN_KEY, 'demo-token');
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(EXPIRES_KEY, String(expires));

    console.log('[AuthService] session created:', {
      role,
      expires
    });
  }
}






