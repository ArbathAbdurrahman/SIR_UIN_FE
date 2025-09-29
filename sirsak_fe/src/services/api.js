// Mock API service for React app
// In a real app, this would make HTTP requests to a backend

import { getAllReservations, getReservationById, createReservation, updateReservationStatus } from "../lib/reservations"
import { getAllRooms, searchRooms } from "../lib/rooms"
import { getNotificationsByUserId, markNotificationAsRead, createNotification } from "../lib/notifications"

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const api = {
  // Reservations
  async getReservations() {
    await delay(500)
    return getAllReservations()
  },

  async getReservation(id) {
    await delay(300)
    return getReservationById(id)
  },

  async createReservation(data) {
    await delay(800)
    return createReservation(data)
  },

  async updateReservation(id, status, rejectionReason) {
    await delay(600)
    return updateReservationStatus(id, status, rejectionReason)
  },

  // Rooms
  async getRooms() {
    await delay(400)
    return getAllRooms()
  },

  async searchRooms(filters) {
    await delay(600)
    return searchRooms(filters)
  },

  // Notifications
  async getNotifications(userId) {
    await delay(300)
    return getNotificationsByUserId(userId)
  },

  async markNotificationRead(notificationId) {
    await delay(200)
    return markNotificationAsRead(notificationId)
  },

  async createNotification(data) {
    await delay(300)
    return createNotification(data)
  },
}
