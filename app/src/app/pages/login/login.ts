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
  username: string = '';
  password: string = '';
  showError: boolean = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  onSubmit(): void {
    const ok = this.auth.login(this.username, this.password);

    if (ok) {
      this.showError = false;
      this.router.navigate(['/dashboard']);
    } else {
      this.showError = true;
    }
  }
}



