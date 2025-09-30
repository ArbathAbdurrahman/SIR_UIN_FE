import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Calendar, Users, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import universityHero from "@/assets/university-hero.jpg";

const Landing = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: ""
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: ""
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login - redirect based on role
    if (loginData.role === "mahasiswa") {
      navigate("/student/dashboard");
    } else if (loginData.role === "dosen") {
      navigate("/lecturer/dashboard");
    } else if (loginData.role === "admin") {
      navigate("/admin/dashboard");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Simulate registration success
    console.log("Registration data:", registerData);
  };

  return (
    <div className="min-h-screen bg-gradient-hero animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-pulse-glow"
          style={{ backgroundImage: `url(${universityHero})` }}
        />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-slide-up">
              Sistem Informasi Ruangan
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Platform terintegrasi untuk manajemen ruangan akademik dengan sistem reservasi yang efisien dan mudah digunakan
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col items-center hover-lift group">
                <Building2 className="h-12 w-12 mb-4 group-hover:animate-bounce-gentle group-hover:text-primary-light transition-colors duration-300" />
                <h3 className="text-lg font-semibold group-hover:text-primary-light transition-colors duration-300">Manajemen Ruangan</h3>
                <p className="text-sm opacity-80">Kelola ketersediaan dan jadwal ruangan</p>
              </div>
              <div className="flex flex-col items-center hover-lift group">
                <Calendar className="h-12 w-12 mb-4 group-hover:animate-bounce-gentle group-hover:text-primary-light transition-colors duration-300" />
                <h3 className="text-lg font-semibold group-hover:text-primary-light transition-colors duration-300">Reservasi Online</h3>
                <p className="text-sm opacity-80">Ajukan peminjaman ruangan dengan mudah</p>
              </div>
              <div className="flex flex-col items-center hover-lift group">
                <Users className="h-12 w-12 mb-4 group-hover:animate-bounce-gentle group-hover:text-primary-light transition-colors duration-300" />
                <h3 className="text-lg font-semibold group-hover:text-primary-light transition-colors duration-300">Multi Role Access</h3>
                <p className="text-sm opacity-80">Akses berbeda untuk mahasiswa, dosen, dan admin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto animate-scale-in">
            <Card className="shadow-large hover:shadow-large hover:-translate-y-2 transition-all duration-500">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-primary">Akses Sistem</CardTitle>
                <CardDescription>
                  Masuk atau daftar untuk menggunakan sistem informasi ruangan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Masuk</TabsTrigger>
                    <TabsTrigger value="register">Daftar</TabsTrigger>
                  </TabsList>
                  
                  {/* Login Tab */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="nama@universitas.ac.id"
                          value={loginData.email}
                          onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-role">Role</Label>
                        <Select value={loginData.role} onValueChange={(value) => setLoginData({...loginData, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role Anda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                            <SelectItem value="dosen">Dosen</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 button-glow">
                        Masuk
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Register Tab */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Nama Lengkap</Label>
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Nama lengkap Anda"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="nama@universitas.ac.id"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm">Konfirmasi Password</Label>
                        <Input
                          id="register-confirm"
                          type="password"
                          value={registerData.confirmPassword}
                          onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-role">Role</Label>
                        <Select value={registerData.role} onValueChange={(value) => setRegisterData({...registerData, role: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role Anda" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                            <SelectItem value="dosen">Dosen</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 button-glow">
                        Daftar
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary animate-slide-up">
              Fitur Unggulan Sistem
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start space-x-4 hover-lift group">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0 group-hover:animate-bounce-gentle" />
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-300">Permohonan Peminjaman Online</h3>
                  <p className="text-muted-foreground">Sistem persetujuan berjenjang dengan notifikasi real-time</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Pencarian Ruangan Cepat</h3>
                  <p className="text-muted-foreground">Filter berdasarkan kapasitas, lokasi, dan fasilitas pendukung</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Integrasi Kalender</h3>
                  <p className="text-muted-foreground">Sinkronisasi dengan kalender akademik kampus</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-success mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">Sistem Feedback</h3>
                  <p className="text-muted-foreground">Evaluasi dan feedback pengguna untuk peningkatan layanan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;

