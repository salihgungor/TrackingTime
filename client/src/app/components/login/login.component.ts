import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateEmailDomain } from 'src/app/core/validators/email.validator';
import { AuthService } from '../../auth/auth.service';
import { TokenStorageService } from '../../services/token/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  errorMessage = '';
  disable = false;

  form: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router:Router,private tokenStorage:TokenStorageService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, ValidateEmailDomain]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if(this.tokenStorage.isLoggedIn){
      this.router.navigate([''])
    }
  }

  displayError(formControl: AbstractControl) {
    let msg;
    if (formControl.errors?.['required']) {
      msg = 'Email is required';
    } else if (
      formControl.errors?.['email'] ||
      formControl.errors?.['invalidEmail']
    ) {
      msg = 'Email must be on teampify.com domain';
    }

    return msg;
  }

  login() {
    this.disable = true;
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe({
        next: (data) => {
          if(data.access_token){
            this.tokenStorage.saveLogin(data.access_token);
            this.tokenStorage.saveUser(data);
            this.tokenStorage.loggedIn.next(true);
            this.tokenStorage.admin_role.next(this.tokenStorage.getRoles()?.includes('admin'))
            this.tokenStorage.user_role.next(this.tokenStorage.getRoles()?.includes('user'))
            this.router.navigate(['/'])
          }
        },
        error: (e) => {
          this.errorMessage = e.error?.message?.incorrectPassword ? "Le mot de passe est incorrecte.":e.error?.message?.message;
        }
      });
      this.disable =false;
    }
    this.disable =false;
  }
}
