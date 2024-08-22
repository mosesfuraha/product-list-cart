# ProductListCart

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.6.

## Overview

The `ProductList` application is a dynamic Angular-based shopping cart system. Users can:

- Browse through a list of products (e.g., desserts).
- Add products to their cart.
- Adjust the quantity of each item in their cart.
- View their selected items in a cart sidebar with real-time updates.

### Key Features

- **Product Display**: The application displays products in a grid format, where each product card includes an image, the product name, category, and price.

- **Add to Cart**: Users can add products to their cart by clicking an "Add to Cart" button. Once a product is in the cart, the button changes to show quantity controls, allowing the user to increase or decrease the quantity.

- **Cart Display**: The cart is displayed in a sidebar that shows the list of products added by the user. Each item in the cart includes the product name, quantity, and total price for that item. The sidebar also shows the overall total price for all items in the cart.

## Deployment

The `ProductList` application is deployed and can be accessed at the following link:

- **Live Demo**: [Moses Product List Cart](https://moses-product-list-cart.netlify.app/)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

### Jest Testing

Jest was used to test specific features, particularly the `CartComponent` and `CartService`.

## Further help

To get more help on the Angular CLI, use `ng help` or check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
