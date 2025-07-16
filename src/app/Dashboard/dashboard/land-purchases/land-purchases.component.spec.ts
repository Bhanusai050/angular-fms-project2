import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandPurchasesComponent } from './land-purchases.component';
describe('LandPurchasesComponent', () => {
  let component: LandPurchasesComponent;
  let fixture: ComponentFixture<LandPurchasesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandPurchasesComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(LandPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
