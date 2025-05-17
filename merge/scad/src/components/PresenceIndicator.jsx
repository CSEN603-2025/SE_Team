import React from 'react';

export default function PresenceIndicator({ online }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.4em',
      fontSize: '0.95em'
    }}>
      <span style={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        background: online ? '#28a745' : '#ccc',
        display: 'inline-block',
        marginRight: 4
      }} />
      {online ? 'Online' : 'Offline'}
    </span>
  );
} 