import React, { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

export default function Settings() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('English');
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');

  const handlePasswordChange = e => {
    e.preventDefault();
    if (password && password === confirm) {
      setMsg('Password changed successfully! (dummy)');
      setPassword('');
      setConfirm('');
    } else {
      setMsg('Passwords do not match.');
    }
  };

  return (
    <DashboardLayout title="Settings">
      <div style={{ maxWidth: 600, margin: '0 auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #0001', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Settings</h2>
        <div style={{ marginBottom: 32 }}>
          <h4>Profile Preferences</h4>
          <label>Theme:
            <select value={theme} onChange={e => setTheme(e.target.value)} className="modern-input" style={{ marginLeft: 8 }}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label style={{ marginLeft: 24 }}>Language:
            <select value={language} onChange={e => setLanguage(e.target.value)} className="modern-input" style={{ marginLeft: 8 }}>
              <option value="English">English</option>
              <option value="Arabic">Arabic</option>
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 32 }}>
          <h4>Notification Settings</h4>
          <label style={{ display: 'block', marginBottom: 8 }}>
            <input type="checkbox" checked={emailNotif} onChange={e => setEmailNotif(e.target.checked)} /> Email Notifications
          </label>
          <label style={{ display: 'block' }}>
            <input type="checkbox" checked={smsNotif} onChange={e => setSmsNotif(e.target.checked)} /> SMS Notifications
          </label>
        </div>
        <div>
          <h4>Change Password</h4>
          <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" className="modern-input" />
            <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Confirm Password" className="modern-input" />
            <button className="action-button" type="submit">Change Password</button>
          </form>
          {msg && <div style={{ marginTop: 8, color: msg.includes('success') ? 'green' : 'red' }}>{msg}</div>}
        </div>
      </div>
    </DashboardLayout>
  );
} 