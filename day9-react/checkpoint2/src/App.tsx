/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/button";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";

function Navbar() {
  return (
    <div className="w-full flex gap-4 p-4 justify-center border-b mb-8 fixed bg-slate-900">
      <Button asChild variant="outline">
        <Link to="/">Home</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/products">Products</Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/cart">Cart</Link>
      </Button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}>
          <Route path=":productId" element={<ProductDetail />}></Route>
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
