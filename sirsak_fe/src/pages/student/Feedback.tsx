import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Star,
  MessageSquare,
  Send,
  MapPin,
  Calendar,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [feedbackData, setFeedbackData] = useState({
    reservationId: "",
    rating: 0,
    cleanliness: 0,
    facilities: 0,
    comfort: 0,
    comments: ""
  });

  // Mock data for completed reservations
  const completedReservations = [
    {
      id: "1",
      room: "Lab Komputer 1",
      location: "Gedung Teknik Lt. 2",
      date: "2024-01-15",
      time: "09:00 - 11:00",
      purpose: "Praktikum Database"
    },
    {
      id: "2", 
      room: "Ruang Seminar A",
      location: "Gedung Rektorat Lt. 3",
      date: "2024-01-10",
      time: "13:00 - 15:00",
      purpose: "Presentasi Tugas Akhir"
    }
  ];

  const selectedReservation = completedReservations.find(
    r => r.id === feedbackData.reservationId
  );

  const StarRating = ({ rating, onRatingChange, label }: {
    rating: number;
    onRatingChange: (rating: number) => void;
    label: string;
  }) => {
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star)}
              className={`p-1 rounded transition-colors ${
                star <= rating 
                  ? "text-yellow-500" 
                  : "text-gray-300 hover:text-yellow-400"
              }`}
            >
              <Star className="h-6 w-6 fill-current" />
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {rating === 0 ? "Belum diberi rating" : 
           rating === 1 ? "Sangat buruk" :
           rating === 2 ? "Buruk" :
           rating === 3 ? "Cukup" :
           rating === 4 ? "Baik" : "Sangat baik"}
        </p>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackData.reservationId) {
      toast({
        title: "Pilih reservasi",
        description: "Mohon pilih reservasi yang ingin diberi feedback",
        variant: "destructive"
      });
      return;
    }

    if (feedbackData.rating === 0) {
      toast({
        title: "Rating diperlukan",
        description: "Mohon berikan rating keseluruhan",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Feedback berhasil dikirim!",
      description: "Terima kasih atas feedback Anda. Ini akan membantu kami meningkatkan layanan.",
    });

    // Reset form
    setFeedbackData({
      reservationId: "",
      rating: 0,
      cleanliness: 0,
      facilities: 0,
      comfort: 0,
      comments: ""
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
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
              <h1 className="text-2xl font-bold">Feedback Ruangan</h1>
              <p className="opacity-90">Berikan penilaian untuk ruangan yang telah Anda gunakan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Form Feedback Ruangan
              </CardTitle>
              <CardDescription>
                Bantu kami meningkatkan kualitas layanan dengan memberikan feedback yang konstruktif
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Reservation Selection */}
                <div className="space-y-2">
                  <Label htmlFor="reservation">Pilih Reservasi *</Label>
                  <Select 
                    value={feedbackData.reservationId} 
                    onValueChange={(value) => setFeedbackData({...feedbackData, reservationId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih reservasi yang telah selesai" />
                    </SelectTrigger>
                    <SelectContent>
                      {completedReservations.map((reservation) => (
                        <SelectItem key={reservation.id} value={reservation.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{reservation.room}</span>
                            <span className="text-sm text-muted-foreground">
                              {reservation.date} • {reservation.time}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedReservation && (
                    <div className="mt-3 p-4 bg-muted rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{selectedReservation.room}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {selectedReservation.location}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {selectedReservation.date} • {selectedReservation.time}
                          </p>
                          <p className="text-sm">{selectedReservation.purpose}</p>
                        </div>
                        <Badge variant="secondary">Selesai</Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Overall Rating */}
                <StarRating
                  rating={feedbackData.rating}
                  onRatingChange={(rating) => setFeedbackData({...feedbackData, rating})}
                  label="Rating Keseluruhan *"
                />

                {/* Detailed Ratings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StarRating
                    rating={feedbackData.cleanliness}
                    onRatingChange={(cleanliness) => setFeedbackData({...feedbackData, cleanliness})}
                    label="Kebersihan"
                  />
                  
                  <StarRating
                    rating={feedbackData.facilities}
                    onRatingChange={(facilities) => setFeedbackData({...feedbackData, facilities})}
                    label="Fasilitas"
                  />
                  
                  <StarRating
                    rating={feedbackData.comfort}
                    onRatingChange={(comfort) => setFeedbackData({...feedbackData, comfort})}
                    label="Kenyamanan"
                  />
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments">Komentar & Saran</Label>
                  <Textarea
                    id="comments"
                    placeholder="Bagikan pengalaman Anda menggunakan ruangan ini. Apa yang bisa diperbaiki? Apa yang sudah baik?"
                    value={feedbackData.comments}
                    onChange={(e) => setFeedbackData({...feedbackData, comments: e.target.value})}
                    rows={4}
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <ThumbsUp className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <h4 className="font-medium mb-1">Feedback Anda Berharga</h4>
                      <p>
                        Feedback Anda membantu kami meningkatkan kualitas ruangan dan layanan untuk 
                        seluruh civitas akademika. Terima kasih atas partisipasi Anda!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-gradient-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Feedback
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="mt-8 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Feedback Terbaru Anda
              </CardTitle>
              <CardDescription>
                Riwayat feedback yang telah Anda berikan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Sample feedback history */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">Lab Komputer 2</h4>
                      <p className="text-sm text-muted-foreground">15 Januari 2024</p>
                    </div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    "Lab sangat bersih dan fasilitas komputer berfungsi dengan baik. 
                    Semoga bisa dipertahankan kualitasnya."
                  </p>
                </div>
                
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Belum ada feedback lainnya</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;