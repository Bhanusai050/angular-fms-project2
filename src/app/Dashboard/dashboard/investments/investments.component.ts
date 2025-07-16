import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',

})
export class InvestmentComponent {
  isvisible = false;
  investmentForm: FormGroup;
  investmentsData: any[] = [];

   today: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder) {
    this.investmentForm = this.fb.group({
  investmentId: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Integers only
  date: ['', [Validators.required]], // Validated in template using [max] attribute
  capitalAmount: ['', [Validators.required, Validators.min(1)]], // Min value 1
  description: ['', [Validators.required, Validators.maxLength(200)]] // Max 200 characters
});

 

 

  }
  onEdit(investment: any): void {
  this.investmentForm.patchValue(investment);
  this.isvisible = true;
}

   onDelete(investments: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this investment item?');
    if (confirmDelete) {
      this.investmentsData = this.investmentsData.filter(f => f !== investments);
      alert('Deleted successfully!');
    }
  }
  onAdd() {
    this.isvisible = true;
    this.investmentForm.reset();
  }

  oncancel() {
    this.isvisible = false;
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {
      this.investmentsData.push(this.investmentForm.value);
      this.investmentForm.reset();
      alert('Submitted successfully!');
      this.isvisible = false;
    }
  }
}


