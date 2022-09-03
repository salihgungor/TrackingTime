import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token/token-storage.service';
import { API_URL } from '../core/constants/url.constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenStorage: TokenStorageService,
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'auth/login', {
      email,
      password,
    });
  } 

  logout() {
    if (
      localStorage.removeItem('access_token') == null &&
      localStorage.removeItem('user-info') == null
    ) {
      this.tokenStorage.loggedIn.next(false);
      this.tokenStorage.admin_role.next(false);
      this.tokenStorage.user_role.next(false);
      this.router.navigate(['/login']);
    }
  }

  getUser(id: any): Observable<any> {
    return this.http.get(API_URL + 'users/' + id);
  }
}
