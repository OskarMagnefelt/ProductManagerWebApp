import { LoginCredentials } from "./Interfaces";

const API_BASE_URL = "https://localhost:8000";

// api/auth.js (or any other relevant file in your "api" folder)
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
      // Authentication successful; handle the response
      const data = await response.json();
      // Store the authentication token securely (e.g., in local storage)
      // Redirect to a protected route or perform other actions
      console.log("Login successful", data);
      return data;
    } else {
      // Authentication failed; handle errors
      throw new Error("Invalid username or password");
    }
  } catch (error) {
    // Handle network or other errors
    throw new Error("Network error. Please try again.");
  }
}
