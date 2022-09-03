import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { AuthInterceptor } from 'src/app/core/interceptor/auth.interceptor';
import { HeaderComponent } from './core/components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PagenotfoundComponent } from './core/components/pagenotfound/pagenotfound.component';
import { UserProfilComponent } from './components/user/user-profil/user-profil.component';
import { CraListComponent } from './components/cra/cra-list/cra-list.component';
import { CraAddComponent } from './components/cra/cra-add/cra-add.component';
import { CraDetailComponent } from './components/cra/cra-detail/cra-detail.component';
import { DialogConfirmationComponent } from './shared/components/dialog-confirmation/dialog-confirmation.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { CraListAdminComponent } from './components/cra/cra-list-admin/cra-list-admin.component';
import { CraDetailAdminComponent } from './components/cra/cra-detail-admin/cra-detail-admin.component';
import { MaterialModule } from './shared/material/material.module';
import { CraService } from './services/cra/cra.service';
import { TokenStorageService } from './services/token/token-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    PagenotfoundComponent,
    UserProfilComponent,
    CraListComponent,
    CraAddComponent,
    CraDetailComponent,
    DialogConfirmationComponent,
    UserListComponent,
    CraListAdminComponent,
    CraDetailAdminComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      {
        path: 'profile',
        component: UserProfilComponent,
        canActivate: [AuthGuard],
      },
      { path: 'cra-add', component: CraAddComponent, canActivate: [AuthGuard] },
      {
        path: 'cra/:id',
        component: CraDetailComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cra-admin',
        component: CraListAdminComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cra-admin/:id',
        component: CraDetailAdminComponent,
        canActivate: [AuthGuard],
      },
      { path: 'cra', component: CraListComponent, canActivate: [AuthGuard] },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
      { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    CraService,
    TokenStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
