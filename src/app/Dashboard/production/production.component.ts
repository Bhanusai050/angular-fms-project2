import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';



@Component({
  selector: 'app-productions',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})


export class ProductionsComponent implements OnInit {
  productionForm!: FormGroup;
  productions: any[] = [];
  paginatedProductionData: any[] = [];
  animals: any[] = [];

  isvisible = false;
  isEditing = false;
  successMessage = '';
  today: string = new Date().toISOString().split('T')[0];

  searchTerm: string = '';
  pageSize: number = 5;
  pageSizes: number[] = [5, 10, 20];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.productionForm = this.fb.group({
      productionID: [0],
      productionType: [null, Validators.required],
      animalID: [null, Validators.required],
      date: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
    });

    this.getAnimals();
    this.getProductions();
  }

  getProductions(): void {
    this.api.getProductions().subscribe({
      next: (data) => {
        this.productions = data;
        this.updatePagination();
      },
      error: (err) => console.error('Error loading productions', err),
    });
  }

  getAnimals(): void {
    this.api.getAnimals().subscribe({
      next: (data) => (this.animals = data),
      error: (err) => console.error('Error loading animals', err),
    });
  }

  onAdd(): void {
    this.isvisible = true;
    this.isEditing = false;
    this.productionForm.reset({ productionID: 0 });
  }

  onEdit(prod: any): void {
    this.isvisible = true;
    this.isEditing = true;
    this.productionForm.patchValue({
      productionID: prod.productionID,
      productionType: prod.productionType,
      animalID: prod.animalID ?? prod.animal?.animalID,
      date: prod.date,
      quantity: prod.quantity,
    });
  }

  onDelete(prod: any): void {
    if (confirm('Are you sure you want to delete this production?')) {
      this.api.deleteProduction(prod.productionID).subscribe({
        next: () => {
          this.successMessage = 'Deleted successfully!';
          this.getProductions();
          setTimeout(() => (this.successMessage = ''), 3000);
        },
        error: (err) => console.error('Delete error', err),
      });
    }
  }

  onSubmit(): void {
    if (this.productionForm.invalid) return;

    const formValue = this.productionForm.value;

    if (this.isEditing) {
      this.api.updateProduction(formValue.productionID, formValue).subscribe({
        next: () => {
          this.successMessage = 'Updated successfully!';
          this.getProductions();
          this.closeForm();
        },
        error: (err) => console.error('Update failed', err),
      });
    } else {
      this.api.addProduction(formValue).subscribe({
        next: () => {
          this.successMessage = 'Added successfully!';
          this.getProductions();
          this.closeForm();
        },
        error: (err) => console.error('Add failed', err),
      });
    }
  }

  closeForm(): void {
    this.isvisible = false;
    this.productionForm.reset({ productionID: 0 });
    setTimeout(() => (this.successMessage = ''), 3000);
  }

  oncancel(): void {
    this.closeForm();
  }

  onSearchChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePagination();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  updatePagination(): void {
    const filtered = this.productions.filter((p) =>
      Object.values(p)
        .join(' ')
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProductionData = filtered.slice(start, end);
  }
}



