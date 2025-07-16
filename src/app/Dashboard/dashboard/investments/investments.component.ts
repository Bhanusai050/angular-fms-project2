import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html'

})
export class investmentsComponent {
  isvisible = false;
  investmentForm: FormGroup;
  investmentsData: any[] = [];

  constructor(private fb: FormBuilder) {
    this.investmentForm = this.fb.group({
  investmentId: ['', Validators.required],
  date: ['', Validators.required],
  capitalAmount: ['', [Validators.required, Validators.min(1)]],
  description: ['', [Validators.required, Validators.maxLength(200)]]
});

  }
  onEdit(investment: any): void {
  this.investmentForm.patchValue(investment);
  this.isvisible = true;
}

  onDelete(investment: any): void {
  if (confirm(`Are you sure you want to delete Investment ID: ${investment.investmentId}?`)) {
    this.investmentsData = this.investmentsData.filter(inv => inv !== investment);
  }
}

  onAdd() {
    this.isvisible = true;
    this.investmentForm.reset();
  }

  oncancel() {
    this.isvisible = false;
  }

  onSubmit() {
    if (this.investmentForm.valid) {
      this.investmentsData.push(this.investmentForm.value);
      this.investmentForm.reset();
      this.isvisible = false;
    }
  }
}


