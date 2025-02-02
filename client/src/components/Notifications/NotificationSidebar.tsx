import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NotificationSidebar.css"; // Add styles for the sidebar

interface Notification {
  id: string;
  message: string;
  date: string;
  isRead: boolean;
}

const NotificationSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Fetch notifications from the backend
  useEffect(() => {
    axios.get("/api/notifications")
      .then((response) => setNotifications(response.data))
      .catch((error) => console.error("Error fetching notifications:", error));
  }, []);

  // Mark a notification as read
  const markAsRead = (id: string) => {
    axios.patch(`/api/notifications/${id}/read`)
      .then(() => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
      })
      .catch((error) => console.error("Error marking notification as read:", error));
  };

  return (
    <div className={`notification-sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Notifications</h2>
        <button onClick={onClose} className="close-btn">
          &times;
        </button>
      </div>
      <div className="notification-list">
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.isRead ? "read" : "unread"}`}
              onClick={() => markAsRead(notification.id)}
            >
              <p>{notification.message}</p>
              <small>{new Date(notification.date).toLocaleString()}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSidebar;