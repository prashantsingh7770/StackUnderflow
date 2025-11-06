// AuthPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { API_BASE } from "@/api";

export default function AuthPage() {
  const { login , isAuthenticated } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
  });

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

 
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  // handle change
  const handleChange=(e)=>{    
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      const res = await fetch(`${API_BASE}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.status === 200) {
        login(data.token);
        setError("");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "customer",
        })
      } else if (res.status === 401) {
        setError("Incorrect password. Try again.");
      } else if (res.status === 404) {
        setError("No account found with this email.");
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password,confirmPassword, role }=form;
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.status === 201) {
        setSuccess("Account created successfully!");
        setError("");
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "customer",
        })
        setTimeout(() => setIsLogin(true), 1000);
      } else if (data.status === "EMAIL_ALREADY_REGISTERED") {
        setError("Email is already registered.");
      } else {
        setError("Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    }
  };

  return (
   <>
   <div
  className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat font-[Inter]"
  style={{
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.1)), url('https://img.freepik.com/premium-photo/group-friends-shopping-mall_53876-84355.jpg?semt=ais_hybrid&w=740&q=80')",
  }}
>
  <div className="bg-white/80 backdrop-blur-xl border border-teal-200 shadow-2xl rounded-3xl p-10 w-[400px] transition-all duration-500 hover:scale-105">
    <h1 className="text-3xl font-extrabold text-center mb-2 text-teal-700">
      {isLogin ? "Welcome Back 👋" : "Join Us 🛍️"}
    </h1>
    <p className="text-gray-600 text-center mb-8 text-sm tracking-wide">
      {isLogin
        ? "Login to continue shopping your favorites"
        : "Create an account and start shopping today"}
    </p>

    <form
      onSubmit={isLogin ? handleLogin : handleSignup}
      className="flex flex-col space-y-2"
    >
      {!isLogin && (
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="h-12 border border-gray-300 rounded-xl px-5 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition duration-300"
        />
      )}
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
        placeholder="Email"
        className="h-12 border border-gray-300 rounded-xl px-5 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition duration-300"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
        placeholder="Password"
        className="h-12 border border-gray-300 rounded-xl px-5 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition duration-300"
      />
      {!isLogin && (
        <>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm Password"
            className="h-12 border border-gray-300 rounded-xl px-5 placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition duration-300"
          />
          <select
            value={form.role}
            name="role"
            onChange={handleChange}
            className="h-12 border border-gray-300 rounded-xl px-5 bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition duration-300"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      {success && <p className="text-green-600 text-sm text-center">{success}</p>}

      <button
        type="submit"
        className="h-12 bg-gradient-to-r from-teal-500 to-lime-400 hover:from-teal-400 hover:to-lime-300 text-white font-semibold rounded-xl transition duration-300 shadow-md hover:shadow-lg"
      >
        {isLogin ? "Log In" : "Sign Up"}
      </button>
    </form>

    <p className="text-center text-gray-600 text-sm mt-6">
      {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
      <span
        className="text-teal-600 hover:text-teal-800 font-medium hover:underline cursor-pointer"
        onClick={() => {
          setIsLogin(!isLogin);
          setError("");
          setSuccess("");
        }}
      >
        {isLogin ? "Sign up" : "Log in"}
      </span>
    </p>
  </div>
</div>

   
   </>
  );
}
