import "./Pages.css";
import { useNavigate, Link } from "react-router-dom";

function Beranda() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/Login");
  };

  return (
    <main className="min-w-screen flex flex-col items-center bg-blue-400 left-0 top-0">
      <div className = "max-w-4xl p-6 text-center bg-transparent py-12 top-0">
        <p className = "text-5xl font-bold text-white my-6">Sistem Informasi Ruangan</p>
        <p className = "text-[20px] text-white my-6">Platform terintegrasi untuk manajemen ruangan akademik dengan sistem reservasi yang efisien dan mudah digunakan</p>
        <p className="my-6">Ini Penjelasan Fitur</p>
        <button onClick={handleLogout} className="bg-red-500 rounded font-bold text-[18px] text-white py-[5px] px-[10px] hover:bg-red-700 text-[#f5f5f5] transition">Logout</button>
      </div>
      <div className = "min-w-screen p-6 text-center bg-white py-12 top-0">
        <p className="my-6">Ini Fitur</p>
        <div className="max-w-[700px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/reservasi" replace>
            <button className="bg-[#4895EF] rounded font-bold text-[18px] text-white py-[5px] px-[10px] hover:bg-[#4361EE] text-[#f5f5f5] transition">Buat Reservasi</button>
          </Link>
          <Link to="/reservasilist" replace>
            <button className="bg-[#4895EF] rounded font-bold text-[18px] text-white py-[5px] px-[10px] hover:bg-[#4361EE] text-[#f5f5f5] transition">All Reservasi</button>
          </Link>
        </div>
      </div>
      <div className = "min-w-screen p-6 text-center bg-[#f5f5f5] py-12 top-0">
        <p>Ini Footer</p>
      </div>
    </main>
  );
}

export default Beranda;
