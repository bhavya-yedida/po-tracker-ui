function TaskList({
  tasks,
  taskText,
  setTaskText,
  addTask,
  toggleTask,
  deleteTask,
  openEditModal,
  completedTasks,
  selectedDate,
  setSelectedDate,
}) {
  return (
    <article className="panel">

      <div className="panel-header">
        <h2>Task Planner</h2>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <span>
        {completedTasks}/{tasks.length} complete
      </span>

      <div className="task-input-row">
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty-state">
            No tasks for selected date
          </li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={task.done ? "task-done" : ""}>

              <button
                className="task-toggle"
                onClick={() => toggleTask(task.id)}
              >
                {task.done ? "✓" : "○"}
              </button>

              <span>{task.label}</span>

              <div className="task-actions">
                <button onClick={() => openEditModal(task)}>
                  Edit
                </button>

                <button onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>

            </li>
          ))
        )}
      </ul>
    </article>
  );
}

export default TaskList;