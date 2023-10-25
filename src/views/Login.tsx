import React, { useState } from "react";
import { login } from "../api/Auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // Updated error state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const data = await login(credentials); // Use the login function

      // Authentication successful; handle the response
      // Store the authentication token securely (e.g., in local storage)
      // Redirect to a protected route or perform other actions
      //   console.log("Login successful", data);
    } catch (error: any) {
      // Handle errors
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">Username (email)</label>
          <input
            style={{ width: "100px" }}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="password">Password</label>
          <input
            style={{ width: "100px" }}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button style={{ width: "100px" }} type="submit">
          Login
        </button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
};

export default Login;
