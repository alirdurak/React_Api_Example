import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddCategory from "./pages/AddCategory";
import AddProduct from "./pages/AddProduct";
import CategoryUpdate from "./pages/CategoryUpdate";
import ProductUpdate from "./pages/ProductUpdate";
import { useEffect, useState } from "react";
function App() {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();
  function fetchProducts() {
    fetch("http://localhost:5147/api/Product")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
  function fetchCategories() {
    fetch("http://localhost:5147/api/Category")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            fetchCategories={fetchCategories}
            fetchProducts={fetchProducts}
            products={products}
            categories={categories}
          />
        }
      ></Route>
      <Route
        path="/add-product"
        element={
          <AddProduct fetchProducts={fetchProducts} categories={categories} />
        }
      ></Route>
      <Route
        path="/add-category"
        element={<AddCategory fetchCategories={fetchCategories} />}
      ></Route>
      <Route
        path="/edit/category/:id"
        element={
          <CategoryUpdate
            fetchCategories={fetchCategories}
            categories={categories}
          />
        }
      ></Route>
      <Route
        path="/edit/product/:id"
        element={
          <ProductUpdate
            fetchProducts={fetchProducts}
            products={products}
            categories={categories}
          />
        }
      ></Route>
    </Routes>
  );
}

export default App;
