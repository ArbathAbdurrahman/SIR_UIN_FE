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
      facilities: ["Whiteboard", "AC", "WiFi"],
      description: "Ruang kelas standar dengan fasilitas lengkap"
    },
    {
      id: 4,
      name: "Lab Multimedia",
      location: "Gedung Teknik Lt. 1",
      capacity: 30,
      status: "maintenance" as const,
      facilities: ["Komputer", "Software Editing", "AC", "WiFi"],
      description: "Lab khusus untuk multimedia dan editing"
    },
    {
      id: 5,
      name: "Ruang Diskusi A",
      location: "Perpustakaan Lt. 2",
      capacity: 15,
      status: "available" as const,
      facilities: ["Whiteboard", "AC", "WiFi"],
      description: "Ruang diskusi kecil untuk kelompok"
    }
  ];

  const locations = [
    "Gedung Teknik Lt. 1",
    "Gedung Teknik Lt. 2", 
    "Gedung Rektorat Lt. 3",
    "Gedung Kuliah Lt. 3",
    "Perpustakaan Lt. 2"
  ];

  const facilitiesOptions = [
    "Proyektor",
    "AC", 
    "WiFi",
    "Komputer",
    "Sound System",
    "Whiteboard",
    "Software Editing"
  ];

  // Filter rooms based on search criteria
  const filteredRooms = rooms.filter(room => {
    const capacityMatch = !searchFilters.capacity || room.capacity >= parseInt(searchFilters.capacity);
    const locationMatch = !searchFilters.location || room.location === searchFilters.location;
    const facilitiesMatch = !searchFilters.facilities || room.facilities.includes(searchFilters.facilities);
    
    return capacityMatch && locationMatch && facilitiesMatch;
  });

  const getFacilityIcon = (facility: string) => {
    const icons: { [key: string]: string } = {
      "Proyektor": "📽️",
      "AC": "❄️",
      "WiFi": "📶",
      "Komputer": "💻",
      "Sound System": "🔊",
      "Whiteboard": "📝"
    };
    return icons[facility] || "🔧";
  };

  const handleReserve = (roomId: number) => {
    navigate(`/student/reserve?roomId=${roomId}`);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Pencarian Ruangan</h1>
        <p className="text-muted-foreground mt-1">Temukan ruangan yang sesuai dengan kebutuhan Anda</p>
      </div>

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
                onChange={(e) => setSearchFilters(prev => ({...prev, capacity: e.target.value}))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Lokasi</Label>
              <Select 
                value={searchFilters.location} 
                onValueChange={(value) => setSearchFilters(prev => ({...prev, location: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih lokasi" />
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
                onValueChange={(value) => setSearchFilters(prev => ({...prev, facilities: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih fasilitas" />
                </SelectTrigger>
                <SelectContent>
                  {facilitiesOptions.map((facility) => (
                    <SelectItem key={facility} value={facility}>
                      <div className="flex items-center">
                        <span className="mr-2">{getFacilityIcon(facility)}</span>
                        {facility}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={() => setSearchFilters({capacity: "", location: "", facilities: ""})}
                variant="outline"
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Hasil Pencarian ({filteredRooms.length} ruangan)
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-success rounded-full mr-2"></div>
              <span>Tersedia</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-destructive rounded-full mr-2"></div>
              <span>Terisi</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-warning rounded-full mr-2"></div>
              <span>Maintenance</span>
            </div>
          </div>
        </div>

        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <Card 
                key={room.id} 
                className="shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
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
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {room.description}
                    </p>

                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm">Kapasitas: {room.capacity} orang</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Fasilitas:</p>
                      <div className="flex flex-wrap gap-1">
                        {room.facilities.map((facility, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <span className="mr-1">{getFacilityIcon(facility)}</span>
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleReserve(room.id)}
                      className="w-full"
                      disabled={room.status !== "available"}
                    >
                      {room.status === "available" ? "Reservasi" : 
                       room.status === "occupied" ? "Terisi" : "Maintenance"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12 shadow-soft">
            <CardContent>
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