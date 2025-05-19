import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { FaBell, FaCheck, FaTrash } from 'react-icons/fa';

const initialNotifications = [
  { id: 1, type: 'Internship', message: 'Your application for Amazon Cloud Intern was accepted!', date: '2024-06-10', read: false },
  { id: 2, type: 'Workshop', message: 'Workshop "AI in Industry" starts tomorrow at 10:00.', date: '2024-06-09', read: false },
  { id: 3, type: 'Report', message: 'Your internship report was submitted successfully.', date: '2024-06-08', read: true }
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = id => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };
  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <DashboardLayout title="Notifications">
      <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 24 }}>Notifications</h2>
        <button className="action-button" onClick={clearAll} style={{ marginBottom: 20, background: '#eee', color: '#333', float: 'right' }}><FaTrash /> Clear All</button>
        <div style={{ clear: 'both' }} />
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>No notifications.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notifications.map(n => (
              <li key={n.id} style={{ background: n.read ? '#F5F5F5' : '#E8F6EF', borderRadius: 10, marginBottom: 16, padding: 18, display: 'flex', alignItems: 'center', boxShadow: '0 1px 4px #0001' }}>
                <FaBell color={n.read ? '#bbb' : '#4F8A8B'} size={22} style={{ marginRight: 16 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: n.read ? 400 : 600 }}>{n.message}</div>
                  <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>{n.type} • {n.date}</div>
                </div>
                {!n.read && (
                  <button className="action-button" title="Mark as read" style={{ padding: 8, borderRadius: '50%' }} onClick={() => markAsRead(n.id)}><FaCheck /></button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </DashboardLayout>
  );
} 