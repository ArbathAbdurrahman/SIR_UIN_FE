import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Search,
  MessageSquare,
  FileText,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const recentReservations = [
    {
      id: 1,
      room: "Lab Komputer 1",
      date: "2024-01-15",
      time: "09:00 - 11:00",
      status: "approved" as const,
      purpose: "Praktikum Database"
    },
    {
      id: 2,
      room: "Ruang Seminar A",
      date: "2024-01-18", 
      time: "13:00 - 15:00",
      status: "pending" as const,
      purpose: "Presentasi Tugas Akhir"
    }
  ];

  const upcomingSchedule = [
    {
      id: 1,
      type: "kuliah",
      title: "Algoritma dan Struktur Data",
      room: "Ruang 301",
      time: "08:00 - 10:00",
      date: "Hari ini"
    },
    {
      id: 2,
      type: "reservasi",
      title: "Praktikum Database",
      room: "Lab Komputer 1", 
      time: "09:00 - 11:00",
      date: "Besok"
    }
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary-light/20 animate-pulse-glow"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex justify-between items-center">
            <div className="animate-slide-up">
              <h1 className="text-2xl font-bold">Dashboard Mahasiswa</h1>
              <p className="opacity-90">Selamat datang kembali, Ahmad Rizki</p>
            </div>
            <div className="flex items-center space-x-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Bell className="h-4 w-4 mr-2 animate-bounce-gentle" />
                Notifikasi
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <Button 
            onClick={() => navigate("/student/search")}
            className="h-20 bg-gradient-card border border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 group"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <Search className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">Cari Ruangan</span>
            </div>
          </Button>
          
          <Button 
            onClick={() => navigate("/student/reserve")}
            className="h-20 bg-gradient-card border border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 group button-glow"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <Plus className="h-6 w-6 mb-2 text-primary group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" />
              <span className="text-sm font-medium">Ajukan Reservasi</span>
            </div>
          </Button>
          
          <Button 
            onClick={() => navigate("/student/status")}
            className="h-20 bg-gradient-card border border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 group"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <FileText className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">Status Reservasi</span>
            </div>
          </Button>
          
          <Button 
            onClick={() => navigate("/student/feedback")}
            className="h-20 bg-gradient-card border border-border hover:shadow-large hover:-translate-y-1 transition-all duration-300 group"
            variant="outline"
          >
            <div className="flex flex-col items-center">
              <MessageSquare className="h-6 w-6 mb-2 text-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-sm font-medium">Feedback</span>
            </div>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          {/* Recent Reservations */}
          <Card className="lg:col-span-2 shadow-soft hover:shadow-large transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Reservasi Terbaru
              </CardTitle>
              <CardDescription>
                Status reservasi ruangan Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReservations.map((reservation, index) => (
                  <div key={reservation.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-gradient-card hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                    <div className="flex-1">
                      <h4 className="font-medium">{reservation.room}</h4>
                      <p className="text-sm text-muted-foreground">{reservation.purpose}</p>
                      <div className="flex items-center mt-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {reservation.date}
                        <Clock className="h-4 w-4 ml-3 mr-1" />
                        {reservation.time}
                      </div>
                    </div>
                    <StatusBadge status={reservation.status} />
                  </div>
                ))}
                
                {recentReservations.length === 0 && (
                  <div className="text-center py-8 animate-fade-in">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4 animate-bounce-gentle" />
                    <p className="text-muted-foreground">Belum ada reservasi</p>
                    <Button 
                      onClick={() => navigate("/student/reserve")}
                      className="mt-4 hover:scale-105 transition-transform duration-200"
                      size="sm"
                    >
                      Buat Reservasi Pertama
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card className="shadow-soft hover:shadow-large transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                Jadwal Mendatang
              </CardTitle>
              <CardDescription>
                Kuliah dan reservasi Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingSchedule.map((schedule, index) => (
                  <div key={schedule.id} className="p-3 border border-border rounded-lg bg-gradient-card hover:shadow-medium transition-all duration-300 hover:-translate-y-0.5 animate-fade-in group" style={{ animationDelay: `${0.1 * index}s` }}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm group-hover:text-primary transition-colors duration-200">{schedule.title}</h5>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          <MapPin className="h-3 w-3 mr-1" />
                          {schedule.room}
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                          <Clock className="h-3 w-3 mr-1 group-hover:animate-bounce-gentle" />
                          {schedule.time}
                        </div>
                      </div>
                      <Badge 
                        variant={schedule.type === "kuliah" ? "secondary" : "default"}
                        className="text-xs"
                      >
                        {schedule.type === "kuliah" ? "Kuliah" : "Reservasi"}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs text-primary font-medium">{schedule.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <Card className="shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">Total Reservasi</p>
                  <p className="text-2xl font-bold text-primary group-hover:scale-105 transition-transform duration-200">24</p>
                </div>
                <Calendar className="h-8 w-8 text-primary group-hover:animate-bounce-gentle" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">Pending Approval</p>
                  <p className="text-2xl font-bold text-warning group-hover:scale-105 transition-transform duration-200">3</p>
                </div>
                <Clock className="h-8 w-8 text-warning group-hover:animate-bounce-gentle" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft hover:shadow-large transition-all duration-300 hover:-translate-y-1 group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-200">Disetujui Bulan Ini</p>
                  <p className="text-2xl font-bold text-success group-hover:scale-105 transition-transform duration-200">18</p>
                </div>
                <FileText className="h-8 w-8 text-success group-hover:animate-bounce-gentle" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;