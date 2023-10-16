import { Product } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// Get all products
export const getProducts = () => {
  return fetch(`${API_BASE_URL}/Products`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

// Add a new product
export const addProduct = async (product: Product): Promise<Product> => {
  try {
    const response = await fetch(`${API_BASE_URL}/Products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      // Handle non-2xx HTTP response statuses
      throw new Error("Failed to create the product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors, e.g., display an error message or log the error
    console.error("Error:", error);
    // You can also re-throw the error if needed
    throw error;
  }
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

// Search for products by SKU
// export const searchProductsBySKU = async (sku: string): Promise<Product> => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/Products?sku=${sku}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     console.log("From API file");
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error;
//   }
// };

export const searchProductBySKU = async (
  sku: string
): Promise<Product | null> => {
  const response = await fetch(`${API_BASE_URL}/Products?sku=${sku}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  if (Array.isArray(data) && data.length > 0) {
    return data[0]; // Return the first (and presumably only) result
  } else {
    return null; // Return null if no results were found
  }
};
