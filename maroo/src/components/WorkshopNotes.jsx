// WorkshopNotes.jsx
import React, { useState } from 'react';
import './WorkshopNotes.css';

const WorkshopNotes = ({ initialNotes, onSave }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(notes);
    setIsEditing(false);
  };

  return (
    <div className="workshop-notes">
      <div className="notes-header">
        <h3>Workshop Notes</h3>
        {isEditing ? (
          <button onClick={handleSave}>Save Notes</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit Notes</button>
        )}
      </div>
      {isEditing ? (
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your notes here..."
        />
      ) : (
        <div className="notes-content">
          {notes || <p>No notes yet. Click "Edit Notes" to add some.</p>}
        </div>
      )}
    </div>
  );
};

export default WorkshopNotes;