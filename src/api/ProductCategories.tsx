import { GetProductCategoriesDto, AddProductToCategoryDTO } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// Function to fetch all product categories with associated products
export async function fetchProductCategories(): Promise<
  GetProductCategoriesDto[]
> {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/productcategories`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: GetProductCategoriesDto[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Function to associate a product with a category
export async function addProductToCategoryRequest(
  request: AddProductToCategoryDTO
): Promise<void> {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    throw new Error("Authentication token is missing or expired");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/productcategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(request),
    });

    if (response.status === 409) {
      throw new Error("Product is already associated with the category");
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error: any) {
    if (error.message === "Failed to fetch") {
      throw new Error(
        "CORS Error: The request was blocked by the same-origin policy."
      );
    } else {
      throw error;
    }
  }
}
