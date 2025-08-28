export class CreateProductModel {
  name: string;
  category: string;
  image: string;
  price: number;
  qty: number;
}

export class GetProductsModel {
  sortBy?: string;
  order?: string;
  minPrice?: number;
  maxPrice?: number;
  limit?: number;
  offset?: number;
}

export class UpdateProductModel {
  id: string;
  data: ProductDataModel;
}

export class ProductDataModel {
  name?: string;
  category?: string;
  price?: string;
  qty?: string;
}

export class DeleteProductModel {
  id: string;
}
