export interface Product {
  id: number;
  name: string;
  price: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10000,
  },
  {
    id: 2,
    name: "Product 2",
    price: 30000,
  },
];
