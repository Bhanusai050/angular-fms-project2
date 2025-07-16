// src/app/Dashboard/dashboard/dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AnimalsComponent } from './animals/animals.component';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedInventoryComponent } from './feed-inventory/feed-inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductionsComponent } from '../production/production.component';
import { VendorComponent } from '../vendor/vendor.component';
import { AnimalBatchesComponent } from './animal-batches/animal-batches.component';
import { AssetsComponent } from './assets/assets.component';
import { FeedPurchasesComponent } from './feed-purchases/feed-purchases.component';
import { FeedConsumptionComponent } from './feed-consumption/feed-consumption.component';
import { LandPurchasesComponent } from './land-purchases/land-purchases.component';
import { WorkersComponent } from './workers/workers.component';
import { SalariesComponent } from './salaries/salaries.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { LookupManagementComponent } from './lookup-management/lookup-management.component';
import { ReportsComponent } from './reports/reports.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { InvestmentComponent } from './investments/investments.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AuthService } from '../../auth.service';
import { RbacGuard } from '../../rbac.guard';

@NgModule({
  declarations: [
    DashboardComponent,
    AnimalsComponent,
    CustomersComponent,
    ExpensesComponent,
    FeedInventoryComponent,
    OrdersComponent,
    ProductionsComponent,
    VendorComponent,
    AnimalBatchesComponent,
    AssetsComponent,
    FeedPurchasesComponent,
    FeedConsumptionComponent,
    LandPurchasesComponent,
    WorkersComponent,
    SalariesComponent,
    CompanyInfoComponent,
    LookupManagementComponent,
    ReportsComponent,
    AdminSettingsComponent,
    InvestmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DashboardRoutingModule
  ],
  providers: [AuthService, RbacGuard],
  exports: [] // Optional: Remove unless used outside this module
})
export class DashboardModule {}
