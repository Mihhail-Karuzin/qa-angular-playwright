import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService, UserRole } from './auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Not authenticated → redirect to login
  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login']);
  }

  const roles = (route.data?.['roles'] ?? []) as UserRole[];

  if (roles.length === 0) {
    return true;
  }

  const hasAccess = roles.some(role => auth.hasRole(role));

  if (hasAccess) {
    return true;
  }

  // Forbidden → redirect to dashboard
  return router.createUrlTree(['/dashboard']);
};
