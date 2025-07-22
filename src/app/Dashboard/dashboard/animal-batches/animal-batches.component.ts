import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-animal-batches',
  templateUrl: './animal-batches.component.html'
})
export class AnimalBatchesComponent implements OnInit {
  batchForm!: FormGroup;
  isvisible: boolean = false;
  isEditing: boolean = false;
  editIndex: number = -1;

  animalBatchesData: any[] = [];
  filteredBatches: any[] = [];
  paginatedanimalBatchesData: any[] = [];

  today: string = new Date().toISOString().split('T')[0];
  successMessage: string = '';
  showMessage: boolean = false;

  searchTerm = '';
  pageSizeOptions = [5, 10, 25];
  pageSize = 5;
  currentPage = 1;
  totalPages = 1;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.createform();
    this.getAnimalBatches();
  }

  createform() {
    this.batchForm = this.fb.group({
      BatchID: [0],
      BatchName: ['', [Validators.required, Validators.maxLength(50)]],
      PurchasedDate: ['', Validators.required],
      Purpose: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  onSearchChange() {
    this.currentPage = 1;
    this.filterBatches();
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.paginateBatches();
  }

  filterBatches() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBatches = this.animalBatchesData.filter(batch =>
      batch.BatchName.toLowerCase().includes(term) ||
      batch.Purpose.toLowerCase().includes(term)
    );
    this.paginateBatches();
  }

  paginateBatches() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.totalPages = Math.ceil(this.filteredBatches.length / this.pageSize);
    this.paginatedanimalBatchesData = this.filteredBatches.slice(start, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.paginateBatches();
  }

  getAnimalBatches() {
    this.api.getAnimalBatches().subscribe({
      next: (data) => {
        this.animalBatchesData = data;
        this.filterBatches();
      },
      error: () => {
        this.animalBatchesData = [];
        this.filteredBatches = [];
        this.paginatedanimalBatchesData = [];
      }
    });
  }

  showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
      this.successMessage = '';
    }, 2000);
  }

  onSubmit() {
    if (this.batchForm.invalid) {
      this.batchForm.markAllAsTouched();
      return;
    }

    const payload = this.batchForm.value;

    if (this.isEditing && this.editIndex > -1 && payload.BatchID) {
      // Edit
      this.api.updateAnimalBatch(payload.BatchID, payload).subscribe({
        next: () => {
          this.showSuccessMessage('Batch updated successfully');
          
          this.isvisible = false;
          this.isEditing = false;
          this.editIndex = -1;
          this.getAnimalBatches();
        },
        error: () => {
          alert('Failed to update batch');
        }
      });
    } else {
      // Add
      this.api.addAnimalBatch(payload).subscribe({
        next: () => {
          this.showSuccessMessage('Batch added successfully');
          
          this.isvisible = false;
          this.getAnimalBatches();
        },
        error: () => {
          alert('Failed to add batch');
        }
      });
    }
  }

  onAdd() {
    this.isvisible = true;
    this.isEditing = false;
    this.editIndex = -1;
    this.createform();
  }

  onCancel() {
    this.isvisible = false;
    this.isEditing = false;
    this.editIndex = -1;
   
  }

  onEdit(batch: any) {
    this.editIndex = this.animalBatchesData.indexOf(batch);
    const formattedDate = batch.PurchasedDate?.split('T')[0];

    this.batchForm.patchValue({
      ...batch,
      PurchasedDate: formattedDate
    });
    this.isvisible = true;
    this.isEditing = true;
  }

  onDelete(batch: any) {
    if (confirm("Are you sure you want to delete this batch?")) {
      this.api.deleteAnimalBatch(batch.BatchID).subscribe({
        next: () => {
          this.showSuccessMessage('Batch deleted successfully');
          this.getAnimalBatches();
        },
        error: () => {
          alert('Failed to delete batch');
        }
      });
    }
  }
}
