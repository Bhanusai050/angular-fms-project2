import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnimalsComponent } from './animals/animals.component';
import { CustomersComponent } from './customers/customers.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { FeedInventoryComponent } from './feed-inventory/feed-inventory.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductionsComponent } from '../production/production.component';
import { VendorComponent } from '../vendor/vendor.component';

import { AnimalBatchesComponent } from './animal-batches/animal-batches.component';
import { RbacGuard } from '../../rbac.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'animals', component: AnimalsComponent, canActivate: [RbacGuard], data: { permission: 'ViewAnimals' } },
      { path: 'customers', component: CustomersComponent, canActivate: [RbacGuard], data: { permission: 'ViewCustomers' } },
      { path: 'expenses', component: ExpensesComponent, canActivate: [RbacGuard], data: { permission: 'ViewExpenses' } },
      { path: 'feed-inventory', component: FeedInventoryComponent, canActivate: [RbacGuard], data: { permission: 'ViewFeedInventory' } },
      { path: 'orders', component: OrdersComponent, canActivate: [RbacGuard], data: { permission: 'ViewOrders' } },
      { path: 'production', component: ProductionsComponent, canActivate: [RbacGuard], data: { permission: 'ViewProduction' } },
      { path: 'vendor', component: VendorComponent, canActivate: [RbacGuard], data: { permission: 'ViewVendor' } },
      { path: 'animalbatches', component: AnimalBatchesComponent, canActivate: [RbacGuard], data: { permission: 'ViewAnimalBatches' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}


