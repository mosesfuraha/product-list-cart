import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): Observable<any[]> {
    return this.cartItems$;
  }

  addToCart(product: any): void {
    const items = [...this.cartItemsSubject.value];

    const existingProductIndex = items.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      items[existingProductIndex] = {
        ...items[existingProductIndex],
        quantity: items[existingProductIndex].quantity + 1,
      };
      console.log('Updated product quantity:', items[existingProductIndex]);
    } else {
      items.push({ ...product, quantity: 1 });
      console.log('Added new product to cart:', product);
    }

    this.cartItemsSubject.next(items);
  }

  updateCartItem(updatedProduct: any): void {
    const items = [...this.cartItemsSubject.value];

    const existingProductIndex = items.findIndex(
      (item) => item.id === updatedProduct.id
    );

    if (existingProductIndex !== -1) {
      items[existingProductIndex] = {
        ...items[existingProductIndex],
        ...updatedProduct,
      };
      console.log('Updated cart item:', items[existingProductIndex]);
      this.cartItemsSubject.next(items);
    } else {
      console.warn('Product not found in cart:', updatedProduct);
    }
  }

  removeFromCart(productId: number): void {
    const items = this.cartItemsSubject.value.filter(
      (item) => item.id !== productId
    );
    this.cartItemsSubject.next(items);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map((items: any[]) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
  }
}
