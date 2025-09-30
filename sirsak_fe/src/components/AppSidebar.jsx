import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Calendar,
  Search,
  Plus,
  FileText,
  MessageSquare,
  CheckCircle,
  MapPin,
  BarChart3,
  Settings,
  Users,
  Star,
  BookOpen,
  Bell,
  Home,
  LogOut,
  User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock user role - in real app this would come from authentication context
const getCurrentUserRole = () => {
  // For demo purposes, cycle through roles based on current path
  const path = window.location.pathname;
  if (path.includes('student')) return 'student';
  if (path.includes('lecturer')) return 'faculty';
  if (path.includes('admin')) return 'admin';
  return 'student'; // default
};

const getUserName = (role) => {
  switch (role) {
    case 'student': return 'Ahmad Rizki';
    case 'faculty': return 'Dr. Ahmad Susanto';
    case 'admin': return 'Admin Sistem';
    default: return 'User';
  }
};

const menuItems = {
  student: [
    {
      title: "Dashboard",
      url: "/student/dashboard",
      icon: Home,
    },
    {
      title: "Cari Ruangan",
      url: "/student/search",
      icon: Search,
    },
    {
      title: "Ajukan Reservasi",
      url: "/student/reserve",
      icon: Plus,
    },
    {
      title: "Status Reservasi",
      url: "/student/status",
      icon: FileText,
      badge: "3"
    },
    {
      title: "Feedback",
      url: "/student/feedback",
      icon: MessageSquare,
    }
  ],
  faculty: [
    {
      title: "Dashboard",
      url: "/lecturer/dashboard",
      icon: Home,
    },
    {
      title: "Persetujuan Reservasi",
      url: "/lecturer/approvals",
      icon: CheckCircle,
      badge: "3"
    },
    {
      title: "Jadwal & Reservasi",
      url: "/lecturer/schedule",
      icon: Calendar,
    },
    {
      title: "Laporan",
      url: "/lecturer/reports",
      icon: BarChart3,
    }
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: Home,
    },
    {
      title: "Kelola Ruangan",
      url: "/admin/rooms",
      icon: MapPin,
    },
    {
      title: "Kelola Pengguna",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Persetujuan Akhir",
      url: "/admin/approvals",
      icon: CheckCircle,
      badge: "8"
    },
    {
      title: "Laporan Penggunaan",
      url: "/admin/reports",
      icon: BarChart3,
    },
    {
      title: "Feedback Pengguna",
      url: "/admin/feedback",
      icon: MessageSquare,
    },
    {
      title: "Pengaturan",
      url: "/admin/settings",
      icon: Settings,
    }
  ]
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  const userRole = getCurrentUserRole();
  const userName = getUserName(userRole);
  const items = menuItems[userRole] || menuItems.student;

  const isActive = (path) => currentPath === path;
  const getNavCls = ({ isActive }) =>
    isActive 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 hover:text-foreground";

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'student': return 'bg-blue-500';
      case 'faculty': return 'bg-green-500';
      case 'admin': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'student': return 'Mahasiswa';
      case 'faculty': return 'Dosen';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"} border-r bg-card transition-all duration-300`}
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="p-4 border-b">
        {!collapsed ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg text-foreground truncate">
                    SIRSAK
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Sistem Informasi Ruangan
                  </p>
                </div>
              </div>
              <SidebarTrigger className="h-7 w-7 hover:bg-primary/10" />
            </div>
            
            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <Badge 
                  className={`text-xs px-2 py-0 ${getRoleBadgeColor(userRole)} text-white`}
                >
                  {getRoleLabel(userRole)}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center justify-center w-full">
              <SidebarTrigger className="h-6 w-6 hover:bg-primary/10" />
            </div>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className={`w-6 h-6 ${getRoleBadgeColor(userRole)} rounded-full flex items-center justify-center`}>
              <User className="h-3 w-3 text-white" />
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Menu Utama
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                      {!collapsed && (
                        <div className="flex items-center justify-between flex-1 min-w-0">
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <Badge 
                              variant="destructive" 
                              className="ml-2 text-xs px-1.5 py-0 bg-warning text-white"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Notifications Section */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Notifikasi
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group">
                    <Bell className="h-5 w-5 flex-shrink-0 text-warning group-hover:scale-110 transition-transform duration-200" />
                    {!collapsed && (
                      <div className="flex items-center justify-between flex-1">
                        <span>Notifikasi</span>
                        <Badge 
                          variant="destructive" 
                          className="ml-2 text-xs px-1.5 py-0 bg-warning text-white"
                        >
                          {userRole === 'student' ? '2' : userRole === 'faculty' ? '3' : '5'}
                        </Badge>
                      </div>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        {!collapsed ? (
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Keluar
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              � 2024 SiRuang v1.0
            </p>
          </div>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full p-2 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

