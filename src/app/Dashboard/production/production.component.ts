import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-productions',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})


export class ProductionsComponent implements OnInit {

  searchTerm: string = '';
pageSize: number = 5;
pageSizes: number[] = [5, 10, 20, 50];
productions: any[] = [];
filteredProductions: any[] = [];
currentPage: number = 1;

  
  // ✅ Paste this block inside the class
  today: string = new Date().toISOString().split('T')[0];
  isvisible = false;
  isEditing = false;
  successMessage = '';
  
 
  pageSizeOptions = [5, 10, 20];
 
  totalPages = 1;
  paginatedProductionData: any[] = [];

  productionForm!: FormGroup;
  productionData: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productionForm = this.fb.group({
      production: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      productionType: [null, Validators.required],
      animalType: [null, Validators.required],
      date: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: [null, Validators.required],
    });

    // Example data
    this.productionData = []; // Fetch this from API/service if needed
    this.updatePagination();
  }

  onSearch(): void {
  if (this.searchTerm.trim()) {
    this.filteredProductions = this.productions.filter(p =>
      Object.values(p).some(val =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  } else {
    this.filteredProductions = [...this.productions];
  }
}


  onSubmit(): void {
    if (this.productionForm.invalid) return;

    const formValue = this.productionForm.value;
    if (this.isEditing) {
      // Update existing
    } else {
      this.productionData.push(formValue);
      this.successMessage = 'Production added successfully!';
    }

    this.productionForm.reset();
    this.isvisible = false;
    this.updatePagination();
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.productionForm.reset();
  }

  onEdit(p: any): void {
    this.isvisible = true;
    this.isEditing = true;
    this.productionForm.patchValue(p);
  }

  onDelete(p: any): void {
    if (confirm('Are you sure you want to delete?')) {
      const index = this.productionData.indexOf(p);
      if (index > -1) {
        this.productionData.splice(index, 1);
        this.successMessage = 'Production deleted successfully!';
        this.updatePagination();
      }
    }
  }

  oncancel(): void {
    this.productionForm.reset();
    this.isvisible = false;
  }

  // Pagination and search
  onSearchChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination(): void {
    const filteredData = this.productionData.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );

    this.totalPages = Math.ceil(filteredData.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProductionData = filteredData.slice(start, end);
  }
}
