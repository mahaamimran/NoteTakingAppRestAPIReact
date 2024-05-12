import React, { useState, useEffect } from 'react';
import axios from 'axios';
// made front end, even though crud operations work with postman requests
function App() {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({ title: '', content: '' });
  useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:8080/api/notes');
    setNotes(response.data);
  };
// handle submit function to add or update notes
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (note.id) {
        await axios.put(`http://localhost:8080/api/notes/${note.id}`, note);
      } else {
        await axios.post('http://localhost:8080/api/notes', note);
      }
      setNote({ title: '', content: '' });
      fetchNotes();
    } catch (error) {
      console.error('There was an error!', error);
    }
  };
  
// handle edit function to edit notes
  const handleEdit = (note) => {
    setNote(note);
  };
// handle delete function to dlete notes
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/notes/${id}`);
    fetchNotes();
  };
// basic form to showxase notes crud operations
  return (
    <div style={{ margin: '40px' }}>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={note.title}
          onChange={e => setNote({...note, title: e.target.value})}
          required
          style={{ width: '100%', padding: '12px', margin: '8px 0', display: 'inline-block', border: '1px solid #ccc' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={note.content}
          onChange={e => setNote({...note, content: e.target.value})}
          required
          style={{ width: '100%', padding: '12px', margin: '8px 0', display: 'inline-block', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ backgroundColor: '#3a2667', color: 'white', padding: '10px 15px', margin: '8px 0', border: 'none', cursor: 'pointer', width: '100%' }}>
          {note.id ? 'Update Note' : 'Add Note'}
        </button>
      </form>
      <h2>Previous Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleEdit(note)} style={{ margin: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(note.id)} style={{ margin: '10px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
