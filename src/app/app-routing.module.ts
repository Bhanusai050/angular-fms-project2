import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent }, // 👈 Add homepage as separate path
  // { path: '', redirectTo: 'login', pathMatch: 'full' }, // 👈 Set login as default route
  { path: 'login', component: LoginComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'forgot', component: ForgetpasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'header', component: HeaderComponent },
  
  {
    path: 'Dashboard',
    loadChildren: () =>
      import('./Dashboard/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },

  // Fallback route
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
