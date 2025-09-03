export type Product = {
  name: string;
  image: string;
  price: number;
  checked: boolean;
};

export const productsDummy: Product[] = [
  {
    name: "Gundam RX-78-2",
    image:
      "https://gundamnesia.com/wp-content/uploads/2020/06/c70973fa1ac6f264a52b1bc14631136b.jpg",
    price: 25000,
    checked: false,
  },
  {
    name: "Lah Gundam",
    image:
      "https://ae01.alicdn.com/kf/S08bc8a490b2a4d618302942c9845d0d12.jpeg_640x640q90.jpeg",
    price: 30000,
    checked: false,
  },
  {
    name: "Gundam Build Strike",
    image:
      "https://storage.googleapis.com/lcdn-products/3/8/2/3/6/0/382360-large_default.webp",
    price: 35000,
    checked: false,
  },
];
