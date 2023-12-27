/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function ProductUpdate({ products, categories, fetchProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [catId, setCatId] = useState();
  const [status, setStatus] = useState(false);
  const prod = products.find((i) => i.id == id);
  useEffect(() => {
    setName(prod.name);
    setPrice(prod.price);
    setStock(prod.stock);
    setCatId(prod.categoryId);
    setStatus(prod.isStatus);
  }, [prod]);
  const handleUpdate = async () => {
    const data = {
      name: name.toString(),
      isStatus: status,
      price: Number(price),
      stock: Number(stock),
      categoryId: Number(catId),
    };
    try {
      const response = await fetch(
        "http://localhost:5147/api/Product/" + prod.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // data değişkeni buradan gelmeli
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = response.json();
      alert("Güncelleme Başarılı");
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
      <div className="form form-control">
        <h2>Ürün Güncelle</h2>
        <label htmlFor="name"> Ürün Adı</label>
        <input
          id="name"
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          placeholder="Ürün Adı"
          type="text"
          value={name}
        />
        <label htmlFor="price">Ürün Fiyatı</label>
        <input
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          placeholder="Ürün Fiyatı"
          type="number"
          value={price}
        />
        <label htmlFor="stock">Stok</label>
        <input
          id="stock"
          onChange={(e) => setStock(e.target.value)}
          className="form-control"
          placeholder="Ürün Stoğu"
          type="number"
          value={stock}
        />
        <label htmlFor="cat">Kategori</label>
        <select
          className="form-control select"
          value={catId}
          onChange={(e) => setCatId(e.target.value)}
          name=""
          id="cat"
        >
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
        <br />
        <button onClick={handleUpdate} className="btn btn-info mt-2">
          Ürün Güncelle
        </button>
      </div>
    </div>
  );
}

export default ProductUpdate;
