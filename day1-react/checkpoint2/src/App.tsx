/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react'

import { useState } from "react";

function ProductCardContainer({ children }: any) {
  return <div className="product-card-container">{children}</div>;
}

function ProductCard({ item, handleClick }: any) {
  return (
    <div
      className={`product-card ${
        item.checked ? "bg-slate-200 text-slate-400" : "bg-white"
      }`}>
      <span className="font-semibold">{item.name}</span>
      <div
        className="product-card-image"
        style={{ backgroundImage: `url(${item.image})` }}></div>
      <span className="mb-5">{item.price}</span>
      <div className="flex ">
        <span className="pr-5">Add to cart</span>
        <label className="switch">
          <input
            onChange={() => handleClick()}
            checked={item.checked}
            type="checkbox"
            className="switch-input"
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

function App() {
  const toggle = (index: number) => {
    setProduct((prev: any) =>
      prev.map((t: any, i: any) =>
        i === index ? { ...t, checked: !t.checked } : t
      )
    );
  };

  const [products, setProduct] = useState([
    {
      name: "Product Name 1",
      image:
        "https://gundamnesia.com/wp-content/uploads/2020/06/c70973fa1ac6f264a52b1bc14631136b.jpg",
      price: 25000,
      checked: false,
    },
    {
      name: "Product Name 2",
      image:
        "https://ae01.alicdn.com/kf/S08bc8a490b2a4d618302942c9845d0d12.jpeg_640x640q90.jpeg",
      price: 30000,
      checked: false,
    },
    {
      name: "Product Name 3",
      image:
        "https://storage.googleapis.com/lcdn-products/3/8/2/3/6/0/382360-large_default.webp",
      price: 35000,
    },
  ]);

  return (
    <div className="flex flex-col items-center">
      <ProductCardContainer>
        {products.map((product, i) => (
          <ProductCard
            handleClick={() => {
              toggle(i);
            }}
            key={i}
            item={product}
          />
        ))}
      </ProductCardContainer>
      <div className="mt-10">
        <p className="font-bold text-3xl">
          Total item on cart: {products.filter((x) => x.checked).length}
        </p>
      </div>
    </div>
  );
}

export default App;
