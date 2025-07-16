import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html'
})
export class ProductionsComponent implements OnInit {
  productionForm!: FormGroup;
  isvisible = false;
  productionData: any[] = [];
   today: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
  this.productionForm = this.fb.group({
    production: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    productionType: ['', Validators.required],
    animalType: ['', Validators.required],
    date: ['', Validators.required],
    quantity: ['', [Validators.required, Validators.min(1)]],
    unit: ['', Validators.required],
  });
}



  onSubmit() {
  if (this.productionForm.valid) {
    this.productionData.push(this.productionForm.value);
      this.productionForm.reset();
    alert('Submitted successfully!');
    this.isvisible = false;
  }
}

  onAdd(): void {
    this.isvisible = true;
    this.productionForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(production: any): void {
    this.productionForm.patchValue(production);
    this.isvisible = true;
  }

  onDelete(p: any) {
  const confirmDelete = confirm("Are you sure you want to delete?");
  if (confirmDelete) {
    // Your deletion logic here
    this.productionData = this.productionData.filter(x => x !== p);
     alert('Deleted successfully!');
  }
}

}
