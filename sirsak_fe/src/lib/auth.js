"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Mock user data
const mockUsers = [
  {
    id: "1",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@student.univ.ac.id",
    role: "mahasiswa",
    studentId: "2021001001",
    avatar: "/diverse-students-studying.png",
  },
  {
    id: "2",
    name: "Dr. Siti Nurhaliza",
    email: "siti.nurhaliza@univ.ac.id",
    role: "dosen",
    avatar: "/lecturer.jpg",
  },
  {
    id: "3",
    name: "Budi Santoso",
    email: "budi.santoso@admin.univ.ac.id",
    role: "admin",
    avatar: "/admin-interface.png",
  },
]

export async function authenticate(email, password, role) {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = mockUsers.find((u) => u.email === email && u.role === role)
  return user || null
}

export function getCurrentUser() {
  // In a real app, this would check session/token
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("currentUser")
    return userData ? JSON.parse(userData) : null
  }
  return null
}

export function setCurrentUser(user) {
  if (typeof window !== "undefined") {
    localStorage.setItem("currentUser", JSON.stringify(user))
  }
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("currentUser")
  }
}

// Auth Context
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setLoading(false)
  }, [])

  const login = async (email, password, role) => {
    const authenticatedUser = await authenticate(email, password, role)
    if (authenticatedUser) {
      setCurrentUser(authenticatedUser)
      setUser(authenticatedUser)
    }
    return authenticatedUser
  }

  const logoutUser = () => {
    logout()
    setUser(null)
  }

  const value = {
    user,
    login,
    logout: logoutUser,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
