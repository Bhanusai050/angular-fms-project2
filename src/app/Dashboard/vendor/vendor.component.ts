import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service'; // Adjust path if needed

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {
  vendorForm!: FormGroup;
  VendorData: any[] = [];

  isVisible = false;
  isEditing = false;
  editingIndex: number | null = null;
  editingId: number | null = null; // Track VendorID for editing

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.vendorForm = this.fb.group({
      vendorName: ['', Validators.required],
      category: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['']
    });
    this.loadVendors();
  }

  loadVendors(): void {
    this.api.getVendors().subscribe({
      next: data => this.VendorData = data,
      error: err => {
        this.VendorData = [];
        console.error('Failed to load vendors:', err.message);
      }
    });
  }

  onAdd(): void {
    this.vendorForm.reset();
    this.isVisible = true;
    this.isEditing = false;
    this.editingIndex = null;
    this.editingId = null;
  }

  onCancel(): void {
    this.isVisible = false;
    this.isEditing = false;
    this.editingIndex = null;
    this.editingId = null;
  }

  onSubmit(): void {
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    // Map form fields to backend property names
    const formData = this.vendorForm.getRawValue();
    const payload = {
      VendorName: formData.vendorName,
      Category: formData.category,
      Email: formData.email,
      PhoneNumber: formData.phone,   // <-- map to PhoneNumber
      Location: formData.address     // <-- map to Location
    };

    if (this.isEditing && this.editingId !== null) {
      this.api.updateVendor(this.editingId, payload).subscribe({
        next: () => {
          this.loadVendors();
          this.onCancel();
        },
        error: err => alert(err.message)
      });
    } else {
      this.api.addVendor(payload).subscribe({
        next: () => {
          this.loadVendors();
          this.onCancel();
        },
        error: err => alert(err.message)
      });
    }
  }

  onEdit(data: any, index: number): void {
    this.vendorForm.patchValue(data);
    this.isVisible = true;
    this.isEditing = true;
    this.editingIndex = index;
    this.editingId = data.vendorID || data.VendorID; // Use correct property name from your backend
  }

  onDelete(index: number): void {
    const vendorId = this.VendorData[index].vendorID || this.VendorData[index].VendorID;
    if (vendorId) {
      this.api.deleteVendor(vendorId).subscribe({
        next: () => this.loadVendors(),
        error: err => alert(err.message)
      });
    }
    if (this.isEditing && this.editingIndex === index) {
      this.onCancel();
    }
  }
}


