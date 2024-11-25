import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import "../index.css"; // Ensure you add custom styles here or use inline styles.
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Control loading state
  const [error, setError] = useState();

  // Clear email and password on component mount
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  async function login() {
    console.log("Email:", email, "Password:", password); // Debugging
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    const user = { email, password };

    try {
      setLoading(true);
      const result = (await axios.post("https://quickstay-cloudproject.onrender.com/api/users/login", user)).data;
      setLoading(false);
      toast.success("Login successful!");

      // Save user info and navigate to home after a short delay
      localStorage.setItem("currentUser", JSON.stringify(result));
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000); // 2 seconds delay for toast visibility
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      toast.error("Invalid email or password.");
    }
  }

  return (
    <div>
      {loading && <Loading />}
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="login-container">
        <div className="form-card">
          {error && <Error message="Invalid Credentials" />}
          <h2 className="text-center mb-4">Login to Your Account</h2>
          <form autoComplete="off"> {/* Disable autofill */}
            {/* Email */}
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Password */}
            <div className="form-group mb-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
            </div>

            {/* Submit Button */}
            <button
              type="button"
              className="btn btn-primary w-100"
              onClick={login}
            >
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
