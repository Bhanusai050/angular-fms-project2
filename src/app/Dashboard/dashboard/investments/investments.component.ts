import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  investmentForm!: FormGroup;
  investmentsData: any[] = [];
  isvisible: boolean = false;
  today: string = new Date().toISOString().split('T')[0];
  searchTerm: string = '';

  // Pagination
  currentPage: number = 1;
  pageSize: number = 5;
  pageSizeOptions = [5, 10, 20, 50];

  successMessage: string = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.investmentForm = this.fb.group({
      investment: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      date: ['', Validators.required],
      capitalAmount: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  get filteredInvestments() {
    return this.investmentsData.filter(inv =>
      inv.investment.toString().includes(this.searchTerm) ||
      inv.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedInvestments() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredInvestments.slice(start, start + this.pageSize);
  }

  get totalPages() {
    return Math.ceil(this.filteredInvestments.length / this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onAdd(): void {
    this.isvisible = true;
    this.investmentForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onSubmit(): void {
    if (this.investmentForm.valid) {
      const formData = { ...this.investmentForm.value };
      const index = this.investmentsData.findIndex(i => i.investment === formData.investment);
      if (index !== -1) {
        this.investmentsData[index] = formData;
      } else {
        this.investmentsData.push(formData);
      }
      this.successMessage = 'Submitted successfully!';
      setTimeout(() => this.successMessage = '', 3000);
      this.isvisible = false;
    }
  }

  onEdit(investment: any): void {
    this.investmentForm.patchValue(investment);
    this.isvisible = true;
  }

  windowConfirmDelete(investment: any): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.onDelete(investment);
    }
  }

  onDelete(investment: any): void {
    const index = this.investmentsData.indexOf(investment);
    if (index !== -1) {
      this.investmentsData.splice(index, 1);
      this.successMessage = 'Deleted successfully!';
      setTimeout(() => this.successMessage = '', 3000);
    }
  }
}
