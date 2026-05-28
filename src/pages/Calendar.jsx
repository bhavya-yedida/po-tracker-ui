import { useState } from "react";
import axios from "axios";

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [data, setData] = useState({ tasks: [], notes: [], checklist: [] });

  const token = localStorage.getItem("token");

  async function loadDateData(date) {
    setSelectedDate(date);

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [t, n, c] = await Promise.all([
      axios.get("https://localhost:7124/api/tasks", { headers }),
      axios.get("https://localhost:7124/api/notes", { headers }),
      axios.get("https://localhost:7124/api/checklist", { headers }),
    ]);

    // frontend filter by date (temporary)
    const filteredTasks = t.data.filter(x => x.createdAt?.startsWith(date));
    const filteredNotes = n.data.filter(x => x.createdAt?.startsWith(date));
    const filteredChecklist = c.data.filter(x => x.createdAt?.startsWith(date));

    setData({
      tasks: filteredTasks,
      notes: filteredNotes,
      checklist: filteredChecklist,
    });
  }

  return (
    <div className="content">

      <h1>Calendar</h1>

      {/* SIMPLE DATE INPUT (replace later with FullCalendar) */}
      <input
        type="date"
        onChange={(e) => loadDateData(e.target.value)}
      />

      <h3>Selected Date: {selectedDate}</h3>

      <h3>📌 Tasks</h3>
      {data.tasks.map(t => (
        <div className="item" key={t.id}>{t.title}</div>
      ))}

      <h3>📝 Notes</h3>
      {data.notes.map(n => (
        <div className="item" key={n.id}>{n.content}</div>
      ))}

      <h3>✅ Checklist</h3>
      {data.checklist.map(c => (
        <div className="item" key={c.id}>{c.title}</div>
      ))}

    </div>
  );
}