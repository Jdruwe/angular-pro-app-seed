import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  styleUrls: ['login.component.scss'],
  template: `
    <div>
      <app-auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink="/auth/register">Not registered?</a>
        <button type="submit">
          Login
        </button>
        <div
          class="error"
          *ngIf="error">
          {{ error }}
        </div>
      </app-auth-form>
    </div>
  `
})
export class LoginComponent {

  error: string;

  constructor(
    private authService: AuthService
  ) {
  }

  async loginUser(event: FormGroup) {
    const {email, password} = event.value;
    try {
      await this.authService.loginUser(email, password);
    } catch (err) {
      this.error = err.message;
    }
  }
}
