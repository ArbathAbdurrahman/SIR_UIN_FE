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
    username: "",
    password: ""
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    password1: "",
    password2: "",
    username: "",
    first_name: "",
    last_name: ""
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload dikirim:", loginData);

      const response = await fetch("https://sirsakapi.teknohole.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error("Login gagal");
      }

      const data = await response.json();

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("email", data.user.email);
      localStorage.setItem("role", data.user.role);

      const role = localStorage.getItem("role"); 
      navigate(`/${role}/dashboard`);
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login gagal. Periksa username/password.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      console.log("Payload dikirim:", registerData);

      const response = await fetch("https://sirsakapi.teknohole.com/api/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include", 
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert(data.message || "Pendaftaran berhasil. Silahkan login.");
      } else {
        alert(data.message || "Pendaftaran gagal. Periksa data yang kamu masukkan.");
      }
    } catch (error) {
      console.error("Error during register:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
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
                        <Label htmlFor="login-username">Username</Label>
                        <Input
                          id="login-username"
                          type="text"
                          name="username"
                          placeholder="Username Anda"
                          value={loginData.username}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          type="password"
                          name="password"
                          value={loginData.password}
                          onChange={handleForm}
                          required
                        />
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
                        <Label htmlFor="register-username">Username</Label>
                        <Input
                          id="register-username"
                          type="text"
                          name="username"
                          placeholder="Username Anda"
                          value={registerData.username}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          name="email"
                          placeholder="nama@universitas.ac.id"
                          value={registerData.email}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-first-name">Nama Depan</Label>
                        <Input
                          id="register-first-name"
                          type="text"
                          name="first_name"
                          value={registerData.first_name}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-last-name">Nama Akhir</Label>
                        <Input
                          id="register-last-name"
                          type="text"
                          name="last_name"
                          value={registerData.last_name}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password1">Password</Label>
                        <Input
                          id="register-password1"
                          type="password"
                          name="password1"
                          value={registerData.password1}
                          onChange={handleForm}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-password2">Konfirmasi Password</Label>
                        <Input
                          id="register-password2"
                          type="password"
                          name="password2"
                          value={registerData.password2}
                          onChange={handleForm}
                          required
                        />
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

