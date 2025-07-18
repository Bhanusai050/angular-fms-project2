import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface CustomerApiResponse {
  customer: number | string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: string | Date;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {
  customerForm!: FormGroup;
  isvisible = false;
  customerData: any[] = [];
  today: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customer: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      fullName: ['', [Validators.required, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,14}$/)]],  // E.164 international format
      email: ['', [
  Validators.required,
  Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],

      address: ['', Validators.required],
      createdAt: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.customerForm.valid) {
      this.customerData.push(this.customerForm.value);
      this.customerForm.reset();
      this.isvisible = false;
      alert('Customer added successfully!');
    }
  }

  onAdd(): void {
    this.isvisible = true;
    this.customerForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(customer: any): void {
    this.customerForm.patchValue(customer);
    this.isvisible = true;
  }

  onDelete(customer: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      this.customerData = this.customerData.filter(c => c !== customer);
      alert('Deleted successfully!');
    }
  }
}