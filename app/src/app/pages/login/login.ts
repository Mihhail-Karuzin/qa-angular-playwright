import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  showError = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    const success = this.auth.login(this.username, this.password);

    if (success) {
      this.showError = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.showError = true;
    }
  }
}





