import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // pastikan path sesuai
import "./Pages.css";

function Reservasi() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    room: "",
    start: "",
    end: "",
    purpose: "",
    requested_capacity: "",
    status: "PENDING",
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axiosInstance.get("/rooms/");
        console.log(res.data.results)
        setRooms(res.data.results);
      } catch (err) {
        console.error("Gagal mengambil data ruangan:", err);
      }
    };
    fetchRooms();
  }, []);

  // Handle perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit form ke API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Payload sesuai JSON yang kamu kasih
      const payload = {
        room: parseInt(form.room, 10),
        start: form.start,
        end: form.end,
        purpose: form.purpose,
        requested_capacity: parseInt(form.requested_capacity, 10),
        status: form.status,
      };

      const res = await axiosInstance.post("/reservations/", payload);
      console.log(res.data);

      alert("Reservasi berhasil dibuat!");
      console.log("Response:", res.data);
    } catch (err) {
      console.error("Gagal membuat reservasi:", err);
      alert("Terjadi kesalahan saat membuat reservasi.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-xl font-bold mb-4">Form Reservasi Ruangan</h1>

        {/* Pilih Ruangan */}
        <label className="block mb-2">Pilih Ruangan</label>
        <select
          name="room"
          value={form.room}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        >
          <option value="">-- Pilih Ruangan --</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        {/* Waktu Mulai */}
        <label className="block mb-2">Waktu Mulai</label>
        <input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Waktu Selesai */}
        <label className="block mb-2">Waktu Selesai</label>
        <input
          type="datetime-local"
          name="end"
          value={form.end}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Tujuan */}
        <label className="block mb-2">Tujuan</label>
        <input
          type="text"
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
          placeholder="Contoh: Rapat, Kuliah, Seminar"
          className="w-full p-2 mb-3 border rounded"
          required
        />

        {/* Kapasitas */}
        <label className="block mb-2">Kapasitas</label>
        <input
          type="number"
          name="requested_capacity"
          value={form.requested_capacity}
          onChange={handleChange}
          placeholder="Jumlah orang"
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Ajukan Reservasi
        </button>
      </form>
    </main>
  );
}

export default Reservasi;
