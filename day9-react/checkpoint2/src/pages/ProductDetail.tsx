import { useParams } from "react-router-dom";

function ProductDetail() {
  const { productId } = useParams();

  return (
    <div className="mt-30">
      <span className="font-bold text-3xl">Product Detail: {productId}</span>
    </div>
  );
}

export default ProductDetail;
