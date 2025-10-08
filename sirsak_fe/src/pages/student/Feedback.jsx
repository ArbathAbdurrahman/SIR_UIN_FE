import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/axiosInstance";
import { 
  ArrowLeft,
  Star,
  MessageSquare,
  Send,
  MapPin,
  Calendar,
  ThumbsUp
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reservations, setReservations] = useState([]);
  const [givenFeedbacks, setGivenFeedbacks] = useState([]); // <- feedback yang sudah ada
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState({
    reservation: "",
    rating: 0,
    text: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resReservations, resFeedbacks] = await Promise.all([
          api.get("/reservations/"),
          api.get("/feedback/"),
        ]);

        const now = new Date();

        const feedbackReservationIds = resFeedbacks.data.results.map(
          (fb) => fb.reservation
        );

        const filtered = resReservations.data.results.filter((r) => {
          const endDate = new Date(r.end);
          return (
            r.status?.toLowerCase() === "approved" &&
            endDate < now &&
            !feedbackReservationIds.includes(r.id) // exclude yang sudah ada feedback
          );
        });

        setReservations(filtered);
        setGivenFeedbacks(resFeedbacks.data.results);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
        toast({
          title: "Gagal memuat data",
          description: "Terjadi kesalahan saat mengambil data dari server.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const selectedReservation = reservations.find(
    (r) => r.id.toString() === feedbackData.reservation
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!feedbackData.reservation) {
      toast({
        title: "Pilih reservasi",
        description: "Mohon pilih reservasi yang ingin diberi feedback",
        variant: "destructive",
      });
      return;
    }

    if (feedbackData.rating === 0) {
      toast({
        title: "Rating diperlukan",
        description: "Mohon berikan rating keseluruhan",
        variant: "destructive",
      });
      return;
    }

    try {
      await api.post("/feedback/", {
        reservation: feedbackData.reservation,
        rating: feedbackData.rating,
        text: feedbackData.text,
      });

      toast({
        title: "Feedback berhasil dikirim!",
        description: "Terima kasih atas feedback Anda.",
      });

      setFeedbackData({
        reservation: "",
        rating: 0,
        text: "",
      });

      // Hapus dari daftar setelah submit
      setReservations((prev) =>
        prev.filter((r) => r.id.toString() !== feedbackData.reservation)
      );
    } catch (error) {
      console.error("Gagal mengirim feedback:", error);
      toast({
        title: "Gagal mengirim feedback",
        description: "Terjadi kesalahan saat mengirim data",
        variant: "destructive",
      });
    }
  };

  const StarRating = ({ rating, onRatingChange }) => (
    <div className="space-y-2">
      <Label>Rating Keseluruhan *</Label>
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
        {rating === 0
          ? "Belum diberi rating"
          : rating === 1
          ? "Sangat buruk"
          : rating === 2
          ? "Buruk"
          : rating === 3
          ? "Cukup"
          : rating === 4
          ? "Baik"
          : "Sangat baik"}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/user/dashboard")}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Feedback Ruangan</h1>
              <p className="opacity-90">
                Berikan penilaian untuk ruangan yang telah Anda gunakan
              </p>
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
                Hanya ruangan yang sudah selesai dan belum diberi feedback akan muncul di sini.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="reservation">Pilih Reservasi *</Label>
                  <Select
                    value={feedbackData.reservation}
                    onValueChange={(value) =>
                      setFeedbackData({ ...feedbackData, reservation: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loading
                            ? "Memuat reservasi..."
                            : reservations.length === 0
                            ? "Tidak ada reservasi yang bisa diberi feedback"
                            : "Pilih reservasi yang telah selesai"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {reservations.map((r) => (
                        <SelectItem key={r.id} value={r.id.toString()}>
                          <div className="flex flex-col">
                            <span className="font-medium">{r.room_name}</span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(r.start).toLocaleDateString()} • {r.purpose}
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
                          <h4 className="font-medium">{selectedReservation.room_name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {selectedReservation.location_name}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(selectedReservation.start).toLocaleString()} -{" "}
                            {new Date(selectedReservation.end).toLocaleString()}
                          </p>
                          <p className="text-sm">{selectedReservation.purpose}</p>
                        </div>
                        <Badge variant="secondary">Selesai</Badge>
                      </div>
                    </div>
                  )}
                </div>

                <StarRating
                  rating={feedbackData.rating}
                  onRatingChange={(rating) =>
                    setFeedbackData({ ...feedbackData, rating })
                  }
                />

                <div className="space-y-2">
                  <Label htmlFor="comments">Komentar & Saran</Label>
                  <Textarea
                    id="comments"
                    placeholder="Bagikan pengalaman Anda menggunakan ruangan ini."
                    value={feedbackData.text}
                    onChange={(e) =>
                      setFeedbackData({ ...feedbackData, text: e.target.value })
                    }
                    rows={4}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <ThumbsUp className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <h4 className="font-medium mb-1">Feedback Anda Berharga</h4>
                      <p>
                        Feedback Anda membantu kami meningkatkan kualitas ruangan dan layanan untuk seluruh civitas akademika.
                      </p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Kirim Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
