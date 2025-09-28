import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem("access_token");

    // Kalau kamu simpan info lain, hapus juga
    localStorage.removeItem("isLoggedIn");

    // Redirect ke halaman login
    navigate("/Login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
}

export default Logout;
