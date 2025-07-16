import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  isvisible = false;
  expensesData: any[] = [];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      expenseId: [''],
      category: ['', Validators.required],
      description: ['', Validators.required], // This is your "category"
      amount: ['', [Validators.required, Validators.min(1)]],
      date: [''],
      paymentMode: ['']
    });
    this.loadExpenses();
  }

  loadExpenses(): void {
    debugger;
    this.api.getExpenses().subscribe({
      next: data => this.expensesData = data,
      error: () => this.expensesData = []
    });
  }

  onSubmit(): void {
    debugger
        const formValue = this.expenseForm.value;
        console.log('Form Value:', formValue);
      const orderPayload = {
        expenseId: formValue.expenseId,
        category: formValue.category,
        description: formValue.description,
        amount: formValue.amount,
        date: formValue.date,
        paymentMode: formValue.paymentMode,
  
      };
    this.api.addExpense(orderPayload).subscribe({
      
      next: () => {
        this.loadExpenses();
        this.expenseForm.reset();
        this.isvisible = false;
      },
      error: () => alert('Failed to add expense')
    });
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
    if (expense.ExpenseID) {
      this.api.deleteExpense(expense.ExpenseID).subscribe({
        next: () => this.loadExpenses(),
        error: () => alert('Failed to delete expense')
      });
    }
  }
}
