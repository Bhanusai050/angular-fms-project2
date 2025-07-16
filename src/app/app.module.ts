import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './main-layout/header/header.component';
import { FooterComponent } from './main-layout/footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component'; // ✅ Import this
import { RouterModule } from '@angular/router';
import { OnlyNumberDirective } from './only-number.directive';
import{ApiService} from './api.service';
import { FeedInventoryComponent } from './Dashboard/dashboard/feed-inventory/feed-inventory.component';
import { CustomersComponent } from './Dashboard/dashboard/customers/customers.component';
import { VendorComponent } from './Dashboard/vendor/vendor.component';
import { OrdersComponent } from './Dashboard/dashboard/orders/orders.component';
// TODO: Update the path below to the correct location of ProductionComponent
// If ProductionComponent exists, uncomment and update the import path below:
// import { ProductionComponent } from './Dashboard/dashboard/production/production.component';
import { ExpensesComponent } from './Dashboard/dashboard/expenses/expenses.component';









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
    OnlyNumberDirective,
   
    ExpensesComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
