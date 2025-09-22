import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  user: User = {
    username: '',
    email: '',
    password: '',
  };

  error = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.http
      .post('https://dummyjson.com/users/add', {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
      })
      .subscribe({
        next: (res: any) => {
          localStorage.setItem('currentUser', JSON.stringify(res));
          // Set a dummy auth token so user is considered logged in
          localStorage.setItem('authToken', res.token || 'registered');
          window.dispatchEvent(
            new CustomEvent('auth-changed', {
              detail: { isLoggedIn: true, user: res },
            })
          );
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.error?.message || 'Registration failed';
        },
      });
  }
}
