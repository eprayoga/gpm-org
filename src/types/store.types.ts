export interface CartItem {
  productId: string;
  variantIndex: number;
  size: string;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface CartState {
  items: CartItem[];
}

export interface WishlistState {
  items: WishlistItem[];
}

export interface CartItemWithProduct extends CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    colorName: string;
    colorHex: string;
    tech: string;
    stock: number;
  };
}
