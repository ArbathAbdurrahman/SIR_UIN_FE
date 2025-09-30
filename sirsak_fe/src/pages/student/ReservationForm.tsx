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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.roomId || !formData.date || !formData.startTime || !formData.endTime || !formData.purpose) {
      toast({
        title: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Reservasi berhasil diajukan!",
      description: "Permohonan Anda akan direview oleh dosen pembimbing",
    });

    // Redirect to status page
    navigate("/student/status");
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Ajukan Reservasi Ruangan</h1>
        <p className="text-muted-foreground mt-1">Isi formulir untuk mengajukan reservasi ruangan</p>
      </div>

      {/* Available Rooms Section */}
      <Card className="mb-6 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-primary" />
            Ruangan Tersedia
          </CardTitle>
          <CardDescription>
            Pilih ruangan yang ingin Anda reservasi
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rooms.map((room) => (
              <Card 
                key={room.id} 
                className={`cursor-pointer border-2 transition-all duration-200 hover:shadow-medium ${
                  formData.roomId === room.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleInputChange("roomId", room.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{room.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {room.location}
                      </p>
                      <div className="flex items-center mt-2 text-sm">
                        <Users className="h-4 w-4 mr-1 text-primary" />
                        <span>Kapasitas: {room.capacity} orang</span>
                      </div>
                    </div>
                    {formData.roomId === room.id && (
                      <Badge className="bg-primary">Dipilih</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reservation Form */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-primary" />
            Formulir Reservasi
          </CardTitle>
          <CardDescription>
            Lengkapi informasi detail reservasi ruangan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Selection */}
              <div className="space-y-2">
                <Label htmlFor="date">Tanggal Penggunaan *</Label>
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
                      {date ? format(date, "PPP") : "Pilih tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        setDate(selectedDate);
                        handleInputChange("date", selectedDate ? format(selectedDate, "yyyy-MM-dd") : "");
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Purpose */}
              <div className="space-y-2">
                <Label htmlFor="purpose">Tujuan Penggunaan *</Label>
                <Input
                  id="purpose"
                  placeholder="Contoh: Praktikum Database"
                  value={formData.purpose}
                  onChange={(e) => handleInputChange("purpose", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time */}
              <div className="space-y-2">
                <Label htmlFor="startTime">Waktu Mulai *</Label>
                <Select value={formData.startTime} onValueChange={(value) => handleInputChange("startTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih waktu mulai" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <Label htmlFor="endTime">Waktu Selesai *</Label>
                <Select value={formData.endTime} onValueChange={(value) => handleInputChange("endTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih waktu selesai" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          {time}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Number of Participants */}
              <div className="space-y-2">
                <Label htmlFor="participants">Jumlah Peserta</Label>
                <Input
                  id="participants"
                  type="number"
                  placeholder="Contoh: 25"
                  value={formData.participants}
                  onChange={(e) => handleInputChange("participants", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Catatan Tambahan</Label>
                <Textarea
                  id="additionalNotes"
                  placeholder="Catatan atau permintaan khusus..."
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Informasi Penting:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Permohonan akan diproses dalam 1-2 hari kerja</li>
                <li>• Pastikan tanggal dan waktu tidak bertabrakan dengan jadwal kuliah</li>
                <li>• Pembatalan harus dilakukan minimal 24 jam sebelum penggunaan</li>
                <li>• Ruangan harus dikembalikan dalam kondisi bersih</li>
              </ul>
            </div>

            <Button type="submit" className="w-full bg-gradient-primary">
              <Send className="h-4 w-4 mr-2" />
              Ajukan Reservasi
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationForm;