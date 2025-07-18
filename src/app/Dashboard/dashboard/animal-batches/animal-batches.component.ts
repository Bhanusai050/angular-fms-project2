import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-animal-batches',
  templateUrl: './animal-batches.component.html'
})
export class AnimalBatchesComponent implements OnInit {
  batchForm!: FormGroup;
  isvisible: boolean = false; // Table/grid is default view
  isEditing: boolean = false;
  editIndex: number = -1;
  animalBatchesData: any[] = [];
  today: string = new Date().toISOString().split('T')[0]; 
    successMessage: string = '';
showMessage: boolean = false;
showSuccessMessage(msg: string) {
  this.successMessage = msg;
  this.showMessage = true;
  setTimeout(() => {
    this.showMessage = false;
  }, 0); // auto-hide after 3 seconds
}


  constructor(private fb: FormBuilder, private api: ApiService) {}


  ngOnInit(): void {
    this.createform();
    this.getAnimalBatches();
  }

  createform(){
     this.batchForm = this.fb.group({
      BatchID: [0],
      BatchName: ['', [Validators.required, Validators.maxLength(50)]],
      PurchasedDate: ['', Validators.required],
      Purpose: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  getAnimalBatches() {
    this.api.getAnimalBatches().subscribe({
      next: (data) => {
        this.animalBatchesData = data;
      },
      error: () => {
        this.animalBatchesData = [];
      }
    });
  }

  onSubmit() {
    debugger;
    if (this.batchForm.invalid) {
      this.batchForm.markAllAsTouched();
      return;
    }
    const payload = this.batchForm.value;
    if (this.isEditing && this.editIndex > -1 && payload.BatchID) {
      this.showSuccessMessage('Batch updated successfully');
      // Edit
      this.api.updateAnimalBatch(payload.BatchID, payload).subscribe({
        next: () => {
          this.batchForm.reset();
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
          this.batchForm.reset();
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
    this.batchForm.reset();
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
    this.api.deleteAnimalBatch(batch.BatchID).subscribe({
      next: () => { this.getAnimalBatches(); 
        this.showSuccessMessage('Batch deleted successfully');
      },
      error: () => { alert('Failed to delete batch'); }
    });
  }
}
