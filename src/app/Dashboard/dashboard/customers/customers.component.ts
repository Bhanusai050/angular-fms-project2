import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  customers: any[] = [];
  paginatedCustomerData: any[] = [];

  searchTerm: string = '';
  isVisible = false;
  isEditing = false;
  selectedCustomerId: number | null = null;
  successMessage: string = '';
  showMessage: boolean = false;
  editIndex: number = -1;


  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];
  totalPages = 1;

  today: string = new Date().toISOString().split('T')[0];


  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.getCustomers();
  }

  initForm() {
   this.customerForm = this.fb.group({
  CustomerID: [0],
  FullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100), Validators.pattern(/^[A-Za-z ]+$/)]],
  phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
  Email: ['', [Validators.required, Validators.email]],
  Address: ['', [Validators.required]],
  CreatedAt: ['', [Validators.required]]
});
  }

  getCustomers() {
    this.api.getCustomers().subscribe({
      next: (res: any[]) => {
        this.customers = res || [];
        this.filterCustomers();
      },
      error: (err: any) => {
        console.error('Error fetching customers:', err);
        this.customers = [];
        this.filterCustomers();
      }
    });
  }

 onSubmit() {
  if (this.customerForm.invalid) {
    this.customerForm.markAllAsTouched();
    return;
  }

  const payload = this.customerForm.value;

  if (this.isEditing && this.editIndex > -1 && payload.customerId) {
    // Update customer
    this.api.updateCustomer(payload.customerId, payload).subscribe({
      next: () => {
        this.showSuccessMessage('Customer updated successfully');
        this.isVisible = false;
        this.isEditing = false;
        this.editIndex = -1;
        this.getCustomers();
      },
      error: () => {
        alert('Failed to update customer');
      }
    });
  } else {
    // Add customer
    this.api.addCustomer(payload).subscribe({
      next: () => {
        this.showSuccessMessage('Customer added successfully');
        this.isVisible = false;
        this.getCustomers();
        this.customerForm.reset();
      },
      error: () => {
        alert('Failed to add customer');
      }
    });
  }
}

  onEdit(customer: any) {
    this.customerForm.patchValue(customer);
    this.isEditing = true;
    this.selectedCustomerId = customer.id;
    this.isVisible = true;
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.api.deleteCustomer(id).subscribe(() => {
        this.showSuccessMessage('Customer deleted successfully');
        this.getCustomers();
      });
    }
  }

  onAdd() {
    this.customerForm.reset();
    this.isVisible = true;
    this.isEditing = false;
    this.selectedCustomerId = null;
  }

  onCancel() {
    this.isVisible = false;
    this.customerForm.reset();
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
    this.filterCustomers();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.filterCustomers();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterCustomers();
    }
  }

  resetForm() {
  this.customerForm.reset();
  this.isEditing = false;
  this.selectedCustomerId = null;
  this.isVisible = false;
}


  filterCustomers() {
    const searchWords = this.searchTerm.toLowerCase().trim().split(/\s+/);

    const filtered = this.customers.filter(customer => {
      const name = customer.customerName?.toLowerCase() || '';
      const id = customer.id?.toString() || '';
      return searchWords.every(word => name.includes(word) || id.includes(word));
    });

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedCustomerData = filtered.slice(startIndex, startIndex + this.pageSize);
  }
}
