import { Product } from './product';
export class ShoppingCartItem {
  title: string;
  price: number;
  imageUrl: string;
  key?: string;
  quantity: number;

  constructor(init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}
