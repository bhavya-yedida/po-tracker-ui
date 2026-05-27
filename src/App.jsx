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

import { getChecklist, toggleChecklistItem } from "./api/checklistApi";
import { getNotes, saveNotes } from "./api/notesApi";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [t, c, n] = await Promise.all([
      getTasks(),
      getChecklist(),
      getNotes(),
    ]);

    setTasks(t);
    setChecklist(c);
    setNotes(n?.content || "");
  };

  // FORMAT DATE SAFELY
  const formatDate = (date) => {
    const d = new Date(date);
    return (
      d.getFullYear() +
      "-" +
      String(d.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(d.getDate()).padStart(2, "0")
    );
  };

  // FILTER BY CREATED DATE
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (!t.createdAt) return false;
      return formatDate(t.createdAt) === selectedDate;
    });
  }, [tasks, selectedDate]);

  // TASKS
  const addTask = async () => {
    if (!taskText.trim()) return;

    const newTask = await createTask({
      title: taskText,
      done: false,
    });

    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    const updated = { ...task, done: !task.done };

    await updateTask(id, updated);

    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await deleteTaskApi(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // EDIT
  const openEditModal = (task) => {
    setEditingTask(task);
    setEditText(task.title);
  };

  const saveEdit = async () => {
    const updated = { ...editingTask, title: editText };

    await updateTask(editingTask.id, updated);

    setTasks(
      tasks.map((t) =>
        t.id === editingTask.id ? updated : t
      )
    );

    setEditingTask(null);
    setEditText("");
  };

  // CHECKLIST
  const toggleChecklist = async (id) => {
    await toggleChecklistItem(id);

    setChecklist(
      checklist.map((i) =>
        i.id === id ? { ...i, done: !i.done } : i
      )
    );
  };

  // NOTES AUTO SAVE
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notes) saveNotes(notes);
    }, 500);

    return () => clearTimeout(timer);
  }, [notes]);

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
        tasks={filteredTasks}
        taskText={taskText}
        setTaskText={setTaskText}
        addTask={addTask}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
        openEditModal={openEditModal}
        completedTasks={completedTasks}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <Notes notes={notes} setNotes={setNotes} />

      {/* MODAL */}
      {editingTask && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Task</h3>

            <input
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={saveEdit}>Save</button>
              <button onClick={() => setEditingTask(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;