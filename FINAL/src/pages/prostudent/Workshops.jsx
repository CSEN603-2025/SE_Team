import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const initialWorkshops = [
  { id: 1, title: 'Career Planning', date: '2024-06-10', status: 'Upcoming', registered: false, attended: false, rated: false },
  { id: 2, title: 'AI in Industry', date: '2024-05-20', status: 'Live', registered: true, attended: false, rated: false },
  { id: 3, title: 'Resume Building', date: '2024-04-15', status: 'Completed', registered: true, attended: true, rated: true, certificate: true }
];

export default function Workshops() {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [modal, setModal] = useState(null); // {mode: 'join', workshop: {...}}
  const [notes, setNotes] = useState('');
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState('');
  const [rating, setRating] = useState(0);

  const handleRegister = id => {
    setWorkshops(ws => ws.map(w => w.id === id ? { ...w, registered: true } : w));
  };
  const openJoin = (workshop) => {
    setModal({ mode: 'join', workshop });
    setNotes('');
    setChat([]);
    setMsg('');
    setRating(0);
  };
  const closeModal = () => setModal(null);

  const handleSend = () => {
    if (msg.trim()) {
      setChat([...chat, { user: 'You', text: msg }]);
      setMsg('');
    }
  };
  const handleRate = (id, r) => {
    setWorkshops(ws => ws.map(w => w.id === id ? { ...w, rated: true } : w));
    setRating(r);
  };

  return (
    <DashboardLayout title="Workshops">
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Workshops</h2>
        <table className="modern-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workshops.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>No workshops yet.</td></tr>
            ) : workshops.map(w => (
              <tr key={w.id}>
                <td>{w.title}</td>
                <td>{w.date}</td>
                <td>{w.status}</td>
                <td>
                  {!w.registered && (
                    <button className="action-button" onClick={() => handleRegister(w.id)}>Register</button>
                  )}
                  {w.status === 'Live' && w.registered && (
                    <button className="action-button" onClick={() => openJoin(w)}>Join</button>
                  )}
                  {w.status === 'Completed' && w.attended && w.certificate && (
                    <a href="#" download className="action-button" style={{ background: '#3A6351', color: '#fff' }}>Download Certificate</a>
                  )}
                  {w.status === 'Completed' && w.attended && !w.rated && (
                    <button className="action-button" onClick={() => handleRate(w.id, 5)}>Rate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {modal && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div style={{ background: '#fff', borderRadius: 12, padding: 32, minWidth: 350, maxWidth: 600, boxShadow: '0 2px 12px #0002', position: 'relative' }}>
              <h3>Live Workshop: {modal.workshop.title}</h3>
              <div style={{ marginBottom: 16 }}>
                <video width="100%" controls style={{ borderRadius: 8, background: '#eee' }}>
                  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <h4>Notes</h4>
                  <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Take notes..." className="modern-input" style={{ width: '100%', minHeight: 80 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4>Chat</h4>
                  <div style={{ background: '#F5F5F5', borderRadius: 8, minHeight: 80, maxHeight: 120, overflowY: 'auto', marginBottom: 8, padding: 8 }}>
                    {chat.length === 0 ? <div style={{ color: '#888' }}>No messages yet.</div> : chat.map((c, i) => <div key={i}><b>{c.user}:</b> {c.text}</div>)}
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type a message..." className="modern-input" style={{ flex: 1 }} />
                    <button className="action-button" onClick={handleSend}>Send</button>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16, textAlign: 'right' }}>
                <button className="action-button" onClick={closeModal}>Leave Workshop</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 