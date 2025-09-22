import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  credentials: LoginCredentials = {
    email: '',
    password: '',
  };

  error = '';

  constructor(private router: Router, private http: HttpClient, private authService: AuthService) {}

  onSubmit() {
    this.http
      .post('https://dummyjson.com/auth/login', {
        username: this.credentials.email,
        password: this.credentials.password,
      })
      .subscribe({
        next: (res: any) => {
          console.log('Login response:', res);
          if (res && res.token) {
            this.authService.setToken(res.token);
            console.log('authToken after login:', localStorage.getItem('authToken'));
            this.router.navigate(['/']);
          } else {
            this.error = 'Login failed: No token received';
            console.error('Login failed: No token received', res);
          }
        },
        error: (err) => {
          this.error = err?.error?.message || 'Invalid email or password';
          console.error('Login error:', err);
        },
      });
  }
}
