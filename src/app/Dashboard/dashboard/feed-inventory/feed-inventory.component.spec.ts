import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedInventoryComponent } from './feed-inventory.component';

describe('FeedInventoryComponent', () => {
  let component: FeedInventoryComponent;
  let fixture: ComponentFixture<FeedInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
