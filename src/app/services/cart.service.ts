import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<
    CartItem[]
  >([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  getCartItems(): Observable<CartItem[]> {
    return this.cartItems$;
  }

  addToCart(product: CartItem): void {
    const items = [...this.cartItemsSubject.value];

    const existingProductIndex = items.findIndex(
      (item) => item.name === product.name
    );

    if (existingProductIndex !== -1) {
      items[existingProductIndex] = {
        ...items[existingProductIndex],
        quantity: items[existingProductIndex].quantity + 1,
      };
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next(items);
  }

  updateCartItem(updatedProduct: CartItem): void {
    const items = [...this.cartItemsSubject.value];

    const existingProductIndex = items.findIndex(
      (item) => item.name === updatedProduct.name
    );

    if (existingProductIndex !== -1) {
      items[existingProductIndex] = {
        ...items[existingProductIndex],
        ...updatedProduct,
      };

      this.cartItemsSubject.next(items);
    }
  }

  removeFromCart(productName: string): void {
    const items = this.cartItemsSubject.value.filter(
      (item) => item.name !== productName
    );
    this.cartItemsSubject.next(items);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  getTotal(): Observable<number> {
    return this.cartItems$.pipe(
      map((items: CartItem[]) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
  }
}
