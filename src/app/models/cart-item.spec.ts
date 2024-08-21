import { CartItem, ProductImage } from './cart-item';

describe('CartItem', () => {
  it('should create an instance of CartItem', () => {
    const productImage: ProductImage = {
      thumbnail: 'thumbnail.jpg',
      mobile: 'mobile.jpg',
      tablet: 'tablet.jpg',
      desktop: 'desktop.jpg',
    };

    const cartItem: CartItem = {
      name: 'Test Product',
      price: 100,
      quantity: 1,
      image: productImage,
    };

    expect(cartItem).toBeTruthy();
    expect(cartItem.name).toBe('Test Product');
    expect(cartItem.price).toBe(100);
    expect(cartItem.quantity).toBe(1);
    expect(cartItem.image).toEqual(productImage);
  });
});
