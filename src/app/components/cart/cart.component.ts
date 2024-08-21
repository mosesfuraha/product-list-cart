import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = of([]);
  total$: Observable<number> = of(0);
  isModalVisible: boolean = false;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
    this.total$ = this.cartService.getTotal();
  }

  removeItem(productName: string): void {
    this.cartService.removeFromCart(productName);
  }

  showOrderModal() {
    this.isModalVisible = true;
  }

  closeOrderModal() {
    this.isModalVisible = false;
  }

  confirmOrder() {
    this.closeOrderModal();
  }
  handleNewOrder() {
    this.isModalVisible = true;
  }
}
