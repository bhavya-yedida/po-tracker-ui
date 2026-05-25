function TaskList({
  tasks,
  taskText,
  setTaskText,
  addTask,
  toggleTask,
  deleteTask,
  completedTasks,
}) {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Task Planner</h2>

        <span>
          {completedTasks}/{tasks.length} complete
        </span>
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
          <li className="empty-state">
            Add tasks for today's study plan.
          </li>
        ) : (
          tasks.map((task) => (
            <li
              key={task.id}
              className={task.done ? "task-done" : ""}
            >
              <button
                className="task-toggle"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : "○"}
              </button>

              <span>{task.label}</span>

              <button
                className="task-delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}

export default TaskList;