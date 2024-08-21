import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdermodalComponent } from './ordermodal.component';

describe('OrdermodalComponent', () => {
  let component: OrdermodalComponent;
  let fixture: ComponentFixture<OrdermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdermodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
