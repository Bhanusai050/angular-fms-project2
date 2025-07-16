import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Layout/login/login.component';
import { ForgetpasswordComponent } from './Layout/forgetpassword/forgetpassword.component';
import { SignUpComponent } from './Layout/sign-up/sign-up.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './main-layout/header/header.component';
import { Component,output,EventEmitter } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './homepage/contact/contact.component';
import { ResetPasswordComponent } from './Layout/reset-password/reset-password.component';
import { AnimalsComponent } from './Dashboard/dashboard/animals/animals.component';
import { VendorComponent } from './Dashboard/vendor/vendor.component';
import { FeedInventoryComponent } from './Dashboard/dashboard/feed-inventory/feed-inventory.component';
import { OrdersComponent } from './Dashboard/dashboard/orders/orders.component';
import { ProductionComponent } from './Dashboard/production/production.component';
import { CustomersComponent } from './Dashboard/dashboard/customers/customers.component';
import { ExpensesComponent } from './Dashboard/dashboard/expenses/expenses.component';
import { AnimalBatchesComponent } from './Dashboard/dashboard/animal-batches/animal-batches.component';



const routes: Routes = [
  {path:'', component:HomepageComponent},
  { path: 'forgot', component:ForgetpasswordComponent },
  {path: 'SignUp', component:SignUpComponent},
  { path: 'Dashboard', loadChildren: () => import('./Dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
  {path: 'header', component:HeaderComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},
  {path:'contact', component:ContactComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'animals', pathMatch: 'full' }, // default dashboard page
      { path: 'animals', component: AnimalsComponent },
      { path: 'vendor', component: VendorComponent },
      { path: 'feed-inventory', component: FeedInventoryComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'animalbatches', component: AnimalBatchesComponent },
      // { path: 'settings', component: settingsComponent },
      { path: 'production', component: ProductionComponent },
      
    ]
  },

  // fallback route if no match
  { path: '**', redirectTo: 'login' }
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
