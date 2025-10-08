import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import api from "@/lib/axiosInstance";
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  MessageSquare,
  FileText
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [recentReservations, setRecentReservations] = useState([]);
  const [upcomingSchedule, setUpcomingSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // axiosInstance sudah punya baseURL dan Authorization interceptor
        const res = await api.get("/reservations/");

        // axios otomatis parse JSON, pakai res.data
        const data = res.data;
        const reservations = data.results || [];

        const today = new Date().toISOString().split("T")[0];

        // Ambil 3 reservasi ke depan
        const soon = reservations.filter(r => r.start >= today);
        setRecentReservations(soon.slice(0, 3));

        // Ambil 3 reservasi sebelumnya (atau hari ini)
        const upcoming = reservations.filter(r => r.start <= today);
        setUpcomingSchedule(upcoming.slice(0, 3));

      } catch (err) {
        console.error("Gagal fetch data dashboard:", err);

        // Tampilkan error ke UI kalau mau
        setRecentReservations([]);
        setUpcomingSchedule([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="p-6">Loading data...</div>;
  }

  return (
    <div className="p-6 animate-fade-in">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard User</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang kembali, {localStorage.getItem("username")}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <Button onClick={() => navigate(`/${role}/search`)} className="h-20" variant="outline">
          <div className="flex flex-col items-center">
            <Search className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm font-medium">Cari Ruangan</span>
          </div>
        </Button>

        <Button onClick={() => navigate(`/${role}/reserve`)} className="h-20" variant="outline">
          <div className="flex flex-col items-center">
            <Plus className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm font-medium">Ajukan Reservasi</span>
          </div>
        </Button>

        <Button onClick={() => navigate(`/${role}/status`)} className="h-20" variant="outline">
          <div className="flex flex-col items-center">
            <FileText className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm font-medium">Status Reservasi</span>
          </div>
        </Button>

        <Button onClick={() => navigate(`/${role}/feedback`)} className="h-20" variant="outline">
          <div className="flex flex-col items-center">
            <MessageSquare className="h-6 w-6 mb-2 text-primary" />
            <span className="text-sm font-medium">Feedback</span>
          </div>
        </Button>
      </div>

      {/* Recent Reservations */}
      <Card className="lg:col-span-2 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Reservasi Terbaru
          </CardTitle>
          <CardDescription>Status reservasi ruangan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReservations.length > 0 ? (
              recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{reservation.room_name} - {reservation.location_name}</h4>
                    <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
                    <div className="flex items-center mt-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {reservation.start.split("T")[0]}
                      <Clock className="h-4 w-4 ml-3 mr-1" />
                      {reservation.start.split("T")[1].slice(0,5)} - {reservation.end.split("T")[1].slice(0,5)}
                    </div>
                  </div>
                  <StatusBadge status={reservation.status.toLowerCase()} />
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Belum ada reservasi</p>
                <Button onClick={() => navigate("/student/reserve")} className="mt-4" size="sm">
                  Buat Reservasi Pertama
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Schedule */}
      <Card className="mt-6 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Reservasi Lalu
          </CardTitle>
          <CardDescription>Kuliah dan reservasi Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSchedule.map((schedule) => (
              <div key={schedule.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{schedule.purpose}</h5>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {schedule.room_name} - {schedule.location_name}
                    </div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {schedule.start.split("T")[1].slice(0,5)} - {schedule.end.split("T")[1].slice(0,5)}
                    </div>
                  </div>
                  <StatusBadge status={schedule.status.toLowerCase()} />
                </div>
                <div className="mt-2">
                  <span className="text-xs text-primary font-medium">{schedule.start.split("T")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
