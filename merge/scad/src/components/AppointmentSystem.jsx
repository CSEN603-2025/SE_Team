import React, { useState } from 'react';
import './AppointmentSystem.css';

const initialUsers = [
  { id: 1, name: 'SCAD Officer', role: 'SCAD Office', online: true },
  { id: 2, name: 'Student', role: 'Student', online: true }
];

export default function AppointmentSystem({ currentUser }) {
  const [appointments, setAppointments] = useState([]);
  const [notification, setNotification] = useState(null);
  const [selectedUser, setSelectedUser] = useState(initialUsers[1].id);
  const [topic, setTopic] = useState('Career Guidance');
  const [actionLoading, setActionLoading] = useState(null);

  // Simulate requesting an appointment
  const handleRequest = () => {
    const recipient = initialUsers.find(u => u.id === selectedUser);
    setAppointments(appts => [
      ...appts,
      {
        id: Date.now(),
        from: currentUser.name,
        to: recipient.name,
        topic,
        status: 'Pending'
      }
    ]);
    setNotification(`Appointment requested with ${recipient.name} for ${topic}`);
    setTimeout(() => setNotification(null), 3000);
  };

  // Simulate accepting/rejecting an appointment
  const handleRespond = (id, status) => {
    setActionLoading(id);
    setTimeout(() => {
      setAppointments(appts =>
        appts.map(a =>
          a.id === id ? { ...a, status } : a
        )
      );
      setNotification(`Appointment ${status.toLowerCase()}`);
      setActionLoading(null);
      setTimeout(() => setNotification(null), 3000);
    }, 600);
  };

  // Simulate notification when accepted
  React.useEffect(() => {
    const accepted = appointments.find(a => a.status === 'Accepted' && a.to === currentUser.name);
    if (accepted) {
      setNotification(`Your appointment with ${accepted.from} was accepted!`);
      setTimeout(() => setNotification(null), 3000);
    }
  }, [appointments, currentUser.name]);

  return (
    <div className="appointment-system-card">
      <h2>Appointments</h2>
      <div className="helper-text">Request or manage appointments for video calls, career guidance, or report clarifications.</div>
      <div className="appointment-request-group">
        <label htmlFor="user-select">Request appointment with:</label>
        <select id="user-select" value={selectedUser} onChange={e => setSelectedUser(Number(e.target.value))}>
          {initialUsers.filter(u => u.name !== currentUser.name).map(u => (
            <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
          ))}
        </select>
        <select value={topic} onChange={e => setTopic(e.target.value)}>
          <option value="Career Guidance">Career Guidance</option>
          <option value="Report Clarification">Report Clarification</option>
        </select>
        <button className="request-btn" onClick={handleRequest} aria-label="Request appointment">Request Appointment</button>
      </div>

      {notification && <div className="notification" role="status">{notification}</div>}

      <div className="appointments-section">
        <h3>Pending Appointments</h3>
        <ul className="appointments-list">
          {appointments.filter(a => a.status === 'Pending' && a.to === currentUser.name).length === 0 && (
            <li className="empty-state">
              <div className="empty-icon" aria-hidden="true">📅</div>
              <div>No pending appointments.</div>
            </li>
          )}
          {appointments.filter(a => a.status === 'Pending' && a.to === currentUser.name).map(a => (
            <li key={a.id} className="appointment-item">
              <span className="appointment-info">{a.from} requests <b>{a.topic}</b></span>
              <div className="actions-group">
                <button
                  className="accept-btn"
                  aria-label={`Accept appointment from ${a.from}`}
                  disabled={actionLoading === a.id}
                  onClick={() => handleRespond(a.id, 'Accepted')}
                >
                  {actionLoading === a.id ? 'Accepting…' : 'Accept'}
                </button>
                <button
                  className="reject-btn"
                  aria-label={`Reject appointment from ${a.from}`}
                  disabled={actionLoading === a.id}
                  onClick={() => handleRespond(a.id, 'Rejected')}
                >
                  {actionLoading === a.id ? 'Rejecting…' : 'Reject'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="appointments-section">
        <h3>Your Requests</h3>
        <ul className="appointments-list">
          {appointments.filter(a => a.from === currentUser.name).length === 0 && (
            <li className="empty-state">
              <div className="empty-icon" aria-hidden="true">📄</div>
              <div>No appointment requests sent.</div>
            </li>
          )}
          {appointments.filter(a => a.from === currentUser.name).map(a => (
            <li key={a.id} className="appointment-item">
              <span className="appointment-info">To <b>{a.to}</b> ({a.topic}) - <span className={`status-badge status-${a.status.toLowerCase()}`}>{a.status}</span></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 