import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/';
import { map } from 'rxjs/operators/';
import { Router } from '@angular/router';
import { UserDetails } from './UserDetails';
import { TokenPayload } from './TokenPayload';
interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: string
  serverBaseURL = process.env.BACKEND_URI;
  
  constructor(private httpClient: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('user-token');
    }
    return this.token;
  }

  public logout(): void {
    window.localStorage.removeItem('user-token');
    this.token = '';
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): UserDetails {

    const token = this.getToken();

    let payload;

    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post' | 'get', type: 'login' | 'register',
    user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.httpClient.post(this.serverBaseURL + type, user);
    } else {
      base = this.httpClient.get(this.serverBaseURL + type,
        { headers: 
          { 
            Authorization: `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
          } 
        });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

}
