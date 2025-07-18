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

    CountryCodes = [
    { code: '+91', label: 'India' },
    { code: '+1', label: 'USA' },
    { code: '+44', label: 'UK' },
    { code: '+61', label: 'Australia' }
  ];
  successMessage: string = '';
showMessage: boolean = false;

showSuccessMessage(msg: string) {
  this.successMessage = msg;
  this.showMessage = true;
  setTimeout(() => {
  this.showMessage = false;
  }, 3000); // auto-hide after 3 seconds
}
  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
   this.createForm();
    this.loadVendors();
  }
  createForm() {
     this.vendorForm = this.fb.group({
      vendorID: [0], // Initialize with 0 for new vendors 
      vendorName: ['', Validators.required],
      vendorType: [null, Validators.required],
      category: [null, Validators.required],
      email: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]], // Email validation regex
      // countryCode: [null, Validators.required], // Use null to allow selection of country)]],
      countryCode: ['+91', Validators.required], // Default to India

      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
      address: ['', Validators.required]
    });
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
   // this.vendorForm.reset();
   this.createForm();
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
    debugger;
    if (this.vendorForm.invalid) {
      this.vendorForm.markAllAsTouched();
      return;
    }

    // Map form fields to backend property names
    const formData = this.vendorForm.getRawValue();
    const payload = {
      VendorID: this.editingId || 0, // Use 0 for new vendors
      VendorName: formData.vendorName,
      VendorType: formData.vendorType, // <-- Use correct property name
      Category: formData.category,
      Email: formData.email,
      CountryCode: formData.countryCode, // <-- map to CountryCode
      PhoneNumber: formData.phone,   // <-- map to PhoneNumber
      Location: formData.address     // <-- map to Location
    };

    if (this.isEditing && this.editingId !== null) {
      this.api.updateVendor(this.editingId, payload).subscribe({
        next: () => {
          this.loadVendors();
          this.showSuccessMessage('Vendor updated successfully');
          this.onCancel();
        },
        error: err => alert(err.message)
      });
    } else {
      this.api.addVendor(payload).subscribe({
        next: () => {
          this.loadVendors();
          this.showSuccessMessage('Vendor added successfully');
          this.onCancel();
        },
        error: err => alert(err.message)
      });
    }
  }

  onEdit(data: any, index: number): void {
    // this.vendorForm.patchValue(data);
    this.vendorForm.patchValue({
  vendorID: data.vendorID || data.VendorID, // Use correct property name from your backend  
  vendorName: data.VendorName,
  vendorType: data.VendorType,
  category: data.Category,
  email: data.Email,
  countryCode: data.CountryCode,
  phone: data.PhoneNumber,
  address: data.Location
});
    this.isVisible = true;
    this.isEditing = true;
    this.editingIndex = index;
    this.editingId = data.vendorID || data.VendorID; // Use correct property name from your backend
  }

  onDelete(index: number): void {
    const vendorId = this.VendorData[index].vendorID || this.VendorData[index].VendorID;
    if (vendorId) {
      this.api.deleteVendor(vendorId).subscribe({
        next: () =>{ this.loadVendors(),
        this.showSuccessMessage('Vendor deleted successfully');
        },
        error: err => alert(err.message)
      });
    }
    if (this.isEditing && this.editingIndex === index) {
      this.onCancel();
    }
  }
}


