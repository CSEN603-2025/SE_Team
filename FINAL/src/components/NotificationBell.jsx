import React, { useState, useRef, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from './NotificationProvider';
import './NotificationBell.css';

export default function NotificationBell() {
  const { notifications, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const bellRef = useRef();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="notification-bell-wrapper" ref={bellRef}>
      <button className="notification-bell-btn" onClick={() => setOpen(o => !o)}>
        <FaBell />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>
      {open && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <span>Notifications</span>
            {unreadCount > 0 && <button className="mark-all-btn" onClick={markAllAsRead}>Mark all as read</button>}
          </div>
          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="notification-empty">No notifications</div>
            ) : notifications.map(n => (
              <div key={n.id} className={`notification-item ${n.read ? 'read' : 'unread'} notification-${n.type}`}>
                <div className="notification-message">{n.message}</div>
                <div className="notification-meta">{n.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 