import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html'
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
  feedData: any[] = [];
  isvisible = false;
  today: string = new Date().toISOString().split('T')[0]; // for expiry date validation
 
  constructor(private fb: FormBuilder) {}
 
  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feed: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      feedType: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      stockQuantity: ['', [Validators.required, Validators.min(1)]],
      unit: ['', Validators.required],
      expiryDate: ['', [Validators.required]],
    });
  }
 
  onSubmit(): void {
    if (this.feedForm.valid) {
      this.feedData.push(this.feedForm.value);
      this.feedForm.reset();
      alert('Submitted successfully!');
      this.isvisible = false;
    }
  }
 
  onAdd(): void {
    this.feedForm.reset();
    this.isvisible = true;
  }
 
  oncancel(): void {
    this.isvisible = false;
  }
 
  onEdit(feed: any): void {
    this.feedForm.patchValue(feed);
    this.isvisible = true;
  }
 
  onDelete(feed: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this feed item?');
    if (confirmDelete) {
      this.feedData = this.feedData.filter(f => f !== feed);
      alert('Deleted successfully!');
    }
  }
}