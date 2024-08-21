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

  updateCartItem(updatedProduct: any): void {
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
      map((items: any[]) =>
        items.reduce((total, item) => total + item.price * item.quantity, 0)
      )
    );
  }
}
