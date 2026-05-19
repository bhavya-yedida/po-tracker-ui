import { useEffect, useMemo, useState } from "react";
import "./App.css";

const defaultChecklist = [
  { title: "Current Affairs + Newspaper", phase: "Morning", done: false },
  { title: "Quant practice", phase: "Morning", done: false },
  { title: "Reasoning practice", phase: "Morning", done: false },
  { title: "Formula / shortcut review", phase: "Morning", done: false },
  { title: "English practice", phase: "Night", done: false },
  { title: "Quiz / sectional test", phase: "Night", done: false },
  { title: "Error log + revision", phase: "Night", done: false },
];

const overviewCards = [
  { title: "Daily routine", value: "3 hrs", detail: "2 hrs + 1 hr sessions" },
  { title: "Phase goals", value: "90 days", detail: "Prelims + Mains integrated" },
  { title: "Mock target", value: "40+", detail: "Sectional + full mock focus" },
];

const planPhases = [
  {
    name: "Phase 1",
    period: "Days 1–30",
    focus: "Foundation + core concepts",
    goals: ["Arithmetic basics", "Prelim reasoning", "Grammar + RC basics", "Daily CA notes"],
  },
  {
    name: "Phase 2",
    period: "Days 31–60",
    focus: "Advanced practice + Mains prep",
    goals: ["DI mastery", "Advanced puzzles", "Banking awareness", "Descriptive writing"],
  },
  {
    name: "Phase 3",
    period: "Days 61–90",
    focus: "Mock domination + final revision",
    goals: ["Full mock mastery", "Weak topic repair", "Formula cycles", "Interview prep"],
  },
];

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState("");
  const [checklist, setChecklist] = useState(defaultChecklist);

  useEffect(() => {
    const saved = localStorage.getItem("sbiPoTrackerData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.checklist) setChecklist(parsed.checklist);
      } catch (error) {
        console.warn("Could not load saved tracker data", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sbiPoTrackerData",
      JSON.stringify({ tasks, notes, checklist })
    );
  }, [tasks, notes, checklist]);

  const addTask = () => {
    const trimmed = taskText.trim();
    if (!trimmed) return;
    setTasks([...tasks, { label: trimmed, done: false }]);
    setTaskText("");
  };

  const toggleTask = (index) => {
    setTasks(tasks.map((task, i) => (i === index ? { ...task, done: !task.done } : task)));
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleChecklist = (index) => {
    setChecklist(
      checklist.map((item, i) => (i === index ? { ...item, done: !item.done } : item))
    );
  };

  const resetProgress = () => {
    setTasks([]);
    setNotes("");
    setChecklist(defaultChecklist);
  };

  const completedTasks = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);
  const completedChecklist = useMemo(
    () => checklist.filter((item) => item.done).length,
    [checklist]
  );

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div>
          <p className="eyebrow">SBI PO 2026 Crash Plan</p>
          <h1>90-Day Prep Tracker</h1>
          <p className="hero-copy">
            Keep your schedule, daily checklist, and progress in one place. Browser storage saves your data automatically. Deploy-ready for Azure Static Web Apps.
          </p>
        </div>
        <div className="hero-cards">
          {overviewCards.map((card) => (
            <div key={card.title} className="hero-card">
              <strong>{card.value}</strong>
              <span>{card.title}</span>
              <small>{card.detail}</small>
            </div>
          ))}
        </div>
      </header>

      <section className="tracker-grid">
        <article className="panel">
          <div className="panel-header">
            <h2>Daily Checklist</h2>
            <span>{Math.round((completedChecklist / checklist.length) * 100)}% done</span>
          </div>
          <div className="checklist">
            {checklist.map((item, index) => (
              <button
                key={item.title}
                className={`check-item ${item.done ? "done" : ""}`}
                onClick={() => toggleChecklist(index)}
              >
                <span>{item.title}</span>
                <small>{item.phase}</small>
              </button>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h2>Task Planner</h2>
            <span>{completedTasks}/{tasks.length} complete</span>
          </div>
          <div className="task-input-row">
            <input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Add a new study task"
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <button onClick={addTask}>Add</button>
          </div>
          <ul className="task-list">
            {tasks.length === 0 ? (
              <li className="empty-state">Add tasks for today's study plan.</li>
            ) : (
              tasks.map((task, index) => (
                <li key={`${task.label}-${index}`} className={task.done ? "task-done" : ""}>
                  <button className="task-toggle" onClick={() => toggleTask(index)}>
                    {task.done ? "✓" : "○"}
                  </button>
                  <span>{task.label}</span>
                  <button className="task-delete" onClick={() => deleteTask(index)}>
                    Delete
                  </button>
                </li>
              ))
            )}
          </ul>
        </article>

        <article className="panel notes-panel">
          <div className="panel-header">
            <h2>Study Notes</h2>
            <button className="reset-button" onClick={resetProgress}>
              Reset all
            </button>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write your daily analysis, mock feedback, or weakness notes..."
          />
        </article>
      </section>

      <section className="plan-section">
        <h2>Phase roadmap</h2>
        <div className="phase-grid">
          {planPhases.map((phase) => (
            <div key={phase.name} className="phase-card">
              <h3>{phase.name}</h3>
              <p className="phase-period">{phase.period}</p>
              <p className="phase-focus">{phase.focus}</p>
              <ul>
                {phase.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="study-tips">
        <div>
          <h2>Quick prep priorities</h2>
          <p>Focus on Quant, Reasoning, English, and Banking Awareness. Build speed with mocks, keep an error log, and revise formulas daily.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
