// Mock data
const reservations = [
  {
    id: "1",
    roomId: "1",
    roomName: "Ruang Kuliah A101",
    userId: "student1",
    userName: "Ahmad Rizki",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Presentasi Tugas Akhir",
    attendees: 25,
    status: "pending",
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "2",
    roomId: "2",
    roomName: "Lab Komputer B201",
    userId: "student2",
    userName: "Sari Dewi",
    date: "2024-01-16",
    startTime: "13:00",
    endTime: "15:00",
    purpose: "Praktikum Pemrograman",
    attendees: 30,
    status: "approved",
    createdAt: "2024-01-09T14:30:00Z",
    approvedBy: "Dr. Budi Santoso",
    approvedAt: "2024-01-10T08:00:00Z",
  },
  {
    id: "3",
    roomId: "3",
    roomName: "Ruang Seminar C301",
    userId: "student3",
    userName: "Andi Pratama",
    date: "2024-01-14",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Workshop UI/UX Design",
    attendees: 20,
    status: "rejected",
    createdAt: "2024-01-08T16:00:00Z",
    rejectionReason: "Ruangan sudah dibooking untuk acara lain",
  },
]

export function getAllReservations() {
  return reservations
}

export function getReservationById(id) {
  return reservations.find((reservation) => reservation.id === id)
}

export function getReservationsByUserId(userId) {
  return reservations.filter((reservation) => reservation.userId === userId)
}

export function getReservationsByStatus(status) {
  return reservations.filter((reservation) => reservation.status === status)
}

export async function createReservation(data) {
  // In a real app, this would save to database
  const newReservation = {
    id: (reservations.length + 1).toString(),
    roomName: `Room ${data.roomId}`, // In real app, fetch room name
    status: "pending",
    createdAt: new Date().toISOString(),
    ...data,
  }

  reservations.push(newReservation)
  return newReservation
}

export async function updateReservationStatus(id, status, rejectionReason) {
  const index = reservations.findIndex((reservation) => reservation.id === id)
  if (index === -1) return null

  reservations[index] = {
    ...reservations[index],
    status,
    rejectionReason,
    ...(status === "approved" && {
      approvedBy: "Current Lecturer", // In real app, get from auth
      approvedAt: new Date().toISOString(),
    }),
  }

  return reservations[index]
}

export function getReservationStats() {
  const total = reservations.length
  const pending = reservations.filter((r) => r.status === "pending").length
  const approved = reservations.filter((r) => r.status === "approved").length
  const rejected = reservations.filter((r) => r.status === "rejected").length

  return {
    total,
    pending,
    approved,
    rejected,
    approvalRate: total > 0 ? Math.round((approved / total) * 100) : 0,
  }
}
