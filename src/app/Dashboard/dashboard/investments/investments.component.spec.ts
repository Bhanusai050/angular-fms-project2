import { ComponentFixture, TestBed } from '@angular/core/testing';
import { investmentsComponent } from './investments.component';


describe('InvestmentsComponent', () => {
  let component:  investmentsComponent;
  let fixture: ComponentFixture<investmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [investmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(investmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
