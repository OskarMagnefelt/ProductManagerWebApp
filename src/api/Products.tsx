import { Product } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// Get all products
export const getProducts = () => {
  // Retrieve the authentication token from localStorage
  const authToken = localStorage.getItem("authToken");

  // Check if the token is available
  if (!authToken) {
    // Handle the case where the token is missing or expired
    throw new Error("Authentication token is missing or expired");
  }

  return fetch(`${API_BASE_URL}/Products`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/Products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Failed to create the product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

// Delete product
export const deleteProductBySKU = async (sku: string): Promise<void> => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  const response = await fetch(`${API_BASE_URL}/Products/${sku}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
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
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  const response = await fetch(`${API_BASE_URL}/products/${sku}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
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

// Search products by sku
export const searchProductsBySKU = async (sku: string): Promise<Product[]> => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  const response = await fetch(
    `${API_BASE_URL}/Products?sku=${sku.toLowerCase()}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
