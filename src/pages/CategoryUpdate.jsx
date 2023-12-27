/* eslint-disable react/prop-types */
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
function CategoryUpdate({ categories, fetchCategories }) {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const { id } = useParams();
  const cat = categories.find((i) => i.id == id);
  useEffect(() => {
    setName(cat.name);
    setStatus(cat.isStatus);
  }, [cat]);
  const data = {
    name: name,
    isStatus: status,
  };
  const handleUpdate = async () => {
    await fetch("http://localhost:5147/api/Category/" + cat.id, {
      method: "PUT",
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
        alert("Başarıyla Güncellendi!");
        navigate("/");
      });
    fetchCategories();
  };

  return (
    <div className="container">
      <Link className="btn btn-secondary" to="/">
        Anasayfaya Dön
      </Link>
      <div className="card">
        <h2>Kategori güncelle</h2>
        <hr />
        <label htmlFor="name">Kategori Adı</label>
        <input
          className="form-control"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="status">Aktiflik durumu</label>
        <input
          className="checkbox"
          type="checkbox"
          checked={status}
          onChange={() => setStatus(!status)}
        />
        <button onClick={handleUpdate} className="btn btn-info">
          Güncelle
        </button>
      </div>
    </div>
  );
}

export default CategoryUpdate;
