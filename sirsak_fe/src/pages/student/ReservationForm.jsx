import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axiosInstance";
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  FileText,
  Send
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const ReservationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState();

  const [formData, setFormData] = useState({
    room: "",
    start: "",
    end: "",
    purpose: "",
    requested_capacity: "",
    status: "PENDING",
  });

  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(true);

  // fetch rooms dari API
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms/");
        setRooms(res.data.results || []); // sesuaikan struktur JSON dari backend
      } catch (err) {
        console.error("Gagal mengambil rooms:", err);
        toast({ title: "Gagal memuat data ruangan", variant: "destructive" });
      } finally {
        setLoadingRooms(false);
      }
    };

    fetchRooms();
  }, []);

  // === HANDLE FORM CHANGE ===
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // === HANDLE SUBMIT ===
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validasi field wajib
    if (!formData.room || !formData.start || !formData.end || !formData.purpose || !formData.requested_capacity) {
      toast({
        title: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await api.post("/reservations/", formData);

      toast({
        title: "Reservasi berhasil diajukan!",
        variant: "success",
      });

      // reset form
      setFormData({
        room: "",
        start: "",
        end: "",
        purpose: "",
        requested_capacity: "",
      });

    } catch (err) {
      console.error("Gagal mengajukan reservasi:", err);
      toast({
        title: "Gagal mengajukan reservasi",
        description: err.response?.data?.detail || "Terjadi kesalahan pada server",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Ajukan Reservasi Ruangan</h1>
        <p className="text-muted-foreground mt-1">Isi formulir untuk mengajukan reservasi ruangan</p>
      </div>

      {/* Available Rooms Section */}
      <Card className="mb-6 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Ruangan Tersedia
          </CardTitle>
          <CardDescription>
            Pilih ruangan yang ingin Anda reservasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loadingRooms ? (
            <p>Memuat daftar ruangan...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rooms.map((room) => (
                <Card 
                  key={room.id} 
                  className={`cursor-pointer border-2 transition-all duration-200 hover:shadow-medium ${
                    formData.room === room.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleInputChange("room", room.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{room.name}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {room.location_name || room.location}
                        </p>
                        <div className="flex items-center mt-2 text-sm">
                          <Users className="h-4 w-4 mr-1 text-primary" />
                          <span>Kapasitas: {room.capacity} orang</span>
                        </div>
                      </div>
                      {formData.room === room.id && (
                        <Badge className="bg-primary">Dipilih</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reservation Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Formulir Reservasi
          </CardTitle>
          <CardDescription>
            Lengkapi informasi detail reservasi ruangan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose">Tujuan Penggunaan *</Label>
                <Input
                  id="purpose"
                  placeholder="Contoh: Praktikum Database"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start DateTime */}
              <div className="space-y-2">
                <Label htmlFor="start">Waktu Mulai *</Label>
                <Input
                  type="datetime-local"
                  id="start"
                  name="start"
                  value={formData.start}
                  onChange={(e) => handleInputChange("start", e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              {/* End DateTime */}
              <div className="space-y-2">
                <Label htmlFor="end">Waktu Selesai *</Label>
                <Input
                  type="datetime-local"
                  id="end"
                  name="end"
                  value={formData.end}
                  onChange={(e) => handleInputChange("end", e.target.value)}
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Participants */}
              <div className="space-y-2">
                <Label htmlFor="participants">Jumlah Peserta*</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="Contoh: 25"
                  value={formData.requested_capacity}
                  onChange={(e) => handleInputChange("requested_capacity", e.target.value)}
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Informasi Penting:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>� Permohonan akan diproses dalam 1-2 hari kerja</li>
                <li>� Pastikan tanggal dan waktu tidak bertabrakan dengan jadwal kuliah</li>
                <li>� Pembatalan harus dilakukan minimal 24 jam sebelum penggunaan</li>
                <li>� Ruangan harus dikembalikan dalam kondisi bersih</li>
              </ul>
            </div>
            <Button type="submit" className="w-full bg-gradient-primary">
              <Send className="h-4 w-4 mr-2" />
              Ajukan Reservasi
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationForm;
