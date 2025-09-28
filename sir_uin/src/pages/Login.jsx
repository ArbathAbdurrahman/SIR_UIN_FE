import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Pages.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload dikirim:", form);
      const response = await fetch("https://sirsakapi.teknohole.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.token) {
        localStorage.setItem("access_token", data.token);
        navigate("/");
      } else {
        alert(data.message || "Login gagal. Periksa username/password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
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
          type="email"
          name="email"
          placeholder="Email"
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
