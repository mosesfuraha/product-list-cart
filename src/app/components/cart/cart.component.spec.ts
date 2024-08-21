import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../models/cart-item';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartServiceMock: Partial<CartService>;
  let cartItemsSubject: BehaviorSubject<CartItem[]>;
  let totalSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    totalSubject = new BehaviorSubject<number>(0);

    cartServiceMock = {
      getCartItems: jest.fn().mockReturnValue(cartItemsSubject.asObservable()),
      getTotal: jest.fn().mockReturnValue(totalSubject.asObservable()),
      removeFromCart: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize cartItems$ and total$ on ngOnInit', () => {
    expect(cartServiceMock.getCartItems).toHaveBeenCalled();
    expect(cartServiceMock.getTotal).toHaveBeenCalled();

    const testCartItems: CartItem[] = [
      {
        name: 'Product',
        quantity: 1,
        price: 0,
        image: {
          thumbnail: 'thumbnail Image',
          mobile: 'mobile image',
          tablet: 'tablet image',
          desktop: 'desktop image',
        },
      },
    ];
    const testTotal = 100;
    cartItemsSubject.next(testCartItems);
    totalSubject.next(testTotal);

    component.cartItems$.subscribe((items) => {
      expect(items).toEqual(testCartItems);
    });

    component.total$.subscribe((total) => {
      expect(total).toBe(testTotal);
    });
  });

  it('should call removeFromCart on removeItem', () => {
    const productName = 'Product';
    component.removeItem(productName);
    expect(cartServiceMock.removeFromCart).toHaveBeenCalledWith(productName);
  });

  it('should show the order modal', () => {
    component.showOrderModal();
    expect(component.isModalVisible).toBe(true);
  });

  it('should close the order modal', () => {
    component.closeOrderModal();
    expect(component.isModalVisible).toBe(false);
  });

  it('should confirm order and close the modal', () => {
    component.isModalVisible = true;
    component.confirmOrder();
    expect(component.isModalVisible).toBe(false);
  });

  it('should handle new order and show the modal', () => {
    component.handleNewOrder();
    expect(component.isModalVisible).toBe(true);
  });
});
