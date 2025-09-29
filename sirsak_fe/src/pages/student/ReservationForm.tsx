import { useState } from "react";
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
import { 
  ArrowLeft,
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
  const [date, setDate] = useState<Date>();
  
  const [formData, setFormData] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    participants: "",
    additionalNotes: ""
  });

  // Mock rooms data
  const rooms = [
    { id: "1", name: "Lab Komputer 1", location: "Gedung Teknik Lt. 2", capacity: 40 },
    { id: "2", name: "Ruang Seminar A", location: "Gedung Rektorat Lt. 3", capacity: 100 },
    { id: "3", name: "Ruang Kelas 301", location: "Gedung Kuliah Lt. 3", capacity: 50 },
    { id: "4", name: "Lab Multimedia", location: "Gedung Teknik Lt. 1", capacity: 30 }
  ];

  const timeSlots = [
    "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const selectedRoom = rooms.find(room => room.id === formData.roomId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.roomId || !date || !formData.startTime || !formData.endTime || !formData.purpose) {
      toast({
        title: "Data tidak lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Success simulation
    toast({
      title: "Reservasi berhasil diajukan!",
      description: "Permohonan Anda akan direview oleh dosen pembimbing",
    });

    // Redirect to status page
    navigate("/student/status");
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
              onClick={() => navigate(-1)}
              className="text-white hover:bg-white/20 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Ajukan Reservasi Ruangan</h1>
              <p className="opacity-90">Isi form di bawah untuk mengajukan peminjaman ruangan</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-large">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Form Reservasi Ruangan
              </CardTitle>
              <CardDescription>
                Lengkapi informasi berikut untuk mengajukan peminjaman ruangan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Selection */}
                <div className="space-y-2">
                  <Label htmlFor="room">Pilih Ruangan *</Label>
                  <Select 
                    value={formData.roomId} 
                    onValueChange={(value) => setFormData({...formData, roomId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ruangan yang ingin direservasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{room.name}</span>
                            <span className="text-sm text-muted-foreground">{room.location}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedRoom && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{selectedRoom.name}</h4>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {selectedRoom.location}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          <Users className="h-3 w-3 mr-1" />
                          {selectedRoom.capacity} orang
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>

                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Tanggal *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Selection */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Jam Mulai *</Label>
                    <Select 
                      value={formData.startTime} 
                      onValueChange={(value) => setFormData({...formData, startTime: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jam mulai" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endTime">Jam Selesai *</Label>
                    <Select 
                      value={formData.endTime} 
                      onValueChange={(value) => setFormData({...formData, endTime: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jam selesai" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Purpose */}
                <div className="space-y-2">
                  <Label htmlFor="purpose">Tujuan/Alasan Penggunaan *</Label>
                  <Textarea
                    id="purpose"
                    placeholder="Contoh: Praktikum Database, Presentasi Tugas Akhir, Rapat Organisasi"
                    value={formData.purpose}
                    onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                    rows={3}
                  />
                </div>

                {/* Participants */}
                <div className="space-y-2">
                  <Label htmlFor="participants">Jumlah Peserta</Label>
                  <Input
                    id="participants"
                    type="number"
                    placeholder="Masukkan jumlah peserta"
                    value={formData.participants}
                    onChange={(e) => setFormData({...formData, participants: e.target.value})}
                  />
                </div>

                {/* Additional Notes */}
                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan Tambahan</Label>
                  <Textarea
                    id="notes"
                    placeholder="Catatan atau permintaan khusus (opsional)"
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                    rows={2}
                  />
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <Clock className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-700">
                      <h4 className="font-medium mb-1">Proses Persetujuan</h4>
                      <p>
                        Permohonan Anda akan direview oleh dosen pembimbing, kemudian oleh admin. 
                        Anda akan mendapat notifikasi melalui email untuk setiap perubahan status.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full bg-gradient-primary">
                  <Send className="h-4 w-4 mr-2" />
                  Ajukan Reservasi
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReservationForm;