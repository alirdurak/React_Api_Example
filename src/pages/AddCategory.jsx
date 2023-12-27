/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function AddCategory({ fetchCategories }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const data = {
    name: name.toString(),
    isStatus: status,
  };
  const handlePost = async () => {
    await fetch("http://localhost:5147/api/Category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("POST isteği başarıyla tamamlandı. Cevap:", responseData);
      })
      .catch((error) => {
        console.error("POST isteği sırasında hata oluştu:", error);
        alert("Başarıyla Eklendi!");
        navigate("/");
      });
    fetchCategories();
  };

  return (
    <div className="container">
      <Link className="btn btn-secondary" to="/">
        Anasayfaya Dön
      </Link>
      <h2>Kategori Ekleme</h2>
      <div className="form form-control">
        <input
          className="form-control"
          placeholder="Kategori Adı"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="me-2" htmlFor="catStatus">
          Statü
        </label>
        <input
          onChange={() => setStatus(!status)}
          checked={status}
          id="catStatus"
          type="checkbox"
        />
        <br />
        <button onClick={handlePost} className="btn btn-success">
          Kategoriyi Ekle
        </button>
      </div>
    </div>
  );
}

export default AddCategory;
