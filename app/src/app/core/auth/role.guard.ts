import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: any): boolean {
    const expectedRole: UserRole = route.data?.role;

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!this.auth.hasRole(expectedRole)) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    return true;
  }
}
