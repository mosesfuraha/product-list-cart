export interface ProductImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface ProductItem {
  image: ProductImage;
  name: string;
  category: string;
  price: number;
}

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: ProductImage;
}
