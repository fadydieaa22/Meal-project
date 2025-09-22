import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, HttpClientModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'meal-app';
  isLoggedIn = false;

  constructor(private router: Router) {
    // Check auth state on init
    this.checkAuthState();

    // Listen for auth changes
    window.addEventListener('auth-changed', ((event: CustomEvent) => {
      this.isLoggedIn = event.detail.isLoggedIn;
    }) as EventListener);
  }

  ngOnInit() {
    // Check auth state when component initializes
    this.checkAuthState();
  }

  private checkAuthState() {
    const user = localStorage.getItem('currentUser');
    this.isLoggedIn = !!user;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.isLoggedIn = false;
    window.dispatchEvent(
      new CustomEvent('auth-changed', {
        detail: { isLoggedIn: false, user: null },
      })
    );
    this.router.navigate(['/']);
  }
}
