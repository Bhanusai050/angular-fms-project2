import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionsComponent } from './production.component';

describe('ProductionComponent', () => {
  let component: ProductionsComponent;
  let fixture: ComponentFixture<ProductionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
