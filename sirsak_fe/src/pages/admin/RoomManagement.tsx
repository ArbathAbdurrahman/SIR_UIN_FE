import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  MapPin,
  Users,
  Wifi,
  Monitor,
  Zap,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RoomManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock room data
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Lab Komputer 1",
      code: "LK001",
      location: "Gedung Teknik Lt. 2",
      capacity: 40,
      type: "Laboratory",
      facilities: ["Komputer", "Proyektor", "AC", "WiFi"],
      description: "Laboratorium komputer dengan 40 unit PC untuk praktikum pemrograman",
      status: "active",
      lastMaintenance: "2024-01-15"
    },
    {
      id: 2,
      name: "Ruang Seminar A",
      code: "RSA01",
      location: "Gedung Rektorat Lt. 3",
      capacity: 50,
      type: "Seminar Room",
      facilities: ["Proyektor", "Sound System", "AC", "WiFi"],
      description: "Ruang seminar untuk presentasi dan acara akademik",
      status: "active",
      lastMaintenance: "2024-01-10"
    },
    {
      id: 3,
      name: "Lab Multimedia",
      code: "LM001", 
      location: "Gedung Teknik Lt. 1",
      capacity: 30,
      type: "Laboratory",
      facilities: ["Komputer Editing", "Software Adobe", "AC", "WiFi"],
      description: "Lab multimedia untuk editing video dan desain grafis",
      status: "maintenance",
      lastMaintenance: "2024-01-20"
    },
    {
      id: 4,
      name: "Ruang Kelas 301",
      code: "RK301",
      location: "Gedung Kuliah Lt. 3",
      capacity: 45,
      type: "Classroom",
      facilities: ["Proyektor", "Whiteboard", "AC", "WiFi"],
      description: "Ruang kelas untuk perkuliahan reguler",
      status: "active",
      lastMaintenance: "2024-01-12"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    location: "",
    capacity: "",
    type: "Classroom",
    facilities: [],
    description: "",
    status: "active"
  });

  const roomTypes = ["Classroom", "Laboratory", "Seminar Room", "Meeting Room", "Auditorium"];
  const availableFacilities = ["Proyektor", "AC", "WiFi", "Komputer", "Sound System", "Whiteboard", "Software Adobe", "Komputer Editing"];

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    room.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (room) => {
    setSelectedRoom(room.id);
    setFormData({
      name: room.name,
      code: room.code,
      location: room.location,
      capacity: room.capacity.toString(),
      type: room.type,
      facilities: room.facilities,
      description: room.description,
      status: room.status
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.code || !formData.location || !formData.capacity) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi.",
        variant: "destructive"
      });
      return;
    }

    if (selectedRoom) {
      // Update existing room
      setRooms(prev => prev.map(room => 
        room.id === selectedRoom 
          ? { ...room, ...formData, capacity: parseInt(formData.capacity) }
          : room
      ));
      toast({
        title: "Berhasil",
        description: "Data ruangan berhasil diperbarui."
      });
    } else {
      // Add new room
      const newRoom = {
        id: Math.max(...rooms.map(r => r.id)) + 1,
        ...formData,
        capacity: parseInt(formData.capacity),
        lastMaintenance: new Date().toISOString().split('T')[0]
      };
      setRooms(prev => [...prev, newRoom]);
      toast({
        title: "Berhasil",
        description: "Ruangan baru berhasil ditambahkan."
      });
    }

    resetForm();
  };

  const handleDelete = (roomId) => {
    setRooms(prev => prev.filter(room => room.id !== roomId));
    toast({
      title: "Berhasil",
      description: "Ruangan berhasil dihapus."
    });
  };

  const resetForm = () => {
    setSelectedRoom(null);
    setIsEditing(false);
    setFormData({
      name: "",
      code: "",
      location: "",
      capacity: "",
      type: "Classroom",
      facilities: [],
      description: "",
      status: "active"
    });
  };

  const toggleFacility = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success text-success-foreground';
      case 'maintenance': return 'bg-warning text-warning-foreground';
      case 'inactive': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getFacilityIcon = (facility) => {
    switch (facility) {
      case 'WiFi': return <Wifi className="h-4 w-4" />;
      case 'AC': return <Zap className="h-4 w-4" />;
      case 'Proyektor': return <Monitor className="h-4 w-4" />;
      case 'Komputer': return <Monitor className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
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
                onClick={() => navigate("/admin/dashboard")}
                className="text-white hover:bg-white/20 mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Manajemen Ruangan</h1>
                <p className="opacity-90">Kelola data ruangan, fasilitas, dan ketersediaan</p>
              </div>
            </div>
            <Button 
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => setIsEditing(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Ruangan
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Room List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-soft">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-1 relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Cari ruangan..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredRooms.map((room) => (
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
                      <Badge className={getStatusColor(room.status)}>
                        {room.status === 'active' ? 'Aktif' : 
                         room.status === 'maintenance' ? 'Maintenance' : 'Non-aktif'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Kode</p>
                          <p className="font-medium">{room.code}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Kapasitas</p>
                          <p className="font-medium flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {room.capacity} orang
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tipe</p>
                          <p className="font-medium">{room.type}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Maintenance</p>
                          <p className="font-medium">{room.lastMaintenance}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Fasilitas</p>
                        <div className="flex flex-wrap gap-1">
                          {room.facilities.slice(0, 3).map((facility, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {getFacilityIcon(facility)}
                              <span className="ml-1">{facility}</span>
                            </Badge>
                          ))}
                          {room.facilities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{room.facilities.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(room)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(room.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Form Panel */}
          {isEditing && (
            <div className="lg:col-span-1">
              <Card className="shadow-soft sticky top-6">
                <CardHeader>
                  <CardTitle>
                    {selectedRoom ? 'Edit Ruangan' : 'Tambah Ruangan Baru'}
                  </CardTitle>
                  <CardDescription>
                    Lengkapi informasi ruangan dengan detail yang akurat
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nama Ruangan *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Lab Komputer 1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="code">Kode Ruangan *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                      placeholder="LK001"
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Lokasi *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Gedung Teknik Lt. 2"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity">Kapasitas *</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                        placeholder="40"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Tipe Ruangan</Label>
                      <select
                        id="type"
                        value={formData.type}
                        onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        {roomTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Fasilitas</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availableFacilities.map(facility => (
                        <label key={facility} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.facilities.includes(facility)}
                            onChange={() => toggleFacility(facility)}
                            className="rounded"
                          />
                          <span className="text-sm">{facility}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Deskripsi ruangan..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="active">Aktif</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Non-aktif</option>
                    </select>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <Button onClick={handleSave} className="flex-1">
                      {selectedRoom ? 'Update' : 'Simpan'}
                    </Button>
                    <Button variant="outline" onClick={resetForm}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomManagement;