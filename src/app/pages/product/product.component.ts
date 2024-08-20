import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  products: any[] = [];

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
        console.error('Error loading products:', error);
      });
  }
}
