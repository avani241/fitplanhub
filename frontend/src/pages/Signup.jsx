import React, { useState } from "react";
import { signupUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "../styles/components.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signupUser(formData);
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="auth-split-container">
      <div className="auth-left">
        <h1>Create Account</h1>
        <p>Join FitPlanHub to track your plans and follow trainers.</p>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className="show-pass" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>
          <button type="submit">Sign Up</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
      <div className="auth-right">
        <img src="https://c8.alamy.com/comp/2HMAM15/sign-in-page-abstract-concept-vector-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account-abstract-metaphor-2HMAM15.jpg" alt="Signup Illustration" />
      </div>
    </div>
  );
}
