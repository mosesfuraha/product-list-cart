import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];
  cartItems$: Observable<any[]>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => {
        this.products = data;
      })
      .catch((error) => {
        return error;
      });
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  isInCart(product: any): Observable<boolean> {
    return this.cartItems$.pipe(
      map((items) => items.some((item) => item.name === product.name))
    );
  }

  getQuantity(product: any): Observable<number> {
    return this.cartItems$.pipe(
      map((items) => {
        const cartItem = items.find((item) => item.name === product.name);
        return cartItem ? cartItem.quantity : 0;
      })
    );
  }

  incrementQuantity(product: any): void {
    this.cartItems$
      .pipe(
        take(1),
        map((items) => items.find((item) => item.name === product.name))
      )
      .subscribe((cartItem) => {
        if (cartItem) {
          const updatedCartItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          };
          this.cartService.updateCartItem(updatedCartItem);
        }
      });
  }

  decrementQuantity(product: any): void {
    this.cartItems$
      .pipe(
        take(1),
        map((items) => items.find((item) => item.name === product.name))
      )
      .subscribe((cartItem) => {
        if (cartItem) {
          if (cartItem.quantity > 1) {
            const updatedCartItem = {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
            this.cartService.updateCartItem(updatedCartItem);
          } else {
            this.cartService.removeFromCart(product.name);
          }
        }
      });
  }
}
