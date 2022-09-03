import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { TokenStorageService } from '../../services/token/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public tokenStorage: TokenStorageService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.tokenStorage.isLoggedIn
      .pipe(
        take(1),                            
        map((isLoggedIn: boolean) => { 
          if (!isLoggedIn){
            this.router.navigate(['login']); 
            return false;
          }
          return true;
        }));
  }
}
