import { useEffect, useState } from "react";
import {
  getTasks,
  createTask,
  deleteTask,
} from "../api/taskApi";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const load = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    const res = await createTask({
      title: text,
    });

    setTasks([...tasks, res.data]);
    setText("");
  };

  const remove = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1>Tasks</h1>

      <div className="row">
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button onClick={add}>Add</button>
      </div>

      {tasks.map((t) => (
        <div className="item" key={t.id}>
          {t.title}
          <button onClick={() => remove(t.id)}>X</button>
        </div>
      ))}
    </div>
  );
}