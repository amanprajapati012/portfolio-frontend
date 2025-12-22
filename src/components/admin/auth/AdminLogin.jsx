"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import API_BASE_URL from "@/config/api";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        { email, password }
      );

      if (res.data?.token) {
        // Save JWT token to localStorage
        localStorage.setItem("adminToken", res.data.token);

        // Redirect to admin dashboard
        router.push("/main/admin/dashboard");
      } else {
        alert(res.data?.message || "Login failed");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500">
      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>

        <label className="block mb-2 font-semibold">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          className="w-full mb-4 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-semibold">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          className="w-full mb-6 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 hover:scale-105 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
