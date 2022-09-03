import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public loggedIn = new BehaviorSubject<boolean>(this.getToken() !== null);
  public user_role = new BehaviorSubject<boolean>(this.getRoles()?.includes('user'));
  public admin_role = new BehaviorSubject<boolean>(this.getRoles()?.includes('admin'));

  constructor() { }

  saveLogin(token: string): void {
    localStorage.setItem('access_token', token);
  }

  saveUser(data: any) {
    localStorage.setItem('user-info', JSON.stringify(data));
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRoles(): any {
    let userInfo = localStorage.getItem('user-info');
    if (userInfo) return JSON.parse(userInfo)["roles"];
    return null;
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isUser(){
    return this.user_role.asObservable();
  }

  get isAdmin(){
    return this.admin_role.asObservable();
  }

  logout():void{
    localStorage.removeItem('user-info');
    localStorage.removeItem('access_token');
  }

  getUserInfoFromStorage() {
    let userInfo = localStorage.getItem('user-info');
    if (userInfo) return JSON.parse(userInfo);
    return null
  }

}
