import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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

const menuItems = {
  user: [
    { title: "Dashboard", url: "/user/dashboard", icon: Home },
    { title: "Cari Ruangan", url: "/user/search", icon: Search },
    { title: "Ajukan Reservasi", url: "/user/reserve", icon: Plus },
    { title: "Status Reservasi", url: "/user/status", icon: FileText, badge: "3" },
    { title: "Feedback", url: "/user/feedback", icon: MessageSquare }
  ],
  admin: [
    { title: "Dashboard", url: "/admin/dashboard", icon: Home },
    { title: "Kelola Ruangan", url: "/admin/rooms", icon: MapPin },
    { title: "Kelola Pengguna", url: "/admin/users", icon: Users },
    { title: "Laporan Penggunaan", url: "/admin/reports", icon: BarChart3 },
    { title: "Feedback Pengguna", url: "/admin/feedback", icon: MessageSquare }
  ],
  superadmin: [
    { title: "Dashboard", url: "/superadmin/dashboard", icon: Home },
    { title: "Manajemen Admin", url: "/superadmin/admins", icon: Users },
    { title: "Persetujuan Akhir", url: "/superadmin/approvals", icon: CheckCircle, badge: "8" },
    { title: "Pengaturan Sistem", url: "/superadmin/settings", icon: Settings },
    { title: "Laporan Global", url: "/superadmin/reports", icon: BarChart3 }
  ]
};

const getRoleBadgeColor = (role) => {
  switch (role) {
    case "user": return "bg-blue-500";
    case "admin": return "bg-green-500";
    case "superadmin": return "bg-purple-500";
    default: return "bg-gray-500";
  }
};

const getRoleLabel = (role) => {
  switch (role) {
    case "user": return "User";
    case "admin": return "Admin";
    case "superadmin": return "Super Admin";
    default: return "User";
  }
};

export function AppSidebar() {
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUserName(localStorage.getItem("username") || "");
        setUserRole(localStorage.getItem("role") || "user");
      } catch (err) {
        console.error("Error fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  const items = menuItems[userRole] || [];

  const handleLogout = async () => {
    try {
      const refresh = localStorage.getItem("refresh_token");
      const access = localStorage.getItem("access_token");

      // Kirim refresh token ke endpoint logout/blacklist
      const res = await fetch("https://sirsakapi.teknohole.com/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${access}`,
        },
        body: JSON.stringify({ refresh }),
      });

      if (!res.ok) {
        console.warn("Logout API gagal:", await res.json());
      }

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("email");

      alert("Logout berhasil.");

      navigate("/");
    } catch (error) {
      console.error("Error saat logout:", error);
      localStorage.clear();
      navigate("/");
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
              <SidebarTrigger className="h-7 w-7 hover:bg-primary/10" />
            </div>

            <div className="flex items-center space-x-2 p-2 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {userName || "Loading..."}
                </p>
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
            <SidebarTrigger className="h-6 w-6 hover:bg-primary/10" />
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
                      className={({ isActive }) =>
                        `${isActive 
                          ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
                          : "hover:bg-muted/50 hover:text-foreground"
                        } flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group`
                      }
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
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-4 border-t">
        {!collapsed ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>
        ) : (
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full p-2 hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
