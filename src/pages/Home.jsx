/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function Home({ products, categories, fetchCategories, fetchProducts }) {
  const Delete = async (path, id) => {
    try {
      await fetch(`http://localhost:5147/api/${path}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("DELETE isteği başarıyla tamamlandı.");
      alert("Başarıyla Silindi!");

      // fetchCategories fonksiyonu içindeki kodun bağlamı bilinmediği için, onun çalıştığından emin olun.
      fetchCategories();
      fetchProducts();
    } catch (error) {
      console.error("DELETE isteği sırasında hata oluştu:", error);
      alert("Silme işlemi sırasında bir hata oluştu!");
    }
  };

  return (
    <div className="container-fluid d-flex">
      <div className="container-fluid">
        <h2>Kategoriler</h2>
        <Link className="btn btn-secondary" to="/add-category">
          Kategori Ekle
        </Link>
        <div className="row mb-5">
          {categories &&
            categories.map((i) => (
              <div key={i.id} className="col">
                <div className="card">
                  <div className="card-header">{i.name}</div>
                  <div className="card-body">
                    {i.isStatus ? "Active" : "Passive"}
                  </div>
                  <div className="card-footer">
                    <button
                      onClick={() => Delete("Category", i.id)}
                      className=" btn btn-danger"
                    >
                      {" "}
                      Sil
                    </button>
                    <Link
                      to={`/edit/category/${i.id}`}
                      className="btn btn-info"
                    >
                      Güncelle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <h2>Ürünler</h2>
        <Link className="btn btn-secondary" to="/add-product">
          Ürün Ekle
        </Link>
        <div className="row">
          {products &&
            products.map((i) => (
              <div key={i.id} className="col">
                <div className="card">
                  <div className="card-header">{i.name}</div>
                  <div className="card-body">
                    <span>Fiyat: {i.price}</span>
                    <br />
                    <span>Stok: {i.stock}</span>
                    <br />
                    <span>Durum: {i.isStatus ? "Active" : "Passive"}</span>
                  </div>
                  <div className="card-footer">
                    Kategori ID: {i.categoryId} <br />
                    <button
                      onClick={() => Delete("Product", i.id)}
                      className="btn btn-danger"
                    >
                      Sil
                    </button>
                    <Link className="btn btn-info" to={`/edit/product/${i.id}`}>
                      Güncelle
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
}

export default Home;
