import { GetProductCategoriesDto, AddProductToCategoryDTO } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// Function to fetch all product categories with associated products
export async function fetchProductCategories(): Promise<
  GetProductCategoriesDto[]
> {
  // Retrieve the authentication token from localStorage
  const authToken = localStorage.getItem("authToken");

  // Check if the token is available
  if (!authToken) {
    // Handle the case where the token is missing or expired
    throw new Error("Authentication token is missing or expired");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/productcategories`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the token in the headers
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
  // Retrieve the authentication token from localStorage
  const authToken = localStorage.getItem("authToken");

  // Check if the token is available
  if (!authToken) {
    // Handle the case where the token is missing or expired
    throw new Error("Authentication token is missing or expired");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/productcategories/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`, // Include the token in the headers
      },
      body: JSON.stringify(request),
    });

    if (response.status === 409) {
      throw new Error("Product is already associated with the category");
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // If the response is successful (status 200), proceed with any necessary handling here.
    // For example, you can return response.json() to access the server's response data.
  } catch (error: any) {
    // Check for network errors (including potential CORS issues)
    if (error.message === "Failed to fetch") {
      // This error message is a common indicator of CORS issues.
      throw new Error(
        "CORS Error: The request was blocked by the same-origin policy."
      );
    } else {
      // Handle other errors or rethrow them if needed.
      throw error;
    }
  }
}
