import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="bg-[#f5f5f5] top-0 left-0 w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-blue-600">SIRSAK</h1>
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link className="hover:text-blue-600 transition" to="/">Beranda</Link>
          <Link className="hover:text-blue-600 transition" to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;