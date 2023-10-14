import { Product } from "./Interfaces";

const API_BASE_URL = "http://localhost:8000";

// Get all products
export const fetchProducts = () => {
  return fetch(`${API_BASE_URL}/Products`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/Products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Failed to create the product");
  }
  return response.json();
};

// Delete product
export const deleteProductBySKU = async (sku: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/Products/${sku}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error("Failed to delete the product");
  }
};

// Update product
export const updateProductBySKU = async (
  sku: string,
  updateProductRequest: Product
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/products/${sku}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateProductRequest),
  });
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    throw new Error("Failed to update the product");
  }
};
