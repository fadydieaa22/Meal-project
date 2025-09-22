import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  logout() {
    localStorage.removeItem('authToken');
  }
}
