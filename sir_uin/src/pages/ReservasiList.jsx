import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import "./Pages.css";

function ReservasiList() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const fetchReservations = async (url = "/reservations/") => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(url);

      setReservations(res.data.results);
      setPagination({
        count: res.data.count,
        next: res.data.next,
        previous: res.data.previous,
      });
    } catch (err) {
      console.error("Gagal mengambil data reservasi:", err);
      setError("Tidak bisa memuat data reservasi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) return <p className="text-center mt-6">Memuat data reservasi...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <main className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-xl font-bold mb-4">Daftar Reservasi Saya</h1>

        {/* Tabel Reservasi */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">Pemohon</th>
                <th className="border border-gray-300 p-2">Ruangan</th>
                <th className="border border-gray-300 p-2">Lokasi</th>
                <th className="border border-gray-300 p-2">Mulai</th>
                <th className="border border-gray-300 p-2">Selesai</th>
                <th className="border border-gray-300 p-2">Tujuan</th>
                <th className="border border-gray-300 p-2">Kapasitas</th>
                <th className="border border-gray-300 p-2">Status</th>
                <th className="border border-gray-300 p-2">Dibuat</th>
                <th className="border border-gray-300 p-2">Diupdate</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map((resv) => (
                  <tr key={resv.id}>
                    <td className="border border-gray-300 p-2 text-center">{resv.id}</td>
                    <td className="border border-gray-300 p-2">{resv.requester_name}</td>
                    <td className="border border-gray-300 p-2">{resv.room_name}</td>
                    <td className="border border-gray-300 p-2">{resv.location_name}</td>
                    <td className="border border-gray-300 p-2">{new Date(resv.start).toLocaleString()}</td>
                    <td className="border border-gray-300 p-2">{new Date(resv.end).toLocaleString()}</td>
                    <td className="border border-gray-300 p-2">{resv.purpose}</td>
                    <td className="border border-gray-300 p-2 text-center">{resv.requested_capacity}</td>
                    <td className="border border-gray-300 p-2 text-center">{resv.status}</td>
                    <td className="border border-gray-300 p-2">{new Date(resv.created_at).toLocaleString()}</td>
                    <td className="border border-gray-300 p-2">{new Date(resv.updated_at).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center p-4 text-gray-500">
                    Belum ada reservasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Navigasi Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => fetchReservations(pagination.previous)}
            disabled={!pagination.previous}
            className={`px-4 py-2 rounded ${
              pagination.previous
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Previous
          </button>
          <p>Total: {pagination.count}</p>
          <button
            onClick={() => fetchReservations(pagination.next)}
            disabled={!pagination.next}
            className={`px-4 py-2 rounded ${
              pagination.next
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}

export default ReservasiList;
