import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  ArrowLeft,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Plus,
  BookOpen,
  Users,
  Filter,
  Download
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleReservations = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("calendar"); // calendar, list

  // Mock data for faculty schedule
  const [schedule] = useState([
    {
      id: 1,
      type: "teaching",
      title: "Database Management",
      room: "Lab Komputer 2",
      location: "Gedung Teknik Lt. 2",
      date: "2024-01-20",
      startTime: "08:00",
      endTime: "10:00",
      class: "SI-3A",
      students: 35,
      color: "bg-primary"
    },
    {
      id: 2,
      type: "teaching",
      title: "Sistem Informasi Manajemen",
      room: "Ruang Kelas 301",
      location: "Gedung Kuliah Lt. 3",
      date: "2024-01-20",
      startTime: "10:30",
      endTime: "12:30",
      class: "SI-2B", 
      students: 42,
      color: "bg-primary"
    },
    {
      id: 3,
      type: "reservation",
      title: "Rapat Koordinasi Dosen",
      room: "Ruang Rapat A",
      location: "Gedung Rektorat Lt. 2",
      date: "2024-01-22",
      startTime: "14:00",
      endTime: "16:00",
      description: "Rapat koordinasi program studi",
      color: "bg-secondary"
    },
    {
      id: 4,
      type: "teaching",
      title: "Pemrograman Web",
      room: "Lab Komputer 1",
      location: "Gedung Teknik Lt. 2",
      date: "2024-01-22",
      startTime: "13:00",
      endTime: "15:00",
      class: "SI-3B",
      students: 38,
      color: "bg-primary"
    }
  ]);

  // Mock room availability data
  const [roomAvailability] = useState([
    { room: "Lab Komputer 1", status: "available", nextClass: "15:30" },
    { room: "Lab Komputer 2", status: "occupied", nextClass: "10:00" },
    { room: "Ruang Seminar A", status: "available", nextClass: "-" },
    { room: "Lab Multimedia", status: "available", nextClass: "14:00" },
    { room: "Ruang Kelas 301", status: "occupied", nextClass: "12:30" },
  ]);

  const getSelectedDateSchedule = () => {
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return schedule.filter(item => item.date === selectedDateStr);
  };

  const getStatusColor = (status) => {
    return status === "available" ? "bg-room-available" : "bg-room-occupied";
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
                <h1 className="text-2xl font-bold">Jadwal & Reservasi</h1>
                <p className="opacity-90">Kelola jadwal mengajar dan reservasi ruangan</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajukan Reservasi
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Pilih Tanggal</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Room Availability */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Status Ruangan Real-time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roomAvailability.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{room.room}</p>
                        <p className="text-xs text-muted-foreground">
                          {room.nextClass !== "-" ? `Selanjutnya: ${room.nextClass}` : "Kosong sepanjang hari"}
                        </p>
                      </div>
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(room.status)}`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button 
                  variant={viewMode === "calendar" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("calendar")}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Kalender
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm" 
                  onClick={() => setViewMode("list")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Daftar
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Menampilkan: {selectedDate.toLocaleDateString('id-ID', { 
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
                })}
              </div>
            </div>

            {/* Schedule for Selected Date */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Jadwal Hari Ini
                </CardTitle>
                <CardDescription>
                  Total {getSelectedDateSchedule().length} kegiatan terjadwal
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getSelectedDateSchedule().length > 0 ? (
                  <div className="space-y-4">
                    {getSelectedDateSchedule()
                      .sort((a, b) => a.startTime.localeCompare(b.startTime))
                      .map((item) => (
                      <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <div className={`w-4 h-4 rounded-full mr-3 ${item.color}`}></div>
                              <h4 className="font-medium">{item.title}</h4>
                              <Badge variant="outline" className="ml-2">
                                {item.type === "teaching" ? "Mengajar" : "Reservasi"}
                              </Badge>
                            </div>
                            
                            <div className="space-y-1 text-sm text-muted-foreground ml-7">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{item.startTime} - {item.endTime}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{item.room} • {item.location}</span>
                              </div>
                              {item.class && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span>{item.class} ({item.students} mahasiswa)</span>
                                </div>
                              )}
                              {item.description && (
                                <div className="flex items-center">
                                  <BookOpen className="h-4 w-4 mr-2" />
                                  <span>{item.description}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              Detail
                            </Button>
                            {item.type === "reservation" && (
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Tidak ada jadwal</h3>
                    <p className="text-muted-foreground mb-4">
                      Belum ada kegiatan terjadwal untuk tanggal ini
                    </p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajukan Reservasi
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Jadwal Mengajar</p>
                      <p className="text-2xl font-bold text-primary">
                        {schedule.filter(s => s.type === 'teaching').length}
                      </p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reservasi Aktif</p>
                      <p className="text-2xl font-bold text-secondary">
                        {schedule.filter(s => s.type === 'reservation').length}
                      </p>
                    </div>
                    <CalendarIcon className="h-8 w-8 text-secondary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ruangan Tersedia</p>
                      <p className="text-2xl font-bold text-success">
                        {roomAvailability.filter(r => r.status === 'available').length}
                      </p>
                    </div>
                    <MapPin className="h-8 w-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleReservations;