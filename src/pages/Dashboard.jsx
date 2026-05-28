import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [checklist, setChecklist] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadTodayData();
  }, []);

  async function loadTodayData() {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const [t, n, c] = await Promise.all([
        axios.get("https://localhost:7124/api/tasks", { headers }),
        axios.get("https://localhost:7124/api/notes", { headers }),
        axios.get("https://localhost:7124/api/checklist", { headers }),
      ]);

      setTasks(t.data);
      setNotes(n.data);
      setChecklist(c.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="content">
      <h1>Today Dashboard</h1>

      {/* TASKS */}
      <h3>📌 Tasks</h3>
      {tasks.map((t) => (
        <div className="item" key={t.id}>
          {t.title}
        </div>
      ))}

      {/* Daily Routine */}
      <h3>✅ Daily Routine</h3>
      {checklist.map((c) => (
        <div className="item" key={c.id}>
          {c.title}
        </div>
      ))}

      {/* NOTES */}
      <h3>📝 Notes</h3>
      {notes.map((n) => (
        <div className="item" key={n.id}>
          {n.content}
        </div>
      ))}
    </div>
  );
}