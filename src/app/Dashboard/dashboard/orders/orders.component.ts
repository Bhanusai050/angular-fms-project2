import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  orderForm!: FormGroup;
  orderData: any[] = [];
  isvisible = false;
  today: string = new Date().toISOString().split('T')[0];
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.orderForm = this.fb.group({
      order: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      customer: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      orderDate: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      production: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unitPrice: ['', [Validators.required, Validators.min(1)]],
      totalAmount: [{ value: '', disabled: true }]
    });
 
    this.orderForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
    this.orderForm.get('unitPrice')?.valueChanges.subscribe(() => this.calculateTotal());
  }
 
  calculateTotal() {
    const qty = this.orderForm.get('quantity')?.value || 0;
    const price = this.orderForm.get('unitPrice')?.value || 0;
    const total = qty * price;
    this.orderForm.patchValue({ totalAmount: total });
  }
 
  onSubmit(): void {
    if (this.orderForm.valid) {
      this.orderData.push(this.orderForm.getRawValue());
      this.orderForm.reset();
      alert('Submitted successfully!');
      this.isvisible = false;
    }
  }
 
  onAdd(): void {
    this.orderForm.reset();
    this.isvisible = true;
  }
 
  oncancel(): void {
    this.isvisible = false;
  }
 
  onEdit(order: any): void {
    this.orderForm.patchValue(order);
    this.isvisible = true;
  }
 
  onDelete(order: any): void {
    const confirmDelete = confirm('⚠️ Are you sure you want to delete this order?');
    if (confirmDelete) {
      this.orderData = this.orderData.filter(o => o !== order);
      alert('Deleted successfully!');
    }
  }
}
