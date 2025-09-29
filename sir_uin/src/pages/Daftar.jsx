import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Pages.css";

function Daftar() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
  });

  const navigate = useNavigate();

  const handleDaftar = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload dikirim:", form);

      const response = await fetch("https://sirsakapi.teknohole.com/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include", 
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (data.success) {
        // localStorage.setItem("refresh_token", data.token);
        navigate("/login");
      } else {
        alert(data.message || "Pendaftaran gagal. Periksa data yang kamu masukkan.");
      }
    } catch (error) {
      console.error("Error during register:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-xl font-bold mb-4">Daftar Akun</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="text"
          name="first_name"
          placeholder="Nama Depan"
          value={form.first_name}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="text"
          name="last_name"
          placeholder="Nama Belakang"
          value={form.last_name}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password1"
          placeholder="Password"
          value={form.password1}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <input
          type="password"
          name="password2"
          placeholder="Konfirmasi Password"
          value={form.password2}
          onChange={handleDaftar}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Daftar
        </button>

        <p className="mt-4 text-sm text-center">
          Sudah punya akun?{" "}
          <Link to="/Login" className="text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Daftar;
