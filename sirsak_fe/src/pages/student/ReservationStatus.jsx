import { useState, useEffect } from "react";
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
  
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://sirsakapi.teknohole.com/api/reservations/", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`, // kalau pakai JWT
        },
      });
      if (!res.ok) throw new Error("Gagal ambil data reservasi");

      const data = await res.json();
      setReservations(data.results || []); // ambil results array
    } catch (err) {
      console.error(err);
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/student/dashboard")}
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            onClick={fetchReservations}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </header>
      
      <div className="container mx-auto p-6 space-y-6">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="shadow-soft">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Ruang {reservation.room_name}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {reservation.location_name}
                  </CardDescription>
                </div>
                <StatusBadge status={reservation.status.toLowerCase()} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Reservation Details */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium mr-2">Tanggal:</span>
                    <span>{reservation.start.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium mr-2">Waktu:</span>
                    <span>
                      {reservation.start.split("T")[1].slice(0,5)} - {reservation.end.split("T")[1].slice(0,5)}
                    </span>
                  </div>
                  <div className="flex items-start text-sm">
                    <FileText className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <span className="font-medium mr-2">Tujuan:</span>
                    <span>{reservation.purpose}</span>
                  </div>
                  <div
                    className="text-xs text-muted-foreground"> Diajukan pada: {reservation.created_at.split("T")[0]} {reservation.created_at.split("T")[1].slice(0,5)}
                  </div>
                </div>
                <div className="space-y-3">                  
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <h5 className="text-xs font-medium text-muted-foreground mb-1">Catatan:</h5>
                    <p className="text-sm">{reservation.notes}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Terakhir di review: {reservation.updated_at.split("T")[0]} {reservation.updated_at.split("T")[1].slice(0,5)}
                    </p>                     
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Detail Lengkap
                </Button>
                
                {reservation.status === "PENDING" && (
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Batalkan
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {reservations.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Belum ada reservasi</h3>
              <Button onClick={() => navigate("/student/reserve")}>
                Buat Reservasi Pertama
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReservationStatus;