// Mock room data
export const mockRooms = [
  {
    id: "1",
    name: "Ruang Kuliah A101",
    type: "classroom",
    capacity: 50,
    location: "Gedung A, Lantai 1",
    facilities: ["Proyektor", "AC", "Whiteboard", "Sound System"],
    image: "/diverse-classroom.png",
    available: true,
    description: "Ruang kuliah standar dengan fasilitas lengkap untuk pembelajaran",
  },
  {
    id: "2",
    name: "Lab Komputer B201",
    type: "computer_lab",
    capacity: 30,
    location: "Gedung B, Lantai 2",
    facilities: ["30 PC", "Proyektor", "AC", "Jaringan Internet"],
    image: "/computer-lab.png",
    available: true,
    description: "Laboratorium komputer dengan PC terbaru dan koneksi internet cepat",
  },
  {
    id: "3",
    name: "Auditorium Utama",
    type: "auditorium",
    capacity: 300,
    location: "Gedung Utama, Lantai 1",
    facilities: ["Sound System", "Lighting", "Proyektor", "AC", "Stage"],
    image: "/auditorium.jpg",
    available: false,
    description: "Auditorium besar untuk acara dan seminar dengan kapasitas 300 orang",
  },
  {
    id: "4",
    name: "Ruang Seminar C301",
    type: "seminar_room",
    capacity: 80,
    location: "Gedung C, Lantai 3",
    facilities: ["Proyektor", "AC", "Sound System", "Flipchart"],
    image: "/seminar-room.png",
    available: true,
    description: "Ruang seminar modern untuk presentasi dan diskusi kelompok",
  },
  {
    id: "5",
    name: "Lab Fisika D101",
    type: "laboratory",
    capacity: 25,
    location: "Gedung D, Lantai 1",
    facilities: ["Peralatan Lab", "Fume Hood", "AC", "Emergency Shower"],
    image: "/physics-lab.png",
    available: true,
    description: "Laboratorium fisika dengan peralatan eksperimen lengkap",
  },
  {
    id: "6",
    name: "Ruang Meeting E201",
    type: "meeting_room",
    capacity: 15,
    location: "Gedung E, Lantai 2",
    facilities: ["TV LED", "AC", "Whiteboard", "Coffee Machine"],
    image: "/modern-meeting-room.png",
    available: true,
    description: "Ruang meeting eksekutif untuk rapat dan diskusi kecil",
  },
]

export function searchRooms(filters = {}) {
  let filteredRooms = [...mockRooms]

  if (filters.type && filters.type !== "all") {
    filteredRooms = filteredRooms.filter((room) => room.type === filters.type)
  }

  if (filters.capacity) {
    filteredRooms = filteredRooms.filter((room) => room.capacity >= Number.parseInt(filters.capacity))
  }

  if (filters.location) {
    filteredRooms = filteredRooms.filter((room) => room.location.toLowerCase().includes(filters.location.toLowerCase()))
  }

  if (filters.available !== undefined) {
    filteredRooms = filteredRooms.filter((room) => room.available === filters.available)
  }

  return filteredRooms
}

export function getAllRooms() {
  return mockRooms
}

export function getRoomById(id) {
  return mockRooms.find((room) => room.id === id)
}
