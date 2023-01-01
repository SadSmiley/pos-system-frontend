import { api } from 'boot/axios';

// eslint-disable-next-line operator-linebreak
const defaultImage =
  'https://scotturb.com/wp-content/uploads/2016/11/product-placeholder.jpg';
export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export class Product {
  id?: string;

  name: string;

  price: number;

  quantity: number;

  image?: string;

  upc?: string;

  stock: number;

  constructor({
    id,
    name,
    price,
    quantity,
    image,
    upc,
    stock,
  }: {
    id?: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    upc?: string;
    stock?: number;
  }) {
    this.id = id || '';
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.image = image || defaultImage;
    this.upc = upc || '';
    this.stock = stock || 0;
  }

  adjustQuantity(type: 'add' | 'minus') {
    if (type === 'add') this.quantity += 1;
    else if (type === 'minus' && this.quantity > 1) this.quantity -= 1;
  }

  async save() {
    const submitData = {
      name: String(this.name),
      price: Number(this.price),
      countInStock: Number(this.quantity),
      image: this.image === defaultImage ? '' : this.image,
      upc: String(this.upc),
    };

    if (this.id) {
      await api.put(`/api/v1/products/${this.id}`, submitData);
    } else {
      await api.post('/api/v1/products', submitData);
    }
  }

  get formattedPrice() {
    return this.price.toFixed(2);
  }
}

export interface ProductResponse {
  _id: string;
  name: string;
  price: number;
  image?: string;
  upc?: string;
  countInStock: number;
}
