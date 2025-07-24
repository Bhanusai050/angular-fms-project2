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
  filteredInvestments: any[] = [];

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

  getInvestments() {
  this.api.getInvestments().subscribe((data: any[]) => {
    this.investments = data;
    this.filteredInvestments = data; // ✅ Important for filtering/pagination
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

  if (this.isEditing) {
    const index = this.investments.findIndex(i => i.investmentId === formValue.investmentId);
    if (index !== -1) {
      this.investments[index] = { ...formValue };
      this.successMessage = 'Investment updated successfully!';
    }
  } else {
    this.investments.push({ ...formValue, investmentId: formValue.investmentId });
    this.successMessage = 'Investment added successfully!';
  }

  this.investmentForm.reset();
  this.isvisible = false;
  this.onSearchChange();

  setTimeout(() => {
    this.successMessage = '';
  }, 3000);

  console.log('Submitting investment form:', formValue);
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
  const confirmDelete = confirm('Are you sure you want to delete this investment?');
  if (confirmDelete) {
    this.investments = this.investments.filter(i => i.investmentId !== investment.investmentId);
    this.onSearchChange(); // if applicable
    this.successMessage = 'Investment deleted successfully!';
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
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
