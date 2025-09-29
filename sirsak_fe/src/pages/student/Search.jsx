"use client"

import { useState } from "react"
import { DashboardLayout } from "../../components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Badge } from "../../components/ui/badge"
import { Search, MapPin, Users, Wifi, Monitor, Coffee, Car } from "lucide-react"
import { searchRooms } from "../../lib/rooms"

export default function StudentSearch() {
  const [filters, setFilters] = useState({
    type: "all",
    capacity: "",
    location: "",
    available: true,
  })
  const [searchResults, setSearchResults] = useState(searchRooms())

  const handleSearch = () => {
    const results = searchRooms(filters)
    setSearchResults(results)
  }

  const getFacilityIcon = (facility) => {
    switch (facility.toLowerCase()) {
      case "wifi":
      case "jaringan internet":
        return <Wifi className="w-4 h-4" />
      case "proyektor":
      case "tv led":
        return <Monitor className="w-4 h-4" />
      case "coffee machine":
        return <Coffee className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cari Ruangan</h1>
          <p className="text-muted-foreground">Temukan ruangan yang sesuai dengan kebutuhan Anda</p>
        </div>

        {/* Search Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Filter Pencarian
            </CardTitle>
            <CardDescription>Gunakan filter untuk mempersempit hasil pencarian</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipe Ruangan</Label>
                <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tipe</SelectItem>
                    <SelectItem value="classroom">Ruang Kelas</SelectItem>
                    <SelectItem value="computer_lab">Lab Komputer</SelectItem>
                    <SelectItem value="laboratory">Laboratorium</SelectItem>
                    <SelectItem value="auditorium">Auditorium</SelectItem>
                    <SelectItem value="seminar_room">Ruang Seminar</SelectItem>
                    <SelectItem value="meeting_room">Ruang Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Kapasitas Minimum</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="Jumlah orang"
                  value={filters.capacity}
                  onChange={(e) => setFilters({ ...filters, capacity: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  placeholder="Gedung atau lantai"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={handleSearch} className="w-full">
                  <Search className="w-4 h-4 mr-2" />
                  Cari Ruangan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((room) => (
            <Card key={room.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={room.image || "/placeholder.svg"} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant={room.available ? "default" : "destructive"}>
                    {room.available ? "Tersedia" : "Tidak Tersedia"}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>{room.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>Kapasitas: {room.capacity} orang</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Fasilitas:</p>
                    <div className="flex flex-wrap gap-1">
                      {room.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {getFacilityIcon(facility)}
                          <span className="ml-1">{facility}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    disabled={!room.available}
                    onClick={() => {
                      /* Navigate to reservation */
                    }}
                  >
                    {room.available ? "Reservasi Sekarang" : "Tidak Tersedia"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchResults.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada ruangan ditemukan</h3>
              <p className="text-muted-foreground">Coba ubah filter pencarian Anda</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
