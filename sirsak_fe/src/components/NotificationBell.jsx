"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu"
import { Bell, Check, X } from "lucide-react"
import { useAuth } from "../lib/auth"
import { getUnreadNotifications, markNotificationAsRead } from "../lib/notifications"

export function NotificationBell() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (user) {
      const unread = getUnreadNotifications(user.id)
      setNotifications(unread)
      setUnreadCount(unread.length)
    }
  }, [user])

  const handleMarkAsRead = (notificationId) => {
    markNotificationAsRead(notificationId)
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />
      case "error":
        return <X className="w-4 h-4 text-red-500" />
      case "warning":
        return <Bell className="w-4 h-4 text-yellow-500" />
      default:
        return <Bell className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">Tidak ada notifikasi baru</div>
        ) : (
          notifications.slice(0, 5).map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className="flex items-start gap-3 p-3 cursor-pointer"
              onClick={() => handleMarkAsRead(notification.id)}
            >
              {getNotificationIcon(notification.type)}
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString("id-ID")}
                </p>
              </div>
            </DropdownMenuItem>
          ))
        )}
        {notifications.length > 5 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-muted-foreground">
              +{notifications.length - 5} notifikasi lainnya
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
