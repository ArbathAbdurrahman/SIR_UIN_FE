"use client"

import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../lib/auth"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import {
  Building2,
  Calendar,
  Search,
  CheckSquare,
  BarChart3,
  Users,
  LogOut,
  Menu,
  Home,
  Clock,
  FileText,
} from "lucide-react"
import { NotificationBell } from "../NotificationBell"

const studentNavItems = [
  { icon: Home, label: "Dashboard", href: "/student/dashboard" },
  { icon: Search, label: "Cari Ruangan", href: "/student/search" },
  { icon: Calendar, label: "Reservasi", href: "/student/reserve" },
  { icon: Clock, label: "Status", href: "/student/status" },
  { icon: FileText, label: "Riwayat", href: "/student/reservations" },
]

const lecturerNavItems = [
  { icon: Home, label: "Dashboard", href: "/lecturer/dashboard" },
  { icon: CheckSquare, label: "Persetujuan", href: "/lecturer/approvals" },
  { icon: Calendar, label: "Jadwal", href: "/lecturer/schedule" },
  { icon: BarChart3, label: "Laporan", href: "/lecturer/reports" },
]

const adminNavItems = [
  { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Building2, label: "Ruangan", href: "/admin/rooms" },
  { icon: Users, label: "Pengguna", href: "/admin/users" },
  { icon: BarChart3, label: "Laporan", href: "/admin/reports" },
]

export function DashboardLayout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getNavItems = () => {
    switch (user?.role) {
      case "mahasiswa":
        return studentNavItems
      case "dosen":
        return lecturerNavItems
      case "admin":
        return adminNavItems
      default:
        return []
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navItems = getNavItems()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold">RoomInfo</span>
            </div>
          </div>

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="font-bold">RoomInfo</span>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.href)
                      setSidebarOpen(false)
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <div className="flex items-center gap-2 md:hidden">
                <Building2 className="h-6 w-6 text-primary" />
                <span className="font-bold">RoomInfo</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationBell />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Keluar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-auto py-6">
              <nav className="space-y-2 px-4">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => navigate(item.href)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container py-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
