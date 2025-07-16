import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimalBatchesComponent } from './animal-batches.component';
describe('AnimalBatchesComponent', () => {
  let component: AnimalBatchesComponent;
  let fixture: ComponentFixture<AnimalBatchesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalBatchesComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(AnimalBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
