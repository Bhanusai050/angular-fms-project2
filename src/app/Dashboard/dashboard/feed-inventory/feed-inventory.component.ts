import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html'
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
  isvisible = false;
  isEditing = false;
  feedData: any[] = [];

  feedTypes: { IdValueID: number, Name: string }[] = [
    // Example static data; replace with API call if needed
    { IdValueID: 1, Name: 'Grass' },
    { IdValueID: 2, Name: 'Grain' },
    { IdValueID: 3, Name: 'Silage' }
  ];

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      feedName: ['', [Validators.required, Validators.maxLength(50)]],
      feedType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      Price: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.feedForm.invalid) {
      this.feedForm.markAllAsTouched(); // highlight invalid fields
      return; // prevent submission
    }

    const payload = {
      FeedTypeID: this.feedForm.value.feedType,
      StockQuantity: this.feedForm.value.quantity,
      Price: this.feedForm.value.Price,
      ExpiryDate: this.feedForm.value.expiryDate
    };

    this.feedData.push(payload);
    this.feedForm.reset();
    this.isvisible = false;
  }

  onAdd(): void {
    this.isvisible = true;
    this.feedForm.reset();
  }

  oncancel(): void {
    this.isvisible = false;
  }

  onEdit(feed: any): void {
    this.feedForm.patchValue(feed);
    this.isvisible = true;
  }

  onDelete(feed: any): void {
    this.feedData = this.feedData.filter(f => f !== feed);
  }
}
