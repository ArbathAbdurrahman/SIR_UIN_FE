import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  Calendar,
  Clock,
  FileText,
  Users,
  CheckCircle,
  XCircle,
  AlertCircle,
  BookOpen,
  ArrowRight,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  const navigate = useNavigate();

  // Mock data for pending approvals
  const [pendingApprovals] = useState([
    {
      id: 1,
      studentName: "Ahmad Rizki Maulana",
      room: "Lab Komputer 1",
      date: "2024-01-20",
      time: "09:00 - 11:00",
      reason: "Praktikum Database Management",
      submittedAt: "2024-01-18 14:30"
    },
    {
      id: 2,
      studentName: "Siti Nurhaliza",
      room: "Ruang Seminar A",
      date: "2024-01-22",
      time: "13:00 - 15:00", 
      reason: "Presentasi Tugas Akhir",
      submittedAt: "2024-01-19 10:15"
    },
    {
      id: 3,
      studentName: "Budi Santoso",
      room: "Lab Multimedia",
      date: "2024-01-25",
      time: "10:00 - 12:00",
      reason: "Workshop Video Editing",
      submittedAt: "2024-01-19 16:45"
    }
  ]);

  // Mock data for teaching schedule
  const [todaySchedule] = useState([
    {
      id: 1,
      course: "Database Management",
      room: "Lab Komputer 2",
      time: "08:00 - 10:00",
      class: "SI-3A",
      students: 35
    },
    {
      id: 2,
      course: "Sistem Informasi Manajemen",
      room: "Ruang Kelas 301",
      time: "10:30 - 12:30",
      class: "SI-2B",
      students: 42
    },
    {
      id: 3,
      course: "Pemrograman Web",
      room: "Lab Komputer 1",
      time: "13:00 - 15:00",
      class: "SI-3B",
      students: 38
    }
  ]);

  return (
    <div className="p-6 animate-fade-in">
      {/* Page Header */}
        <h1 className="text-3xl font-bold text-foreground">Dashboard Dosen</h1>
        <p className="text-muted-foreground mt-1">Selamat datang, Dr. Ahmad Susanto, M.Kom</p>
      
      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Permohonan Pending</p>
                  <p className="text-3xl font-bold text-warning">{pendingApprovals.length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Jadwal Hari Ini</p>
                  <p className="text-3xl font-bold text-primary">{todaySchedule.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disetujui Bulan Ini</p>
                  <p className="text-3xl font-bold text-success">28</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Mahasiswa</p>
                  <p className="text-3xl font-bold text-info">156</p>
                </div>
                <Users className="h-8 w-8 text-info" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                className="h-16 text-left justify-start hover-scale"
                onClick={() => navigate("/faculty/approvals")}
              >
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Persetujuan Reservasi</p>
                    <p className="text-sm opacity-80">Review permohonan mahasiswa</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline"
                className="h-16 text-left justify-start hover-scale"
                onClick={() => navigate("/faculty/schedule")}
              >
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Jadwal & Reservasi</p>
                    <p className="text-sm opacity-80">Kelola jadwal dan ruangan</p>
                  </div>
                </div>
              </Button>

              <Button 
                variant="outline"
                className="h-16 text-left justify-start hover-scale"
                onClick={() => navigate("/faculty/reports")}
              >
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-3" />
                  <div>
                    <p className="font-medium">Laporan</p>
                    <p className="text-sm opacity-80">Lihat statistik dan laporan</p>
                  </div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Approvals */}
          <Card className="shadow-soft animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-warning" />
                  Permohonan Menunggu Persetujuan
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/faculty/approvals")}
                >
                  Lihat Semua
                </Button>
              </CardTitle>
              <CardDescription>
                Daftar permohonan reservasi ruangan dari mahasiswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.slice(0, 3).map((approval) => (
                  <div key={approval.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{approval.studentName}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {approval.room} • {approval.date} • {approval.time}
                        </p>
                        <p className="text-sm mt-1">{approval.reason}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Diajukan: {approval.submittedAt}
                        </p>
                      </div>
                      <StatusBadge status="pending" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="shadow-soft animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" />
                  Jadwal Kuliah Hari Ini
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate("/faculty/schedule")}
                >
                  Lihat Kalender
                </Button>
              </CardTitle>
              <CardDescription>
                Jadwal mengajar Anda untuk hari ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaySchedule.map((schedule) => (
                  <div key={schedule.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{schedule.course}</h4>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="mr-4">{schedule.time}</span>
                          <span className="mr-4">•</span>
                          <span>{schedule.room}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{schedule.class} ({schedule.students} mahasiswa)</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">
                        Aktif
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;