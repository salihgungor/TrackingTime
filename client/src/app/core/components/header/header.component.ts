import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { TokenStorageService } from '../../../services/token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  isUser$!: Observable<boolean>;
  isAdmin$!: Observable<boolean>;
  
  constructor(private authService:AuthService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.tokenStorage.isLoggedIn;
    this.isAdmin$ = this.tokenStorage.isAdmin;
    this.isUser$ = this.tokenStorage.isUser;
  }

  logout() {
    this.authService.logout()
  }

}
