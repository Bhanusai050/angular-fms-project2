import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedPurchasesComponent } from './feed-purchases.component';
describe('FeedPurchasesComponent', () => {
  let component: FeedPurchasesComponent;
  let fixture: ComponentFixture<FeedPurchasesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedPurchasesComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(FeedPurchasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
