import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service'; // adjust path as needed

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  isvisible = false;
  orderForm: FormGroup;
  ordersData: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.orderForm = this.fb.group({
      orderID: [''],
      customerID: ['', Validators.required],
      orderDate: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      orderStatus: ['', Validators.required],
      ProductionID: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(0)]],
      totalAmount: [{ value: '', disabled: true }]
    });

    // Auto-calculate totalAmount
    this.orderForm.get('quantity')!.valueChanges.subscribe(() => this.updateTotalAmount());
    this.orderForm.get('unitPrice')!.valueChanges.subscribe(() => this.updateTotalAmount());

    this.loadOrders();
  }

  loadOrders() {
    this.api.getOrders().subscribe({
      next: data => {
        // Map backend fields to frontend fields
        this.ordersData = data.map(order => ({
          orderID: order.OrderID,
          customerID: order.CustomerID,
          orderDate: order.OrderDate,
          paymentStatus: order.PaymentStatus,
          orderStatus: order.OrderStatus,
          ProductionID: order.ProductionID,
          quantity: order.Quantity,
          unitPrice: order.UnitPrice,
          totalAmount: order.TotalAmount
        }));
      },
      error: err => {
        this.ordersData = [];
        alert('Failed to load orders');
      }
    });
  }

  onEdit(order: any): void {
    this.orderForm.patchValue({
      orderID: order.OrderID,
      customerID: order.CustomerID,
      orderDate: order.OrderDate,
      paymentStatus: order.PaymentStatus,
      orderStatus: order.OrderStatus,
      ProductionID: order.ProductionID,
      quantity: order.Quantity,
      unitPrice: order.UnitPrice,
      totalAmount: order.TotalAmount
    });
    this.isvisible = true;
  }

  onDelete(orderID: any): void {
    if (confirm(`Are you sure you want to delete Order ID: ${orderID.orderId}?`)) {
      this.api.deleteOrder(orderID.orderId).subscribe({
        next: () => this.loadOrders(),
        error: () => alert('Failed to delete order')
      });
    }
  }

  onAdd() {
    this.isvisible = true;
    this.orderForm.reset();
  }

  oncancel() {
    this.isvisible = false;
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const formValue = this.orderForm.value;
      const orderPayload = {
        OrderID: formValue.orderID,
        CustomerID: formValue.customerID,
        OrderDate: new Date(formValue.orderDate).toISOString(),
        PaymentStatus: formValue.paymentStatus,
        OrderStatus: formValue.orderStatus,
        ProductionID: formValue.ProductionID,
        Quantity: formValue.quantity,
        UnitPrice: formValue.unitPrice,
        TotalAmount: formValue.quantity * formValue.unitPrice
      };
      if (formValue.orderID) {
  orderPayload.OrderID = formValue.orderID;
}
      this.api.addOrder(orderPayload).subscribe({
        next: () => {
          this.loadOrders();
          this.orderForm.reset();
          this.isvisible = false;
        },
        error: () => alert('Failed to add order')
      });
    }
  }

  // Add this method to your component:
  updateTotalAmount() {
    const quantity = this.orderForm.get('quantity')!.value || 0;
    const unitPrice = this.orderForm.get('unitPrice')!.value || 0;
    const total = quantity * unitPrice;
    this.orderForm.get('totalAmount')!.setValue(total, { emitEvent: false });
  }
}
