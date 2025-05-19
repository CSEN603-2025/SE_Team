import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialAppointments = [
  { id: 1, with: 'SCAD Officer', date: '2024-06-12 14:00', status: 'Pending' },
  { id: 2, with: 'Career Advisor', date: '2024-06-15 10:00', status: 'Accepted' }
];

export default function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [modal, setModal] = useState(null); // {mode: 'join', appointment: {...}}
  const [form, setForm] = useState({ with: '', date: '' });

  const openRequest = () => {
    setForm({ with: '', date: '' });
    setModal({ mode: 'request' });
  };
  const openJoin = (appointment) => {
    setModal({ mode: 'join', appointment });
  };
  const closeModal = () => setModal(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleRequest = () => {
    setAppointments([...appointments, { ...form, id: Date.now(), status: 'Pending' }]);
    closeModal();
  };

  const handleAccept = id => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'Accepted' } : a));
  };

  return (
    <DashboardLayout title="Appointments & Video Calls">
      <div style={{ maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Appointments & Video Calls</h2>
        <button className="action-button" onClick={openRequest} style={{ marginBottom: 20 }}>Request Appointment</button>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>With</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No appointments yet.</td></tr>
            ) : appointments.map(a => (
              <tr key={a.id}>
                <td>{a.with}</td>
                <td>{a.date}</td>
                <td>{a.status}</td>
                <td>
                  {a.status === 'Pending' && (
                    <button className="action-button" onClick={() => handleAccept(a.id)}>Accept</button>
                  )}
                  {a.status === 'Accepted' && (
                    <button className="action-button" onClick={() => openJoin(a)}>Join Call</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && modal.mode === 'request' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 400, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Request Appointment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input name="with" value={form.with} onChange={handleChange} placeholder="With (e.g. SCAD Officer)" className="modern-input" />
                <input name="date" type="datetime-local" value={form.date} onChange={handleChange} className="modern-input" />
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
                <button className="action-button" onClick={handleRequest}>Request</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {modal && modal.mode === 'join' && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 600, boxShadow: '0 2px 12px #0002', position: 'relative', textAlign: 'center' }}>
              <h3>Video Call with {modal.appointment.with}</h3>
              <div style={{ background: '#222', borderRadius: 8, height: 220, margin: '24px 0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                [Simulated Video Call]
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button className="action-button">Mute</button>
                <button className="action-button">Unmute</button>
                <button className="action-button">Share Screen</button>
                <button className="action-button" style={{ background: '#eee', color: '#333' }} onClick={closeModal}>Leave Call</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 