// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './main-layout/header/header.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component';
import { OnlyNumberDirective } from './only-number.directive';
import { ApiService } from './api.service';
import { RouterModule } from '@angular/router';
import { DashboardModule } from './Dashboard/dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetpasswordComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    ContactComponent,
    ResetPasswordComponent,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {}
