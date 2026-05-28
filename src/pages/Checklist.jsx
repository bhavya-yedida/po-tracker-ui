import { useEffect, useState } from "react";
import axios from "axios";

export default function Checklist() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchChecklist();
  }, []);

  async function fetchChecklist() {
    const res = await axios.get("https://localhost:7124/api/checklist", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems(res.data);
  }

  async function addItem() {
    if (!title) return;

    await axios.post(
      "https://localhost:7124/api/checklist",
      { title },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setTitle("");
    fetchChecklist();
  }

  async function toggle(id) {
    await axios.put(
      `https://localhost:7124/api/checklist/toggle/${id}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    fetchChecklist();
  }

  return (
    <div className="content">
      <h1>Daily Routine</h1>

      {/* ADD ITEM */}
      <div className="card-box">
        <input
          placeholder="Add checklist item..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={addItem}>Add</button>
      </div>

      {/* LIST */}
      {items.map((i) => (
        <div className="item" key={i.id}>
          <label style={{ display: "flex", gap: "10px" }}>
            <input
              type="checkbox"
              checked={i.isCompleted}
              onChange={() => toggle(i.id)}
            />

            <span
              style={{
                textDecoration: i.isCompleted ? "line-through" : "none",
              }}
            >
              {i.title}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}