import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';



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
animals: any[] = [];

  
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

  
  constructor(private fb: FormBuilder, private api: ApiService) {}


  ngOnInit(): void {
    this.productionForm = this.fb.group({
  ProductionID: [0],
  productionType: [null, Validators.required],
  AnimalID: [null, Validators.required], // Changed from animalType
  date: [null, Validators.required],
  quantity: [null, [Validators.required, Validators.min(1)]],
  unit: [null, Validators.required]
});


    // Example data
    this.productionData = []; // Fetch this from API/service if needed
    this.updatePagination();
    this.getAnimals();
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
    const index = this.productionData.findIndex(p => p.productionId === formValue.productionId);
    if (index !== -1) {
      this.productionData[index] = { ...formValue };
      this.successMessage = 'Production updated successfully!';
    }
  } else {
    this.productionData.push({ ...formValue });
    this.successMessage = 'Production added successfully!';
  }

  this.productionForm.reset();
  this.isvisible = false;
  this.onSearchChange?.(); // Optional chaining if `onSearchChange()` is defined

  setTimeout(() => {
    this.successMessage = '';
  }, 3000);

  console.log('Submitting production form:', this.productionForm.value);
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
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
        this.updatePagination();
      }
    }
  }

  getProductions(): void {
    this.api.getProductions().subscribe({
      next: (data) => {
        this.productions = data;
      },
      error: (err) => {
        console.error('Error fetching productions:', err);
      }
    });
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
  getAnimals(): void {
  this.api.getAnimals().subscribe({
    next: (data: any[]) => {
      this.animals = data;
      console.log('Animals fetched:', this.animals);
    },
   error: (err: unknown) => {
  console.error('Error fetching animals:', err);
    }
  });
}

toggleForm(): void {
    this.isvisible = !this.isvisible;
    this.resetForm();
    this.isEditing = false;
  }

  resetForm(): void {
    this.productionForm.reset({
      ProductionID: 0,
      productionType: '',
      AnimalID: '',
      date: '',
      quantity: null,
      unit: ''
    });
  }
}



