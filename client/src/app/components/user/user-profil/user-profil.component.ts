import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../../services/token/token-storage.service';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.css']
})
export class UserProfilComponent implements OnInit {

  constructor(private tokenStorage:TokenStorageService) { }
  userInfo:any;
  ngOnInit(): void {
    this.userInfo = this.tokenStorage.getUserInfoFromStorage();
  }

}
