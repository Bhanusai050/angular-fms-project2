import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html'
})
export class ProductionComponent implements OnInit {
  productionForm!: FormGroup;
  isvisible = false;
  productionData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productionForm = this.fb.group({
      productionId: ['', Validators.required],
      productionType: ['', Validators.required],
      animalType: ['', Validators.required],
      date: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.productionForm.invalid) {
      this.productionForm.markAllAsTouched();
      return;
    }

    this.productionData.push(this.productionForm.value);
    this.productionForm.reset();
    this.isvisible = false;
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

  onDelete(production: any): void {
    this.productionData = this.productionData.filter(p => p !== production);
  }
}
