import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  Eye,
  Trash2,
  RefreshCw,
  Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReservationStatus = () => {
  const navigate = useNavigate();
  
  // Mock data with different statuses
  const [reservations] = useState([
    {
      id: 1,
      room: "Lab Komputer 1",
      location: "Gedung Teknik Lt. 2",
      date: "2024-01-15",
      time: "09:00 - 11:00",
      status: "approved" as const,
      purpose: "Praktikum Database",
      submittedDate: "2024-01-10",
      approvedBy: "Dr. Ahmad Susanto",
      notes: "Disetujui untuk praktikum mata kuliah Database"
    },
    {
      id: 2,
      room: "Ruang Seminar A",
      location: "Gedung Rektorat Lt. 3", 
      date: "2024-01-18",
      time: "13:00 - 15:00",
      status: "pending" as const,
      purpose: "Presentasi Tugas Akhir",
      submittedDate: "2024-01-12",
      notes: "Menunggu persetujuan dosen pembimbing"
    },
    {
      id: 3,
      room: "Ruang Kelas 301",
      location: "Gedung Kuliah Lt. 3",
      date: "2024-01-20",
      time: "14:00 - 16:00", 
      status: "rejected" as const,
      purpose: "Rapat Organisasi Mahasiswa",
      submittedDate: "2024-01-13",
      rejectedBy: "Dr. Siti Nurhaliza",
      notes: "Ruangan sudah dibooking untuk kuliah reguler"
    },
    {
      id: 4,
      room: "Lab Multimedia",
      location: "Gedung Teknik Lt. 1",
      date: "2024-01-22",
      time: "10:00 - 12:00",
      status: "pending" as const,
      purpose: "Workshop Editing Video",
      submittedDate: "2024-01-14",
      notes: "Menunggu konfirmasi ketersediaan fasilitas"
    }
  ]);

  const getStatusFlow = (status: string) => {
    const flows = {
      pending: ["Diajukan", "Menunggu Dosen", "Menunggu Admin"],
      approved: ["Diajukan", "Disetujui Dosen", "Disetujui Admin"],
      rejected: ["Diajukan", "Ditolak"]
    };
    return flows[status as keyof typeof flows] || [];
  };

  const getStatusIcon = (status: string, currentStatus: string) => {
    if (currentStatus === "rejected" && status !== "Diajukan") {
      return "❌";
    }
    if (status === "Diajukan") return "✅";
    if (currentStatus === "approved") return "✅";
    if (currentStatus === "pending") return "⏳";
    return "⏳";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => navigate("/student/dashboard")}
                className="text-white hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Status Reservasi</h1>
                <p className="opacity-90">Pantau status permohonan reservasi ruangan Anda</p>
              </div>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{reservations.length}</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    {reservations.filter(r => r.status === "pending").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disetujui</p>
                  <p className="text-2xl font-bold text-success">
                    {reservations.filter(r => r.status === "approved").length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ditolak</p>
                  <p className="text-2xl font-bold text-destructive">
                    {reservations.filter(r => r.status === "rejected").length}
                  </p>
                </div>
                <Trash2 className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reservations List */}
        <div className="space-y-6">
          {reservations.map((reservation) => (
            <Card key={reservation.id} className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{reservation.room}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {reservation.location}
                    </CardDescription>
                  </div>
                  <StatusBadge status={reservation.status} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Reservation Details */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Detail Reservasi</h4>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium mr-2">Tanggal:</span>
                        <span>{reservation.date}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium mr-2">Waktu:</span>
                        <span>{reservation.time}</span>
                      </div>
                      
                      <div className="flex items-start text-sm">
                        <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                        <span className="font-medium mr-2">Tujuan:</span>
                        <span>{reservation.purpose}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Diajukan pada: {reservation.submittedDate}
                    </div>
                  </div>

                  {/* Status Flow */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-primary">Progress Persetujuan</h4>
                    
                    <div className="space-y-2">
                      {getStatusFlow(reservation.status).map((step, index) => (
                        <div key={index} className="flex items-center text-sm">
                          <span className="mr-2 text-lg">
                            {getStatusIcon(step, reservation.status)}
                          </span>
                          <span className={
                            reservation.status === "approved" || step === "Diajukan" || 
                            (reservation.status === "rejected" && step === "Ditolak")
                              ? "font-medium" 
                              : "text-muted-foreground"
                          }>
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Additional Info */}
                    {reservation.notes && (
                      <div className="mt-3 p-3 bg-muted rounded-lg">
                        <h5 className="text-xs font-medium text-muted-foreground mb-1">Catatan:</h5>
                        <p className="text-sm">{reservation.notes}</p>
                        
                        {reservation.approvedBy && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Disetujui oleh: {reservation.approvedBy}
                          </p>
                        )}
                        
                        {reservation.rejectedBy && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Ditolak oleh: {reservation.rejectedBy}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-6">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Detail Lengkap
                  </Button>
                  
                  {reservation.status === "pending" && (
                    <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Batalkan
                    </Button>
                  )}
                  
                  {reservation.status === "rejected" && (
                    <Button size="sm" onClick={() => navigate("/student/reserve")}>
                      Ajukan Ulang
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {reservations.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Belum ada reservasi</h3>
              <p className="text-muted-foreground mb-4">
                Anda belum memiliki riwayat reservasi ruangan
              </p>
              <Button onClick={() => navigate("/student/reserve")}>
                Buat Reservasi Pertama
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Notification Settings */}
        <Card className="mt-8 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Pengaturan Notifikasi
            </CardTitle>
            <CardDescription>
              Kelola notifikasi untuk update status reservasi Anda
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Notifikasi Email</h4>
                <p className="text-sm text-muted-foreground">
                  Terima update status via email di ahmad.rizki@universitas.ac.id
                </p>
              </div>
              <Badge variant="secondary">Aktif</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReservationStatus;