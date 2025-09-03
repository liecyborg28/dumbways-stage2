/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/product";
import { useDebounce } from "../hooks/debounce";
import { Product, productsDummy } from "../models/product";
import { Switch } from "@radix-ui/react-switch";
import { Link, Outlet } from "react-router-dom";

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
        <div className="flex items-center space-x-2">
          <Switch />
        </div>
        {/* <Switch checked={item.checked} onCheckedChange={handleClick} /> */}
      </div>
    </div>
  );
}

function Products() {
  const toggle = (index: number) => {
    setProduct((prev: any) =>
      prev.map((t: any, i: any) =>
        i === index ? { ...t, checked: !t.checked } : t
      )
    );
  };

  const [keyword, setKeyword] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const [products, setProduct] = useState(productsDummy);

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

  return (
    <div className="flex flex-col items-center pt-30">
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
              <Link to={(i + 1).toString()}>
                <ProductCard
                  handleClick={() => {
                    toggle(i);
                  }}
                  key={i}
                  item={product}
                />
              </Link>
            ))}
          </ProductCardContainer>
          <Outlet />
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

export default Products;
