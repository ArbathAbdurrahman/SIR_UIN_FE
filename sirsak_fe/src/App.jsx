"use client"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./lib/auth"
import LandingPage from "./pages/LandingPage"
import StudentDashboard from "./pages/student/Dashboard"
import StudentSearch from "./pages/student/Search"
import StudentReserve from "./pages/student/Reserve"
import StudentStatus from "./pages/student/Status"
import StudentReservations from "./pages/student/Reservations"
import LecturerDashboard from "./pages/lecturer/Dashboard"
import LecturerApprovals from "./pages/lecturer/Approvals"
import LecturerSchedule from "./pages/lecturer/Schedule"
import LecturerReports from "./pages/lecturer/Reports"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminRooms from "./pages/admin/Rooms"
import AdminUsers from "./pages/admin/Users"
import AdminReports from "./pages/admin/Reports"
import "./App.css"

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Student Routes */}
            <Route
              path="/student/dashboard"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/search"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentSearch />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/reserve"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentReserve />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/status"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentStatus />
                </ProtectedRoute>
              }
            />
            <Route
              path="/student/reservations"
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentReservations />
                </ProtectedRoute>
              }
            />

            {/* Lecturer Routes */}
            <Route
              path="/lecturer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["lecturer"]}>
                  <LecturerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lecturer/approvals"
              element={
                <ProtectedRoute allowedRoles={["lecturer"]}>
                  <LecturerApprovals />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lecturer/schedule"
              element={
                <ProtectedRoute allowedRoles={["lecturer"]}>
                  <LecturerSchedule />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lecturer/reports"
              element={
                <ProtectedRoute allowedRoles={["lecturer"]}>
                  <LecturerReports />
                </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/rooms"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminRooms />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminReports />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
