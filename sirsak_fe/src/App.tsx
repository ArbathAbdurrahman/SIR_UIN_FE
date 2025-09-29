import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Landing from "./pages/Landing";
import StudentDashboard from "./pages/student/Dashboard";
import RoomSearch from "./pages/student/RoomSearch";
import ReservationForm from "./pages/student/ReservationForm";
import ReservationStatus from "./pages/student/ReservationStatus";
import Feedback from "./pages/student/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/search" element={<RoomSearch />} />
          <Route path="/student/reserve" element={<ReservationForm />} />
          <Route path="/student/status" element={<ReservationStatus />} />
          <Route path="/student/feedback" element={<Feedback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
