import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Aksesibilitas from "./components/Aksesibilitas";
import Beranda from "./pages/Beranda";
import Login from "./pages/Login";
import Daftar from "./pages/Daftar";
import Reservasi from "./pages/Reservasi"
import ReservasiList from "./pages/ReservasiList"
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <Aksesibilitas>
              <Beranda />
            </Aksesibilitas>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar/>} />
          <Route path="/reservasi" element={<Reservasi/>} />
          <Route path="/reservasilist" element={<ReservasiList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
