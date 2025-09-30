import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  FileText,
  User,
  CheckCircle,
  XCircle,
  MessageSquare,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ApprovalReservations = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Mock data for reservation requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      studentName: "Ahmad Rizki Maulana",
      studentId: "2021110001",
      email: "ahmad.rizki@student.univ.ac.id",
      room: "Lab Komputer 1",
      location: "Gedung Teknik Lt. 2",
      capacity: "40 orang",
      facilities: ["Proyektor", "AC", "Komputer", "WiFi"],
      date: "2024-01-20",
      time: "09:00 - 11:00",
      reason: "Praktikum Database Management System untuk mata kuliah Basis Data. Akan digunakan untuk latihan SQL dan implementasi database.",
      submittedAt: "2024-01-18 14:30",
      status: "pending",
      urgency: "normal"
    },
    {
      id: 2,
      studentName: "Siti Nurhaliza",
      studentId: "2021110002", 
      email: "siti.nurhaliza@student.univ.ac.id",
      room: "Ruang Seminar A",
      location: "Gedung Rektorat Lt. 3",
      capacity: "50 orang",
      facilities: ["Proyektor", "Sound System", "AC", "WiFi"],
      date: "2024-01-22",
      time: "13:00 - 15:00",
      reason: "Presentasi Tugas Akhir dengan topik 'Sistem Informasi Manajemen Inventori Berbasis Web' di hadapan dosen penguji.",
      submittedAt: "2024-01-19 10:15",
      status: "pending",
      urgency: "high"
    },
    {
      id: 3,
      studentName: "Budi Santoso",
      studentId: "2021110003",
      email: "budi.santoso@student.univ.ac.id", 
      room: "Lab Multimedia",
      location: "Gedung Teknik Lt. 1",
      capacity: "30 orang",
      facilities: ["Komputer Editing", "Software Adobe", "AC", "WiFi"],
      date: "2024-01-25",
      time: "10:00 - 12:00",
      reason: "Workshop Video Editing untuk anggota organisasi mahasiswa. Akan diajarkan penggunaan Adobe Premiere Pro dan After Effects.",
      submittedAt: "2024-01-19 16:45",
      status: "pending",
      urgency: "normal"
    }
  ]);

  const handleApprove = (requestId) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved', approvedAt: new Date().toISOString() }
        : req
    ));
    
    toast({
      title: "Permohonan Disetujui",
      description: "Permohonan reservasi telah disetujui dan akan diteruskan ke admin.",
    });
  };

  const handleReject = (requestId) => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Alasan Diperlukan",
        description: "Mohon berikan alasan penolakan.",
        variant: "destructive"
      });
      return;
    }

    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected', rejectedAt: new Date().toISOString(), rejectionReason }
        : req
    ));
    
    setRejectionReason("");
    setSelectedRequest(null);
    
    toast({
      title: "Permohonan Ditolak", 
      description: "Permohonan reservasi telah ditolak dengan alasan yang diberikan.",
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-destructive';
      case 'normal': return 'text-warning';
      default: return 'text-muted-foreground';
    }
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
                onClick={() => navigate("/faculty/dashboard")}
                className="text-white hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Persetujuan Reservasi</h1>
                <p className="opacity-90">Review dan setujui permohonan reservasi ruangan</p>
              </div>
            </div>
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Filter className="h-4 w-4 mr-2" />
              Filter
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
                  <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                  <p className="text-2xl font-bold text-warning">{requests.filter(r => r.status === 'pending').length}</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Disetujui Hari Ini</p>
                  <p className="text-2xl font-bold text-success">5</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ditolak Hari Ini</p>
                  <p className="text-2xl font-bold text-destructive">1</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Prioritas Tinggi</p>
                  <p className="text-2xl font-bold text-destructive">
                    {requests.filter(r => r.urgency === 'high' && r.status === 'pending').length}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {requests.filter(r => r.status === 'pending').map((request) => (
            <Card key={request.id} className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      {request.studentName}
                      {request.urgency === 'high' && (
                        <Badge variant="destructive" className="ml-2">Prioritas Tinggi</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {request.studentId} • {request.email}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Diajukan: {new Date(request.submittedAt).toLocaleString('id-ID')}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Room & Schedule Details */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h4 className="font-medium text-primary mb-3">Detail Reservasi</h4>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{request.room}</p>
                            <p className="text-sm text-muted-foreground">{request.location}</p>
                            <p className="text-sm text-muted-foreground">Kapasitas: {request.capacity}</p>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span className="font-medium mr-2">Tanggal:</span>
                          <span>{new Date(request.date).toLocaleDateString('id-ID', { 
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                          })}</span>
                        </div>

                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-3 text-muted-foreground" />
                          <span className="font-medium mr-2">Waktu:</span>
                          <span>{request.time}</span>
                        </div>

                        <div className="flex items-start">
                          <FileText className="h-5 w-5 mr-3 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="font-medium mb-1">Tujuan Penggunaan:</p>
                            <p className="text-sm">{request.reason}</p>
                          </div>
                        </div>

                        <div>
                          <p className="font-medium mb-2">Fasilitas Tersedia:</p>
                          <div className="flex flex-wrap gap-2">
                            {request.facilities.map((facility, index) => (
                              <Badge key={index} variant="outline">{facility}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Panel */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-primary mb-3">Tindakan</h4>
                      <div className="space-y-3">
                        <Button 
                          className="w-full" 
                          onClick={() => handleApprove(request.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Setujui
                        </Button>

                        <Button 
                          variant="destructive" 
                          className="w-full"
                          onClick={() => setSelectedRequest(request.id)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Tolak
                        </Button>
                      </div>
                    </div>

                    {selectedRequest === request.id && (
                      <div className="space-y-3 p-4 bg-muted rounded-lg">
                        <div>
                          <label className="text-sm font-medium">Alasan Penolakan:</label>
                          <Textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Berikan alasan mengapa permohonan ini ditolak..."
                            className="mt-1"
                            rows={3}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleReject(request.id)}
                          >
                            Konfirmasi Tolak
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedRequest(null);
                              setRejectionReason("");
                            }}
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="space-y-2 text-sm">
                      <div className="p-3 bg-muted rounded-lg">
                        <h5 className="font-medium mb-1">Informasi Tambahan</h5>
                        <p className="text-muted-foreground text-xs">
                          Setelah Anda menyetujui, permohonan akan diteruskan ke admin untuk persetujuan akhir.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {requests.filter(r => r.status === 'pending').length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada permohonan pending</h3>
              <p className="text-muted-foreground">
                Semua permohonan reservasi sudah diproses
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ApprovalReservations;