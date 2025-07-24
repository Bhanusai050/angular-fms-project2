 import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service'; // Adjust path if needed
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  expensesData: any[] = [];
  paginatedExpensesData: any[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 1;
  totalPages: number = 1;
  expenses: any[] = [];

  isvisible: boolean = false;
  isEditing: boolean = false;
  today: string = formatDate(new Date(), 'yyyy-MM-dd', 'en-IN');
  successMessage: string = '';

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllExpenses();
  }

  initForm(): void {
    this.expenseForm = this.fb.group({
      expense: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      date: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.max(100)]],
      feed: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      animal: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.expenseForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
    this.expenseForm.reset();
  }

  onSubmit(): void {
    if (this.expenseForm.invalid) return;

    const formValue = this.expenseForm.value;

    if (this.isEditing) {
      const index = this.expensesData.findIndex(e => e.expenseId === formValue.expense);
      if (index !== -1) {
        this.expensesData[index] = { ...formValue };
        this.successMessage = 'Expense updated successfully!';
      }
    } else {
      this.expensesData.push({ ...formValue, expenseId: formValue.expense });
      this.successMessage = 'Expense added successfully!';
    }

    this.expenseForm.reset();
    this.isvisible = false;
    this.onSearchChange();

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
    console.log('Submitting expense form:', this.expenseForm.value);
}


clearSuccessMessage(): void {
  setTimeout(() => {
    this.successMessage = '';
  }, 3000);
}



  onEdit(expense: any): void {
    this.isvisible = true;
    this.isEditing = true;
    this.expenseForm.patchValue(expense);
  }

  onDelete(expense: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this expense?');
    if (confirmDelete) {
      this.expensesData = this.expensesData.filter(e => e.expenseId !== expense.expenseId);
      this.onSearchChange();
      this.successMessage = 'Expense deleted successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
    }
  }

  // Search and Pagination

  onSearchChange(): void {
    const filtered = this.expensesData.filter(exp =>
      Object.values(exp).some(val =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    this.currentPage = 1;
    
    this.paginate(filtered);
  }

  onPageSizeChange(): void {
    this.onSearchChange();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const filtered = this.expensesData.filter(exp =>
      Object.values(exp).some(val =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.paginate(filtered);
  }

  paginate(filtered: any[]): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedExpensesData = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  getAllExpenses(): void {
  this.api.getExpenses().subscribe({
    next: (res) => {
      console.log('Fetched from backend:', res); // 👈 CHECK THIS IN CONSOLE
      this.expenses = res;
    },
    error: (err) => {
      console.error('Fetching expenses failed:', err);
    }
  });
}


}

