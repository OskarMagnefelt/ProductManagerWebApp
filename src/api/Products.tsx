export const fetchProducts = () => {
  return fetch("https://localhost:8000/products").then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};
