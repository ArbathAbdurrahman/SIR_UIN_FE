"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { DashboardLayout } from "../../components/layout/DashboardLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Calendar, Clock, Users, FileText, CheckCircle } from "lucide-react"
import { useAuth } from "../../lib/auth"
import { createReservation } from "../../lib/reservations"

export default function StudentReserve() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    roomId: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    attendees: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createReservation({
        ...formData,
        userId: user.id,
        userName: user.name,
        attendees: Number.parseInt(formData.attendees),
      })

      alert("Reservasi berhasil diajukan! Menunggu persetujuan.")
      navigate("/student/status")
    } catch (error) {
      alert("Terjadi kesalahan saat mengajukan reservasi")
    }

    setIsLoading(false)
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Buat Reservasi</h1>
          <p className="text-muted-foreground">Ajukan peminjaman ruangan untuk kegiatan Anda</p>
        </div>

        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Form Reservasi Ruangan
            </CardTitle>
            <CardDescription>Lengkapi informasi di bawah untuk mengajukan reservasi ruangan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="roomId">Ruangan</Label>
                <Select value={formData.roomId} onValueChange={(value) => handleInputChange("roomId", value)} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih ruangan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Ruang Kuliah A101</SelectItem>
                    <SelectItem value="2">Lab Komputer B201</SelectItem>
                    <SelectItem value="3">Auditorium Utama</SelectItem>
                    <SelectItem value="4">Ruang Seminar C301</SelectItem>
                    <SelectItem value="5">Lab Fisika D101</SelectItem>
                    <SelectItem value="6">Ruang Meeting E201</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Tanggal</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendees">Jumlah Peserta</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="attendees"
                      type="number"
                      placeholder="Jumlah orang"
                      value={formData.attendees}
                      onChange={(e) => handleInputChange("attendees", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Waktu Mulai</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">Waktu Selesai</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">Tujuan Penggunaan</Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="purpose"
                    placeholder="Jelaskan tujuan penggunaan ruangan..."
                    value={formData.purpose}
                    onChange={(e) => handleInputChange("purpose", e.target.value)}
                    className="pl-10 min-h-[100px]"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Mengajukan...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Ajukan Reservasi
                    </div>
                  )}
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate("/student/dashboard")}>
                  Batal
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
