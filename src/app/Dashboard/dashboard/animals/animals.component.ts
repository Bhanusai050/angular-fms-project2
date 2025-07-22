import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-Animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
onPageSizeChange() {
   this.currentPage = 1;
  this.updatePagination();
throw new Error('Method not implemented.');
}
  animalForm!: FormGroup;
  isvisible: boolean = false;
  isEditing: boolean = false;
  editIndex: number = -1;
  record: any;
  AnimalsData: any[] = [];
  paginatedAnimalsData: any[] = [];
  batches: any[] = [];
  vendors: any[] = [];

  successMessage: string = '';
  showMessage: boolean = false;


  today: string = new Date().toISOString().split('T')[0];

  animalTypes = [
    { id:1, name: 'Sheep' },
    {id:2,  name: 'Goat' },
    { id:3, name: 'Hen' },
    { id:4, name: 'Buffalo' },
    { id:5,  name: 'Cow' }
  ];

  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' }
  ];

  healthStatuses = [
    { id: 1, name: 'Sick' },
    { id: 2, name: 'Healthy' },
    { id: 3, name: 'Injured' },
    { id: 4, name: 'Recovering' }
  ];

  animalStatuses = [
    { id: 1, name: 'Death' },
    { id: 2, name: 'Sold' },
    { id: 3, name: 'Active' }
  ];
  allAnimals: any[] = [];
  filteredAnimalsData: any[] = [];
  paginatedAnimals: any[] = [];
  searchTerm: string = '';

  currentPage = 1;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20, 50];
  totalPages = 0;

  constructor(private fb: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.createForm();
    this.getAnimals();
    this.loadVendors();
    this.getBatches();
  }

  createForm() {
    this.animalForm = this.fb.group({
      AnimalID: [0],
      AnimalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7), Validators.pattern('^[A-Za-z ]+$')]],
      BatchID: [null, Validators.required],
      BirthDate: [this.today],
      AnimalTypeID: [null, Validators.required],
      GenderID: [null, Validators.required],
      HealthStatusID: [null, Validators.required],
      AnimalCost: ['', [Validators.required, Validators.pattern('^[0-9]{1,7}$')]],
      VendorID: [null, Validators.required],
      AnimalStatusID: [null, Validators.required],
      AnimalPurchasedDate: ['', Validators.required]
    });
  }

  getAnimals() {
    this.api.getAnimals().subscribe({
      next: data => {
        this.AnimalsData = data;
        this.filteredAnimalsData = data;
        this.updatePagination();
      },
      error: () => {
        this.AnimalsData = [];
        this.filteredAnimalsData = [];
        this.updatePagination();
      }
    });
  }
  
  
  loadVendors() {
    this.api.getVendors().subscribe({
      next: data => this.vendors = data,
      error: () => this.vendors = []
    });
  }

  getBatches() {
    this.api.getAnimalBatches().subscribe({
      next: data => this.batches = data,
      error: () => this.batches = []
    });
  }
updatePagination() {
  
  const searchWords = this.searchTerm.toLowerCase().trim().split(/\s+/); // Split by spaces

  const filteredData = this.AnimalsData.filter(animal => {
    const name = animal.AnimalName?.toLowerCase() || '';
    const id = animal.AnimalID?.toString() || '';

    return searchWords.every(word =>
      name.includes(word) || id.includes(word)
    );
  });

  this.totalPages = Math.ceil(filteredData.length / this.pageSize);
  this.paginatedAnimalsData = filteredData.slice(
    (this.currentPage - 1) * this.pageSize,
    this.currentPage * this.pageSize
  );
}

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onSearchChange() {
    this.currentPage = 1;
    this.updatePagination();
  }

  onSubmit() {
    if (this.animalForm.invalid) return;
    const payload = this.animalForm.value;
    const request = this.isEditing ? this.api.updateAnimal(payload.AnimalID, payload) : this.api.addAnimal(payload);

    request.subscribe({
      next: () => {
        this.showSuccessMessage(this.isEditing ? 'Animal updated successfully' : 'Animal added successfully');
       
        this.isvisible = false;
        this.isEditing = false;
        this.getAnimals();
      },
      error: () => alert('Failed to submit animal')
    });
  }

  onAdd() {
    this.isvisible = true;
    this.isEditing = false;
    this.createForm();
  }

  onCancel() {
    this.isvisible = false;
    
  }

  onEdit(animal: any) {
    this.editIndex = this.AnimalsData.indexOf(animal);
    this.animalForm.patchValue({
      ...animal,
      AnimalPurchasedDate: animal.AnimalPurchasedDate?.split('T')[0]
    });
    this.isvisible = true;
    this.isEditing = true;
  }

  onDelete(animal: any) {
    this.api.deleteAnimal(animal.AnimalID).subscribe({
      next: () => {
        this.getAnimals();
        this.showSuccessMessage('Animal deleted successfully');
      },
      error: () => alert('Failed to delete animal')
    });
  }

  showSuccessMessage(msg: string) {
    this.successMessage = msg;
    this.showMessage = true;
    setTimeout(() => this.showMessage = false, 3000);
  }
  digitsOnly(event: KeyboardEvent) {
  if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Tab') {
    event.preventDefault();
  }
}
getAnimalTypeName(id: number) {
  return this.animalTypes.find(t => t.id === id)?.name || '';
}

getGenderName(id: number) {
  return this.genders.find(g => g.id === id)?.name || '';
}

getHealthStatusName(id: number) {
  return this.healthStatuses.find(h => h.id === id)?.name || '';
}

getAnimalStatusName(id: number) {
  return this.animalStatuses.find(s => s.id === id)?.name || '';
}


}
