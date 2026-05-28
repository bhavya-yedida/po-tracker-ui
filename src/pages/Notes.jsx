import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const res = await axios.get("https://localhost:7124/api/notes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes(res.data);
  }

  async function addNote() {
    if (!content) return;

    await axios.post(
      "https://localhost:7124/api/notes",
      { content },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setContent("");
    fetchNotes();
  }

  return (
    <div className="content">
      <h1>Notes</h1>

      {/* ADD NOTE */}
      <div className="card-box">
        <textarea
          placeholder="Write a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button onClick={addNote}>Add Note</button>
      </div>

      {/* LIST NOTES */}
      {notes.map((n) => (
        <div className="item" key={n.id}>
          {n.content}
        </div>
      ))}
    </div>
  );
}