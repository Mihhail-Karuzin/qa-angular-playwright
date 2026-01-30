import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

/**
 * Role Guard (RBAC)
 * Protects routes based on user roles
 */
export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Not authenticated → redirect to login
  if (!authService.isAuthenticated()) {
    return router.parseUrl('/login');
  }

  const roles = (route.data?.['roles'] ?? []) as UserRole[];

  // No roles specified → allow access
  if (roles.length === 0) {
    return true;
  }

  // Check if user has at least one required role
  const hasAccess = roles.some(role => authService.hasRole(role));

  if (hasAccess) {
    return true;
  }

  // Forbidden → redirect to dashboard
  return router.parseUrl('/dashboard');
};


