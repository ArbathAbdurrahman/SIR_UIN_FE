import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Volume2,
  ArrowLeft,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const RoomSearch = () => {
  const navigate = useNavigate();
  const [searchFilters, setSearchFilters] = useState({
    capacity: "",
    location: "",
    facilities: ""
  });

  // Mock data
  const rooms = [
    {
      id: 1,
      name: "Lab Komputer 1",
      location: "Gedung Teknik Lt. 2",
      capacity: 40,
      status: "available" as const,
      facilities: ["Proyektor", "AC", "WiFi", "Komputer"],
      description: "Lab dengan 40 unit komputer untuk praktikum"
    },
    {
      id: 2,
      name: "Ruang Seminar A",
      location: "Gedung Rektorat Lt. 3",
      capacity: 100,
      status: "occupied" as const,
      facilities: ["Proyektor", "AC", "WiFi", "Sound System"],
      description: "Ruang seminar besar dengan kapasitas 100 orang"
    },
    {
      id: 3,
      name: "Ruang Kelas 301",
      location: "Gedung Kuliah Lt. 3",
      capacity: 50,
      status: "available" as const,
      facilities: ["Proyektor", "AC", "WiFi", "Whiteboard"],
      description: "Ruang kelas standar untuk perkuliahan"
    },
    {
      id: 4,
      name: "Lab Multimedia",
      location: "Gedung Teknik Lt. 1",
      capacity: 30,
      status: "pending" as const,
      facilities: ["Proyektor", "AC", "WiFi", "Komputer", "Sound System"],
      description: "Lab multimedia dengan fasilitas lengkap"
    }
  ];

  const locations = [
    "Gedung Teknik",
    "Gedung Kuliah", 
    "Gedung Rektorat",
    "Gedung Ekonomi",
    "Gedung Perpustakaan"
  ];

  const facilitiesOptions = [
    "Proyektor",
    "AC", 
    "WiFi",
    "Sound System",
    "Komputer",
    "Whiteboard"
  ];

  const getFacilityIcon = (facility: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "Proyektor": <Monitor className="h-3 w-3" />,
      "WiFi": <Wifi className="h-3 w-3" />,
      "Sound System": <Volume2 className="h-3 w-3" />,
      "AC": "❄️",
      "Komputer": "💻",
      "Whiteboard": "📝"
    };
    return icons[facility] || "🔧";
  };

  const handleReserve = (roomId: number) => {
    navigate(`/student/reserve?roomId=${roomId}`);
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
              <h1 className="text-2xl font-bold">Pencarian Ruangan</h1>
              <p className="opacity-90">Temukan ruangan sesuai kebutuhan Anda</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Search Filters */}
        <Card className="mb-6 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary" />
              Filter Pencarian
            </CardTitle>
            <CardDescription>
              Gunakan filter untuk menemukan ruangan yang sesuai
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas Minimal</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Contoh: 30"
                  value={searchFilters.capacity}
                  onChange={(e) => setSearchFilters({...searchFilters, capacity: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Select 
                  value={searchFilters.location} 
                  onValueChange={(value) => setSearchFilters({...searchFilters, location: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih gedung" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="facilities">Fasilitas</Label>
                <Select 
                  value={searchFilters.facilities} 
                  onValueChange={(value) => setSearchFilters({...searchFilters, facilities: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih fasilitas" />
                  </SelectTrigger>
                  <SelectContent>
                    {facilitiesOptions.map((facility) => (
                      <SelectItem key={facility} value={facility}>
                        {facility}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button className="w-full bg-gradient-primary">
                  <Search className="h-4 w-4 mr-2" />
                  Cari Ruangan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Hasil Pencarian ({rooms.length} ruangan)</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-room-available rounded-full mr-2"></div>
              <span>Tersedia</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-room-occupied rounded-full mr-2"></div>
              <span>Terisi</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-room-pending rounded-full mr-2"></div>
              <span>Pending</span>
            </div>
          </div>
        </div>

        {/* Room List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rooms.map((room) => (
            <Card key={room.id} className="shadow-soft hover:shadow-medium transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{room.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {room.location}
                    </CardDescription>
                  </div>
                  <StatusBadge status={room.status} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{room.description}</p>
                
                <div className="flex items-center mb-4">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium">Kapasitas: {room.capacity} orang</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium mb-2">Fasilitas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {room.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        <span className="mr-1">{getFacilityIcon(facility)}</span>
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleReserve(room.id)}
                    disabled={room.status === "occupied"}
                    className="flex-1"
                    variant={room.status === "available" ? "default" : "outline"}
                  >
                    {room.status === "available" ? "Reservasi" : 
                     room.status === "occupied" ? "Tidak Tersedia" : "Lihat Detail"}
                  </Button>
                  <Button variant="outline">
                    Detail
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {rooms.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada ruangan ditemukan</h3>
              <p className="text-muted-foreground mb-4">
                Coba ubah filter pencarian Anda
              </p>
              <Button 
                onClick={() => setSearchFilters({capacity: "", location: "", facilities: ""})}
                variant="outline"
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoomSearch;