import React, { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/components.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-left">
        <h1>Welcome Back!</h1>
        <p>Enter your credentials to access your dashboard.</p>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="show-pass" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit">Login</button>
          <p className="forgot-password">Forgot Password?</p>
        </form>
      </div>
      <div className="auth-right">
        <img src="data:image/png;base64,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" alt="Login Illustration" />
      </div>
    </div>
  );
}
