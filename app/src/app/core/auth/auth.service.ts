import { Injectable } from '@angular/core';

const AUTH_KEY = 'qa_auth_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): boolean {
    const isValid = username === 'admin' && password === 'admin123';
    if (isValid) {
      // store a simple token (demo)
      localStorage.setItem(AUTH_KEY, 'fake-token');
    }
    return isValid;
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }
}
