import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { RoleGuard } from './core/auth/role.guard';

export const routes: Routes = [
  /**
   * 🔐 Login page
   * Public route
   */
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent),
  },

  /**
   * 📊 Dashboard
   * Requires authentication
   */
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.DashboardComponent),
  },

  /**
   * 🛡️ Admin page
   * Requires authentication + ADMIN role
   */
  {
    path: 'admin',
    canActivate: [authGuard, RoleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('./pages/admin/admin').then(m => m.AdminComponent),
  },

  /**
   * Default redirect
   */
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  /**
   * Fallback route
   */
  {
    path: '**',
    redirectTo: 'login',
  },
];


