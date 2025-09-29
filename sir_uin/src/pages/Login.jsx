import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosAuth, setTokens } from "../services/api.js"; // perhatikan path
import "./Pages.css";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload dikirim:", form);

      if (data.token) {
        setTokens(data.token, data.refresh_token);
      }

      // redirect ke beranda
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login gagal. Periksa username/password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-80"
      >
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleLogin}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleLogin}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center">
          Belum punya akun?{" "}
          <Link to="/Daftar" className="text-blue-600 hover:underline">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
