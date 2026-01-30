import { Injectable } from '@angular/core';

const AUTH_KEY = 'qa_auth_token';
const ROLE_KEY = 'qa_user_role';

export type UserRole = 'admin' | 'user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(AUTH_KEY, 'fake-token');
      localStorage.setItem(ROLE_KEY, 'admin');
      return true;
    }

    if (username === 'user' && password === 'user123') {
      localStorage.setItem(AUTH_KEY, 'fake-token');
      localStorage.setItem(ROLE_KEY, 'user');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ROLE_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }

  getRole(): UserRole | null {
    return localStorage.getItem(ROLE_KEY) as UserRole | null;
  }

  hasRole(role: UserRole): boolean {
    return this.getRole() === role;
  }
}



