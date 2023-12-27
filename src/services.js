export function fetchProducts() {
  fetch("http://localhost:5147/api/Product")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
export function fetchCategories() {
  fetch("http://localhost:5147/api/Category")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
}
