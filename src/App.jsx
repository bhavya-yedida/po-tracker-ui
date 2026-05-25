import { useEffect, useMemo, useState } from "react";
import "./App.css";

import TaskList from "./components/TaskList";
import Checklist from "./components/Checklist";
import Notes from "./components/Notes";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi,
} from "./api/taskApi";

import {
  getChecklist,
  toggleChecklistItem,
} from "./api/checklistApi";

import {
  getNotes,
  saveNotes,
} from "./api/notesApi";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState([]);

  // LOAD ALL DATA
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [t, c, n] = await Promise.all([
        getTasks(),
        getChecklist(),
        getNotes(),
      ]);

      setTasks(t);
      setChecklist(c);
      setNotes(n?.content || "");
    } catch (err) {
      console.error("Load error:", err);
    }
  };

  // TASKS
  const addTask = async () => {
    if (!taskText.trim()) return;

    const newTask = await createTask({
      label: taskText,
      done: false,
    });

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const updated = { ...task, done: !task.done };

    await updateTask(id, updated);

    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // CHECKLIST
  const toggleChecklist = async (id) => {
    await toggleChecklistItem(id);

    setChecklist(
      checklist.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  };

  // NOTES (AUTO SAVE)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes !== "") {
        saveNotes(notes);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [notes]);

  // STATS
  const completedTasks = useMemo(
    () => tasks.filter((t) => t.done).length,
    [tasks]
  );

  const completedChecklist = useMemo(
    () => checklist.filter((c) => c.done).length,
    [checklist]
  );

  return (
    <div className="app-shell">

      <Checklist
        checklist={checklist}
        toggleChecklist={toggleChecklist}
        completedChecklist={completedChecklist}
      />

      <TaskList
        tasks={tasks}
        taskText={taskText}
        setTaskText={setTaskText}
        addTask={addTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        completedTasks={completedTasks}
      />

      <Notes
        notes={notes}
        setNotes={setNotes}
      />

    </div>
  );
}

export default App;