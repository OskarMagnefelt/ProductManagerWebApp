import { Category, CategoryName } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// Function to fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Category[] = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Function to fetch a category by ID
export async function fetchCategoryById(id: number): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (response.status === 404) {
      return null;
    }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: Category = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Function to add a new category
export async function addCategory(
  request: CategoryName
): Promise<Category | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (response.status === 400) {
      return null;
    }

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data: Category = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
