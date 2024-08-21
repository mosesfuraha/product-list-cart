import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordermodal',
  templateUrl: './ordermodal.component.html',
  styleUrls: ['./ordermodal.component.css'],
})
export class OrdermodalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
  @Output() newOrder = new EventEmitter<void>();

  cartItems$: Observable<any[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.getCartItems();
    this.total$ = this.cartService.getTotal();
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  confirmOrder() {
    this.confirm.emit();
    this.closeModal();
  }

  startNewOrder() {
    this.cartService.clearCart();
    this.newOrder.emit();
    this.closeModal();
  }
}
