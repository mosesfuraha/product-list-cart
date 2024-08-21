import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart-item';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const product: CartItem = {
      name: 'Product',
      price: 100,
      quantity: 1,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };

    service.addToCart(product);
    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0]).toEqual({ ...product, quantity: 1 });
    });
  });

  it('should update an item in the cart', () => {
    const product: CartItem = {
      name: 'Product',
      price: 100,
      quantity: 1,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };

    service.addToCart(product);

    const updatedProduct: CartItem = {
      ...product,
      quantity: 2,
    };

    service.updateCartItem(updatedProduct);
    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(1);
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should remove an item from the cart', () => {
    const product: CartItem = {
      name: 'Product',
      price: 100,
      quantity: 1,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };

    service.addToCart(product);
    service.removeFromCart(product.name);
    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should clear the cart', () => {
    const product: CartItem = {
      name: 'Product',
      price: 100,
      quantity: 1,
      image: {
        thumbnail: 'thumbnail.jpg',
        mobile: 'mobile.jpg',
        tablet: 'tablet.jpg',
        desktop: 'desktop.jpg',
      },
    };

    service.addToCart(product);
    service.clearCart();
    service.getCartItems().subscribe((items) => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate the total price', () => {
    const product1: CartItem = {
      name: 'Product 1',
      price: 100,
      quantity: 1,
      image: {
        thumbnail: 'thumbnail1.jpg',
        mobile: 'mobile1.jpg',
        tablet: 'tablet1.jpg',
        desktop: 'desktop1.jpg',
      },
    };

    const product2: CartItem = {
      name: 'Product 2',
      price: 200,
      quantity: 2,
      image: {
        thumbnail: 'thumbnail2.jpg',
        mobile: 'mobile2.jpg',
        tablet: 'tablet2.jpg',
        desktop: 'desktop2.jpg',
      },
    };

    service.addToCart(product1);
    service.addToCart(product2);

    service.getTotal().subscribe((total) => {
      expect(total).toBe(500);
    });
  });
});
