import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { TokenStorageService } from '../../services/token/token-storage.service';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenStorage: TokenStorageService,private router:Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.tokenStorage.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(req).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 && !err.error.message["incorrectPassword"] && err.error.message !== 'No account linked to this email.') {
          this.tokenStorage.logout();
          this.tokenStorage.loggedIn.next(false);
          this.router.navigate(['/'])
        }
      }
      return throwError(() => err);
    })) as any;
  }
}
