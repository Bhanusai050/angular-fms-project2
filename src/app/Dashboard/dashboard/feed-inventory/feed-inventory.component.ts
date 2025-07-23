import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-feed-inventory',
  templateUrl: './feed-inventory.component.html',
  styleUrls: ['./feed-inventory.component.scss']
})
export class FeedInventoryComponent implements OnInit {
  feedForm!: FormGroup;
  feedData: any[] = [];
  
  paginatedFeedData: any[] = [];
  isvisible = false;
  isEditing = false;
  selectedFeedID: number | null = null;
  successMessage = '';
  showMessage = false;
  today: string = new Date().toISOString().split('T')[0];

  // Mock data for dropdown
  unitOptions = [
  { id: 'Kg', name: 'Kg' },
  { id: 'Liters', name: 'Liters' },
  { id: 'Bags', name: 'Bags' }
];

  feedTypes = [
    { FeedTypeID: 1, FeedTypeName: 'Grain' },
    { FeedTypeID: 2, FeedTypeName: 'Pellet' },
    { FeedTypeID: 3, FeedTypeName: 'Mash' }
  ];

  searchTerm = '';
  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20];
  totalPages = 1;

  constructor(private fb: FormBuilder, private api: ApiService) {}


  ngOnInit(): void {
    this.initForm();
    this.loadFeedInventory();
    this.loadFeedTypes();
    this.api.getFeedTypes().subscribe(data => {
  this.feedTypes = data;
});

  }

  initForm(): void {
    this.feedForm = this.fb.group({
      FeedID: [0],
      FeedTypeID: [null, Validators.required],
      StockQuantity: [0, [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]],
      Unit: [null, Validators.required],

      ExpiryDate: ['', Validators.required]
    });
  }
   loadFeedTypes(): void {
  this.api.getFeedTypes().subscribe({
    next: (res) => {
      this.feedTypes = res;
    },
    error: (err) => console.error('Error fetching feed types:', err)
  });
}


loadFeedInventory(): void {
  this.api.getFeedInventory().subscribe({
    next: (res) => {
      this.feedData = res;
      this.filterData(); // For pagination
    },
    error: (err) => console.error('Error fetching inventory:', err)
  });
}

onSubmit(): void {
  console.log('🧪 Submit button clicked');
  
  if (this.feedForm.invalid) {
    this.feedForm.markAllAsTouched();
    return;
  }

  const formValue = this.feedForm.value;

  const payload = {
    FeedID: formValue.FeedID || 0,
    FeedTypeID: Number(formValue.FeedTypeID),
    StockQuantity: Number(formValue.StockQuantity),
    Unit: formValue.Unit,
    ExpiryDate: new Date(formValue.ExpiryDate).toISOString(),
  };

  console.log('📦 Payload:', payload);

  this.api.addFeed(payload).subscribe({
    next: (res) => {
      console.log('✅ Feed added:', res);
      this.successMessage = 'Feed added successfully!';
      this.feedForm.patchValue({ FeedID: 0 });
      this.isvisible = false;
      this.loadFeedInventory();
      this.autoDismiss();
    },
    error: (err) => {
      console.error('❌ Error adding feed:', err);
    }
  });
}

  onAdd(): void {
    this.feedForm.patchValue({ FeedID:0 });
    this.isvisible = true;
    this.isEditing = false;
    this.selectedFeedID = null;
  }

  oncancel(): void {
   
    this.isvisible = false;
    this.isEditing = false;
    this.selectedFeedID = null;
  }

  onEdit(feed: any): void {
    this.feedForm.patchValue(feed);
    this.isvisible = true;
    this.isEditing = true;
    this.selectedFeedID = feed.FeedID;
  }

 onDelete(feed: any): void {
  const confirmDelete = confirm('Are you sure you want to delete this feed item?');
  if (confirmDelete) {
    this.api.deleteFeed(feed.FeedID).subscribe({
      next: () => {
        this.successMessage = 'Feed deleted successfully!';
        this.loadFeedInventory();
        this.autoDismiss();
      },
      error: (err) => console.error('Error deleting feed:', err)
    });
  }
}


  onSearchChange(): void {
    this.currentPage = 1;
    this.filterData();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.filterData();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterData();
    }
  }

  filterData(): void {
    const search = this.searchTerm.toLowerCase().trim();
    let filtered = this.feedData;

    if (search) {
      filtered = filtered.filter(feed =>
        feed.FeedName.toLowerCase().includes(search) ||
        feed.FeedID.toString().includes(search)
      );
    }

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedFeedData = filtered.slice(start, start + this.pageSize);
  }

  getFeedTypeName(id: number): string {
    const type = this.feedTypes.find(t => t.FeedTypeID === id);
    return type ? type.FeedTypeName : 'N/A';
  }

  digitsOnly(event: KeyboardEvent): void {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
    if (!/^\d$/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  autoDismiss(): void {
    setTimeout(() => {
      this.successMessage = '';
    }, 2000);
  }
}
