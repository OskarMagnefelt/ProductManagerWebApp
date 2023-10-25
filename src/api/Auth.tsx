import { LoginCredentials } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

export async function login(credentials: LoginCredentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token; // Assuming the server responds with a "token" field

      // Store the authentication token securely (e.g., in local storage)
      localStorage.setItem("authToken", token);

      // Redirect to a protected route or perform other actions
      console.log("Login successful", data);
      return data;
    } else {
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    throw new Error("Network error. Please try again.");
  }
}
