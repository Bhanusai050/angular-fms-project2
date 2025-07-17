import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];

  isvisible = false;
  expensesData: any[] = [];
  

  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
  this.expenseForm = this.fb.group({
    expenseId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    date: ['', Validators.required],
    type: ['', Validators.required],
    amount: ['', [Validators.required, Validators.max(100)]],
    feed: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    animal: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });
}

  onSubmit(): void {
    if (this.expenseForm.valid) {
    this.expensesData.push(this.expenseForm.value);
    this.expenseForm.reset();
    alert('Submitted successfully!');
    this.isvisible = false;
    return;
    }

    this.expensesData.push(this.expenseForm.value);
    this.expenseForm.reset();
    this.isvisible = false;
  }

  onAdd(): void {
    this.isvisible = true;
    this.expenseForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(expense: any): void {
    this.expenseForm.patchValue(expense);
    this.isvisible = true;
  }

  onDelete(expense: any): void {
  const confirmed = confirm('⚠️ Are you sure you want to delete this expense?');
  if (confirmed) {
    this.expensesData = this.expensesData.filter(e => e !== expense);
    alert('Deleted successfully!');
  }
}

}
