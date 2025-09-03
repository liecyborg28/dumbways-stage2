/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react'

import { useEffect, useState } from "react";
import { Product, productsDummy } from "./models/product";
import { useDebounce } from "./hooks/dobounce";
import { fetchProducts } from "./api/product";

function ProductCardContainer({ children }: any) {
  return <div className="product-card-container">{children}</div>;
}

function ProductCard({
  item,
}: // handleClick
any) {
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
      {/* <div className="flex ">
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
      </div> */}
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

  const [products, setProduct] = useState(productsDummy);

  const [keyword, setKeyword] = useState("");

  const [productData, setProductData] = useState<Product[] | null>(null);

  const [loading, setLoading] = useState(false);

  const debounceKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debounceKeyword) {
      setLoading(true);
      fetchProducts(debounceKeyword)
        .then((data) => setProductData(data ? data : null))
        .finally(() => setLoading(false));
    } else {
      setProductData(null);
      setLoading(false);
    }
  }, [debounceKeyword]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="mt-10 bg-slate-50 w-96 border-2 border-slate-400 rounded"
        type="text"
        placeholder="Search keyword..."
        name="keyword"
        id="keyword"
        onChange={handleOnChange}
      />
      {loading && (
        <>
          <p className="mt-10">Loading ...</p>
        </>
      )}

      {productData && !loading && (
        <>
          <ProductCardContainer>
            {productData.map((product, i) => (
              <ProductCard
                handleClick={() => {
                  toggle(i);
                }}
                key={i}
                item={product}
              />
            ))}
          </ProductCardContainer>
          {/* <div className="mt-10">
            <p className="font-bold text-3xl">
              Total item on cart: {productData.filter((x) => x.checked).length}
            </p>
          </div> */}
        </>
      )}

      {productData === null && !loading && (
        <>
          <h2 className="mt-10">Product Not Found!</h2>
        </>
      )}
    </div>
  );
}

export default App;
