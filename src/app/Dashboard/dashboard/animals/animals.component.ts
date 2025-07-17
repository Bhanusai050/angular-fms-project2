import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-Animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss']
})
export class AnimalsComponent implements OnInit {
  animalForm!: FormGroup;
  AnimalsData: any = [];
  isvisible: boolean = false;
  isEditing: boolean = false;
  editIndex: number = -1;
  record: any;
  
  today: string = new Date().toISOString().split('T')[0];

  animalTypes = [
    { id: 1, name: 'Sheep' },
    { id: 2, name: 'Goat' },
    { id: 3, name: 'Hen' },
    { id: 4, name: 'Buffalo' },
    { id: 5, name: 'Cow' }
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
  vendors = [
    { VendorID: 1, VendorName: 'Vendor A' },
    { VendorID: 2, VendorName: 'Vendor B' },
    { VendorID: 3, VendorName: 'Suresh' }
  ];

  batches: any[] = [];


  constructor(private fb: FormBuilder, @Inject(ApiService) private api: ApiService) {}

  ngOnInit() {
    
  this.createForm();
  this.getAnimals();
  this.loadVendors();
  this.getbatchs();
  }
  createForm(){
    this.animalForm = this.fb.group({
      AnimalName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z ]+$')]],
      BatchID: [null,Validators.required], // will hold BatchID
      BirthDate: [new Date() ],
      animalType: [null, Validators.required],
      gender: [null, Validators.required],
      healthStatus: [null, Validators.required],
      animalCost: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      VendorID: [null, Validators.required], // will hold VendorID
      animalStatus: [null, Validators.required],
      AnimalPurchasedDate: ['', Validators.required]
    });
  }
  getbatchs() {
       // Fetch batches from backend
    this.api.getAnimalBatches().subscribe({
      next: (data) => {
        this.batches = data;
      },
      error: () => {
        this.batches = [];
      }
    });
  }

  getAnimals() {
   // Fetch animals from backend on load
    this.api.getAnimals().subscribe({
      next: (data) => {
        this.AnimalsData = data;
      },
      error: (err) => {
        console.error('Failed to fetch animals:', err);
        this.AnimalsData = [];
      }
    });

  }

  
  loadVendors(): void {
     this.vendors = [];
    this.api.getVendors().subscribe({
    next: data => this.vendors = data,
    error: err => {
    this.vendors = [];
    console.error('Failed to load vendors:', err.message);
      }
    });
  }
  getBatchName(BatchID: number): string {
    // Deprecated: Only batchName is used now
    return '';
  }

  onSubmit() {
    debugger;
    if (this.animalForm.invalid) return;

    const formValue = this.animalForm.value;
    const payload = {
      AnimalID: this.isEditing && this.record ? this.record.AnimalID : undefined,
      AnimalTypeID: formValue.animalType,
      AnimalName: formValue.AnimalName,
      BirthDate: formValue.BirthDate,
      GenderID: formValue.gender,
      HealthStatusID: formValue.healthStatus,
      AnimalCost: formValue.animalCost,
      VendorID: formValue.VendorID, // already an ID
      AnimalStatusID: formValue.animalStatus,
      AnimalPurchasedDate: formValue.AnimalPurchasedDate ? new Date(formValue.AnimalPurchasedDate).toISOString() : undefined,
      BatchID: formValue.BatchID // already an ID
    };

    // const VendorID = this.getVendorName(formValue.VendorID);
    // const BatchID = this.getBatchName(formValue.BatchID);

    // if (!VendorID || !BatchID) {
    //   alert('Invalid Vendor or Batch selected.');
    //   return;
    // }

    this.api.addAnimal(payload).subscribe({
      next: () => { /* handle success */ },
      error: (err) => {
        console.error('API Error:', err);
        alert('Server error: ' + (err?.message || 'Please try again later.'));
      }
    });
  }
  
    onAdd()
    {
          this.isvisible=true;
          this.isEditing=false;
          this.createForm();

          //this.animalForm.reset({ AnimalPurchasedDate: this.todayString, animalCost: 0 });
    }
    oncancel()
    {
      this.isvisible=false;

    }

    onEdits(animal: any): void {
      this.editIndex = this.AnimalsData.indexOf(animal);
      this.animalForm.patchValue({
        animalName: animal.AnimalName,
        batch: animal.Batch|| '',
        animalType: animal.AnimalTypeID,
        gender: animal.GenderID,
        healthStatus: animal.HealthStatusID,
        animalCost: animal.AnimalCost,
        vendor: animal.Vendor,
        animalStatus: animal.AnimalStatusID,
        animalPurchasedDate: animal.AnimalPurchasedDate
      });
      this.isvisible = true;
      this.isEditing = true;
    }

  onDelete(animal: any): void {
    
      this.api.deleteAnimal(animal.AnimalID).subscribe({
      next: () => { this.getAnimals(); },
      error: () => { alert('Failed to delete animal'); }
      
    });
  }

  // animals.component.ts
   digitsOnly(event: KeyboardEvent): void {
  const allowedKeys = [
    'Backspace',  // delete last character
    'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', // navigation
    'Tab', 'Delete',
    'Enter'       // let the Enter key through
  ];

  // Allow Ctrl/⌘ + C / V / A / X combos
  if (event.ctrlKey || event.metaKey) {
    return;
  }

  // Allow the keys in the list above
  if (allowedKeys.includes(event.key)) {
    return;
  }

  // Block anything that is not 0‑9
  const isDigit = /^[0-9]$/.test(event.key);
  if (!isDigit) {
    event.preventDefault();
  }
}

  getAnimalTypeName(id: number): string {
    const type = this.animalTypes.find(t => t.id === id);
    return type ? type.name : String(id);
  }
  getGenderName(id: number): string {
    const gender = this.genders.find(g => g.id === id);
    return gender ? gender.name : String(id);
  }
  getHealthStatusName(id: number): string {
    const health = this.healthStatuses.find(h => h.id === id);
    return health ? health.name : String(id);
  }
  getAnimalStatusName(id: number): string {
    const status = this.animalStatuses.find(s => s.id === id);
    return status ? status.name : String(id);
  }
  getVendorName(id: number): string {
    const vendor = this.vendors.find(v => v.VendorID === id);
    return vendor ? vendor.VendorName : String(id);
  }
}




