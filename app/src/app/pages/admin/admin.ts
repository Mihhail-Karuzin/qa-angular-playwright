import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  template: `
    <h1 data-testid="admin-title">Admin Panel</h1>
    <p>Restricted access</p>
  `,
})
export class AdminComponent {}

