import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.scss']
})
export class InvestmentsComponent implements OnInit {
  investmentForm!: FormGroup;
  investments: any[] = [];
  paginatedInvestments: any[] = [];

  isvisible = false;
  isEditing = false;
  showMessage = false;
  successMessage = '';
  today: string = new Date().toISOString().split('T')[0];

  searchTerm: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  pageSizeOptions: number[] = [5, 10, 20];

  editingInvestmentId: number | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadInvestments();
  }

  initForm(): void {
    this.investmentForm = this.fb.group({
      investment: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      date: ['', Validators.required],
      capitalAmount: [null, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
    });
  }

  loadInvestments(): void {
    this.api.getInvestments().subscribe((data: any) => {
      this.investments = data;
      this.applyFilter();
    });
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.investmentForm.reset();
    this.editingInvestmentId = null;
  }

  onSubmit(): void {
    if (this.investmentForm.invalid) return;

    const formValue = this.investmentForm.value;

    if (this.isEditing && this.editingInvestmentId !== null) {
      this.api.updateInvestment(this.editingInvestmentId, formValue).subscribe(() => {
        this.successMessage = 'Investment updated successfully!';
        this.showSuccess();
        this.loadInvestments();
      });
    } else {
      this.api.addInvestment(formValue).subscribe(() => {
        this.successMessage = 'Investment added successfully!';
        this.showSuccess();
        this.loadInvestments();
      });
    }

    this.investmentForm.reset();
    this.isvisible = false;
  }

  onEdit(investment: any): void {
    this.isvisible = true;
    this.isEditing = true;
    this.editingInvestmentId = investment.id;

    this.investmentForm.patchValue({
      investment: investment.investment,
      date: investment.date,
      capitalAmount: investment.capitalAmount,
      description: investment.description
    });
  }

  onDelete(investment: any): void {
    if (confirm('Are you sure you want to delete this investment?')) {
      this.api.deleteInvestment(investment.id).subscribe(() => {
        this.successMessage = 'Investment deleted successfully!';
        this.showSuccess();
        this.loadInvestments();
      });
    }
  }

  onCancel(): void {
    this.investmentForm.reset();
    this.isvisible = false;
    this.isEditing = false;
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFilter();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.applyFilter();
  }

  applyFilter(): void {
    const filtered = this.investments.filter(i =>
      i.investment.toString().includes(this.searchTerm.toLowerCase()) ||
      i.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInvestments = filtered.slice(startIndex, endIndex);
  }

  showSuccess(): void {
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}
