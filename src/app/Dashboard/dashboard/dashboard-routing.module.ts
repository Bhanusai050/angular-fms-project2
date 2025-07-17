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
import { InvestmentComponent } from './investments/investments.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'animals', component: AnimalsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'expenses', component: ExpensesComponent },
      { path: 'feed-inventory', component: FeedInventoryComponent,  },
      { path: 'orders', component: OrdersComponent,  },
      { path: 'production', component: ProductionsComponent,  },
      { path: 'vendor', component: VendorComponent,  },
      { path: 'animalbatches', component: AnimalBatchesComponent,  } ,
      { path: 'investments', component: InvestmentComponent, },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}


