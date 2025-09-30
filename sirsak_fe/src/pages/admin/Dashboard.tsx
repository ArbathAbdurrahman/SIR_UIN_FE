import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar,
  FileText,
  Users,
  MapPin,
  TrendingUp,
  Star,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Settings,
  ArrowRight,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock statistics data
  const [stats] = useState({
    totalRooms: 28,
    totalReservations: 156,
    pendingApprovals: 8,
    activeReservations: 12,
    monthlyUsage: 89.2,
    averageRating: 4.7,
    feedbackCount: 234
  });

  // Mock recent feedback
  const [recentFeedback] = useState([
    {
      id: 1,
      room: "Lab Komputer 1",
      user: "Ahmad Rizki",
      rating: 5,
      comment: "Fasilitas sangat baik dan lengkap",
      date: "2024-01-19"
    },
    {
      id: 2,
      room: "Ruang Seminar A",
      user: "Siti Nurhaliza", 
      rating: 4,
      comment: "Sound system perlu diperbaiki",
      date: "2024-01-19"
    },
    {
      id: 3,
      room: "Lab Multimedia",
      user: "Budi Santoso",
      rating: 5,
      comment: "Software editing lengkap dan update",
      date: "2024-01-18"
    }
  ]);

  // Mock room usage data
  const [topRooms] = useState([
    { room: "Lab Komputer 1", usage: "85%", reservations: 42 },
    { room: "Ruang Seminar A", usage: "73%", reservations: 35 },
    { room: "Lab Multimedia", usage: "68%", reservations: 29 },
    { room: "Ruang Kelas 301", usage: "61%", reservations: 26 },
    { room: "Lab Komputer 2", usage: "55%", reservations: 22 }
  ]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-warning fill-warning' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="p-6 animate-fade-in">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">Selamat datang, Admin Sistem Ruangan</p>
      </div>
      
      <div className="space-y-8">
        {/* Main Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Ruangan</p>
                  <p className="text-3xl font-bold text-primary">{stats.totalRooms}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reservasi</p>
                  <p className="text-3xl font-bold text-info">{stats.totalReservations}</p>
                </div>
                <Calendar className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                  <p className="text-3xl font-bold text-warning">{stats.pendingApprovals}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Rating Rata-rata</p>
                  <p className="text-3xl font-bold text-success">{stats.averageRating}</p>
                </div>
                <Star className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="shadow-soft hover:shadow-medium transition-all" style={{animationDelay: '0.2s'}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ArrowRight className="h-5 w-5 mr-2 text-primary" />
              Aksi Cepat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                className="h-20 text-left justify-start hover-scale"
                onClick={() => navigate("/admin/users")}
              >
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Kelola Pengguna</p>
                    <p className="text-sm opacity-80">Manajemen user sistem</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline"
                className="h-20 text-left justify-start hover-scale"
                onClick={() => navigate("/admin/rooms")}
              >
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Kelola Ruangan</p>
                    <p className="text-sm opacity-80">CRUD data ruangan</p>
                  </div>
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-20 text-left justify-start hover-scale"
                onClick={() => navigate("/admin/approvals")}
              >
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Persetujuan Akhir</p>
                    <p className="text-sm opacity-80">Validasi reservasi</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline"
                className="h-20 text-left justify-start hover-scale"
                onClick={() => navigate("/admin/reports")}
              >
                <div className="flex items-center">
                  <BarChart3 className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Laporan</p>
                    <p className="text-sm opacity-80">Statistik penggunaan</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline"
                className="h-20 text-left justify-start hover-scale"
                onClick={() => navigate("/admin/feedback")}
              >
                <div className="flex items-center">
                  <Star className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Feedback</p>
                    <p className="text-sm opacity-80">Review pengguna</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Usage Statistics */}
          <Card className="shadow-soft animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Ruangan Populer
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/admin/reports")}
                >
                  Detail
                </Button>
              </CardTitle>
              <CardDescription>
                Top 5 ruangan dengan tingkat penggunaan tertinggi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topRooms.map((room, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{room.room}</p>
                        <p className="text-sm text-muted-foreground">{room.reservations} reservasi</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-primary">{room.usage}</p>
                      <div className="w-20 h-2 bg-muted rounded-full mt-1">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: room.usage }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="shadow-soft animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-warning" />
                  Feedback Terbaru
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/admin/feedback")}
                >
                  Lihat Semua
                </Button>
              </CardTitle>
              <CardDescription>
                Umpan balik terbaru dari pengguna ruangan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentFeedback.map((feedback) => (
                  <div key={feedback.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{feedback.room}</p>
                        <p className="text-sm text-muted-foreground">{feedback.user}</p>
                      </div>
                      <div className="flex items-center">
                        {renderStars(feedback.rating)}
                      </div>
                    </div>
                    <p className="text-sm">{feedback.comment}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(feedback.date).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Usage Overview */}
        <Card className="shadow-soft animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Ringkasan Penggunaan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-primary mb-2">{stats.monthlyUsage}%</div>
                <p className="text-sm text-muted-foreground">Tingkat Okupansi Bulanan</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-success mb-2">{stats.activeReservations}</div>
                <p className="text-sm text-muted-foreground">Reservasi Aktif Hari Ini</p>
              </div>
              
              <div className="text-center p-6 border rounded-lg">
                <div className="text-3xl font-bold text-info mb-2">{stats.feedbackCount}</div>
                <p className="text-sm text-muted-foreground">Total Feedback Masuk</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;