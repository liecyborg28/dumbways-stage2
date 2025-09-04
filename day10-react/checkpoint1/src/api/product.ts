import { Product, productsDummy } from "../models/product";

/* eslint-disable @typescript-eslint/no-unused-vars */
export async function fetchProducts(keyword: string): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = productsDummy.filter(
        (e) =>
          e.name.toLowerCase().includes(keyword.toLowerCase()) ||
          e.price === parseFloat(keyword)
      );

      console.log(keyword);
      console.log("results: ", results.length > 0);
      resolve(results.length > 0 ? results : null);
    }, 1000);
  });
}
