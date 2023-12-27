import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

/* eslint-disable react/prop-types */
function AddProduct({ categories, fetchProducts }) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [catId, setCatId] = useState();
  const [status, setStatus] = useState(false);

  const handlePost = async () => {
    const data = {
      name: name.toString(),
      isStatus: status,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(catId),
    };
    try {
      const response = await fetch("http://localhost:5147/api/Product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // data değişkeni buradan gelmeli
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = response.json();
      alert("Ekleme Başarılı");
      navigate("/");
      console.log("POST isteği başarıyla tamamlandı. Cevap:", responseData);
    } catch (error) {
      console.error("POST isteği sırasında hata oluştu:", error);
    }
    fetchProducts();
  };

  return (
    <div className="container">
      <Link className="btn btn-secondary" to="/">
        Anasayfaya Dön
      </Link>
      <h2>Ürün Ekleme</h2>
      <div className="form form-control">
        <input
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Ürün Adı"
          type="text"
        />
        <input
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          placeholder="Ürün Fiyatı"
          type="number"
        />
        <input
          onChange={(e) => setStock(e.target.value)}
          className="form-control"
          placeholder="Ürün Stoğu"
          type="number"
        />
        <select onChange={(e) => setCatId(e.target.value)} name="" id="">
          {categories &&
            categories.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
        </select>

        <label className="me-2" htmlFor="proStatus">
          Statü
        </label>
        <input
          checked={status}
          onChange={() => setStatus(!status)}
          id="proStatus"
          type="checkbox"
        />
        <button onClick={handlePost} className="btn btn-secondary">
          Ürün ekle
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
