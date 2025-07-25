"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/auth.css";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path
                d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="8.5"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="20"
                y1="8"
                x2="20"
                y2="14"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="23"
                y1="11"
                x2="17"
                y2="11"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <h1 className="auth-title">Join TechHub</h1>
          <p className="auth-subtitle">Create your account to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="input-container">
              <svg
                className="input-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  ry="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="12"
                  cy="16"
                  r="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 11V7a5 5 0 0 1 10 0v4"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          {error && (
            <div className="auth-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="15"
                  y1="9"
                  x2="9"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <line
                  x1="9"
                  y1="9"
                  x2="15"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary auth-submit">
            <span>Create Account</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
              />
              <polyline
                points="12,5 19,12 12,19"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <a href="/login" className="auth-link">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
