const API_BASE_URL = "https://localhost:8000";

// Function to fetch all product categories with associated products
export async function fetchProductCategories(): Promise<
  GetProductCategoriesDto[]
> {
  try {
    const response = await fetch(`${API_BASE_URL}/productcategories`);
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
export async function addProductToCategory(
  request: AddProductToCategoryDTO
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/productcategories/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    throw new Error(error.message);
  }
}
