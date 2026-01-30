import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  submitting = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    if (this.submitting) return;
    this.submitting = true;

    const success = this.auth.login(this.username, this.password);

    if (success) {
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';

      this.showError = false;
      this.router.navigateByUrl(returnUrl);
    } else {
      this.showError = true;
      this.submitting = false;
    }
  }
}






