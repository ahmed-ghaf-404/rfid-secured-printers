import React, { useState, useEffect } from "react";
import "../../assets/styles/future-notes.css";

const FutureNotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/");
      const data = await response.json();

      if (Array.isArray(data)) {
        setNotes(data);
      } else {
        setNotes([]); // Handle unexpected response
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
      setNotes([]); // Set to empty array on error
    }
  };

  const addNote = async () => {
    if (newNote.trim() === "") return;
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newNote }),
      });

      const data = await response.json();
      setNotes([...notes, data]);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/notes/${id}`, { method: "DELETE" });
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="future-notes-page">
      <h1>Future Ideas & Notes</h1>
      <textarea
        placeholder="Write down your ideas or improvements..."
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
      ></textarea>
      <button onClick={addNote}>Add Note</button>

      <div className="notes-list">
        {notes.length === 0 ? <p>No notes yet.</p> : 
          notes.map((note) => (
            <div key={note.id} className="note"> {/* ✅ Ensure each note has a unique key */}
              {note.content}
              <button className="delete-button" onClick={() => deleteNote(note.id)}>❌</button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default FutureNotesPage;
