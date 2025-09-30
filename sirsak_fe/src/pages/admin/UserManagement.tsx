import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  User,
  UserPlus,
  Search,
  Filter,
  Edit,
  Trash2,
  Shield,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const UserManagement = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    studentId: "",
    department: ""
  });

  // Mock data for users
  const [users] = useState([
    {
      id: 1,
      name: "Ahmad Rizki Maulana",
      email: "ahmad.rizki@email.com",
      role: "student",
      phone: "08123456789",
      studentId: "2021001",
      department: "Sistem Informasi",
      status: "active",
      lastLogin: "2024-01-19 10:30",
      joinDate: "2021-08-15"
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      email: "siti.nur@email.com", 
      role: "student",
      phone: "08234567890",
      studentId: "2021002",
      department: "Teknik Informatika",
      status: "active",
      lastLogin: "2024-01-19 09:15",
      joinDate: "2021-08-15"
    },
    {
      id: 3,
      name: "Dr. Ahmad Susanto, M.Kom",
      email: "dr.ahmad@university.ac.id",
      role: "lecturer",
      phone: "08345678901",
      employeeId: "L001",
      department: "Sistem Informasi", 
      status: "active",
      lastLogin: "2024-01-19 08:45",
      joinDate: "2015-03-01"
    },
    {
      id: 4,
      name: "Dr. Siti Aminah, M.T",
      email: "dr.siti@university.ac.id",
      role: "lecturer",
      phone: "08456789012",
      employeeId: "L002",
      department: "Teknik Informatika",
      status: "active", 
      lastLogin: "2024-01-18 16:20",
      joinDate: "2018-09-01"
    },
    {
      id: 5,
      name: "Budi Santoso",
      email: "budi.santoso@email.com",
      role: "student",
      phone: "08567890123", 
      studentId: "2020005",
      department: "Sistem Informasi",
      status: "inactive",
      lastLogin: "2024-01-10 14:30",
      joinDate: "2020-08-15"
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'student':
        return <Badge className="bg-blue-500 text-white">Mahasiswa</Badge>;
      case 'lecturer':
        return <Badge className="bg-green-500 text-white">Dosen</Badge>;
      case 'admin':
        return <Badge className="bg-purple-500 text-white">Admin</Badge>;
      default:
        return <Badge variant="secondary">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'active' 
      ? <Badge className="bg-success text-white">Aktif</Badge>
      : <Badge className="bg-muted text-muted-foreground">Tidak Aktif</Badge>;
  };

  const handleAddUser = () => {
    // Basic validation
    if (!newUser.name || !newUser.email || !newUser.role) {
      toast({
        title: "Mohon lengkapi field yang wajib diisi",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Pengguna berhasil ditambahkan!",
      description: `${newUser.name} telah ditambahkan sebagai ${newUser.role}`,
    });

    setNewUser({
      name: "",
      email: "",
      role: "",
      phone: "",
      studentId: "",
      department: ""
    });
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (userId: number, userName: string) => {
    toast({
      title: "Pengguna berhasil dihapus",
      description: `${userName} telah dihapus dari sistem`,
    });
  };

  const handleToggleStatus = (userId: number, userName: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    toast({
      title: `Status pengguna diubah`,
      description: `${userName} sekarang ${newStatus === 'active' ? 'aktif' : 'tidak aktif'}`,
    });
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Manajemen Pengguna</h1>
          <p className="text-muted-foreground mt-1">Kelola data mahasiswa dan dosen</p>
        </div>
        
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <UserPlus className="h-4 w-4 mr-2" />
              Tambah Pengguna
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Tambah Pengguna Baru</DialogTitle>
              <DialogDescription>
                Lengkapi informasi pengguna baru yang akan ditambahkan
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    placeholder="Masukkan nama lengkap"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({...prev, name: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@domain.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role *</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser(prev => ({...prev, role: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Mahasiswa</SelectItem>
                      <SelectItem value="lecturer">Dosen</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">No. Telepon</Label>
                  <Input
                    id="phone"
                    placeholder="08xxxxxxxxxx"
                    value={newUser.phone}
                    onChange={(e) => setNewUser(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {newUser.role === 'student' && (
                  <div className="space-y-2">
                    <Label htmlFor="studentId">NIM</Label>
                    <Input
                      id="studentId"
                      placeholder="Nomor Induk Mahasiswa"
                      value={newUser.studentId}
                      onChange={(e) => setNewUser(prev => ({...prev, studentId: e.target.value}))}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="department">Jurusan/Departemen</Label>
                  <Select value={newUser.department} onValueChange={(value) => setNewUser(prev => ({...prev, department: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jurusan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                      <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                      <SelectItem value="Manajemen">Manajemen</SelectItem>
                      <SelectItem value="Akuntansi">Akuntansi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Batal
                </Button>
                <Button onClick={handleAddUser}>
                  Simpan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Pengguna</p>
                <p className="text-3xl font-bold text-primary">{users.length}</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mahasiswa</p>
                <p className="text-3xl font-bold text-blue-500">{users.filter(u => u.role === 'student').length}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dosen</p>
                <p className="text-3xl font-bold text-green-500">{users.filter(u => u.role === 'lecturer').length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft hover:shadow-medium transition-all hover-scale">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pengguna Aktif</p>
                <p className="text-3xl font-bold text-success">{users.filter(u => u.status === 'active').length}</p>
              </div>
              <Shield className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="mb-6 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2 text-primary" />
            Filter & Pencarian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Cari Pengguna</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Nama atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role-filter">Filter Role</Label>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Semua role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Role</SelectItem>
                  <SelectItem value="student">Mahasiswa</SelectItem>
                  <SelectItem value="lecturer">Dosen</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm("");
                  setFilterRole("");
                }}
                className="w-full"
              >
                Reset Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Daftar Pengguna ({filteredUsers.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Nama</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">ID/NIM</th>
                  <th className="text-left py-3 px-4">Departemen</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Login</th>
                  <th className="text-center py-3 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {user.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm">
                        {user.role === 'student' ? user.studentId : user.employeeId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {user.department}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(user.lastLogin).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.name, user.status)}>
                            <Shield className="h-4 w-4 mr-2" />
                            {user.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => handleDeleteUser(user.id, user.name)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada pengguna ditemukan</h3>
              <p className="text-muted-foreground">
                Coba ubah filter pencarian Anda
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;