import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderForm!: FormGroup;
  orders: any[] = [];
  paginatedOrders: any[] = [];
  searchTerm: string = '';

  isVisible = false;
  isEditing = false;
  selectedOrderId: number | null = null;
  successMessage: string = '';
  showMessage: boolean = false;

  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];
  totalPages = 1;
  today: string;

  constructor(private fb: FormBuilder, @Inject(ApiService) private api: ApiService) {
    this.today = new Date().toISOString().split('T')[0]; // Initialize today
  }

  ngOnInit(): void {
    this.initForm();
    this.getOrders();
    this.setupAutoTotalCalculation();
  }

  initForm() {
    this.orderForm = this.fb.group({
      id: [0],
      order: ['', Validators.required],
      customer: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      orderDate: ['', Validators.required],
      paymentStatus: ['', Validators.required],
      orderStatus: ['', Validators.required],
      production: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      totalAmount: [{ value: 0, disabled: true }, Validators.required],
    });
  }

  setupAutoTotalCalculation() {
    this.orderForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotal());
    this.orderForm.get('unitPrice')?.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateTotal() {
    const quantity = this.orderForm.get('quantity')?.value || 0;
    const unitPrice = this.orderForm.get('unitPrice')?.value || 0;
    const total = quantity * unitPrice;
    this.orderForm.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  getOrders() {
    this.api.getOrders().subscribe({
      next: (res: any[]) => {
        console.log('✅ Orders fetched:', res);
        this.orders = res || [];
        this.filterOrders();
      },
      error: (err: any) => {
        console.error('❌ Error fetching orders:', err);
        this.orders = [];
        this.filterOrders();
      }
    });
  }

  onSubmit() {
    if (this.orderForm.invalid) return;

    const orderData = this.orderForm.getRawValue();
    if (this.isEditing && this.selectedOrderId !== null) {
      this.api.updateOrder(this.selectedOrderId, orderData).subscribe({
        next: () => {
          this.showSuccessMessage('Order updated successfully');
          this.getOrders();
        },
        error: (err) => console.error('❌ Error updating order:', err)
      });
    } else {
      this.api.addOrder(orderData).subscribe({
        next: () => {
          this.showSuccessMessage('Order added successfully');
          this.getOrders();
        },
        error: (err) => console.error('❌ Error adding order:', err)
      });
    }
  }

  onEdit(order: any) {
    this.orderForm.patchValue(order);
    this.isEditing = true;
    this.selectedOrderId = order.id;
    this.isVisible = true;
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.api.deleteOrder(id).subscribe({
        next: () => {
          this.showSuccessMessage('Order deleted successfully');
          this.getOrders();
        },
        error: (err) => console.error('❌ Error deleting order:', err)
      });
    }
  }

  onAdd() {
    this.isVisible = true;
    this.isEditing = false;
    this.orderForm.reset({ id: 0, totalAmount: 0 });
  }

  onCancel() {
    this.isVisible = false;
    this.orderForm.reset({ id: 0, totalAmount: 0 });
  }

  showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.successMessage = '';
    }, 2000);
  }

  onSearchChange() {
    this.currentPage = 1;
    this.filterOrders();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.filterOrders();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterOrders();
    }
  }

  filterOrders() {
    const searchWords = this.searchTerm.toLowerCase().trim().split(/\s+/);

    const filtered = this.orders.filter(order => {
      const name = order.customer?.toLowerCase() || '';
      const id = order.order?.toString() || '';
      return searchWords.every(word => name.includes(word) || id.includes(word));
    });

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedOrders = filtered.slice(startIndex, startIndex + this.pageSize);
  }
}