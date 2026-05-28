function Checklist({
  checklist,
  toggleChecklist,
  completedChecklist,
}) {
  return (
    <article className="panel">
      <div className="panel-header">
        <h2>Daily Checklist</h2>

        <span>
            {checklist.length
                ? Math.round((completedChecklist / checklist.length) * 100)
                : 0}
            % done
        </span>
      </div>

      <div className="checklist">
        {checklist.map((item) => (
          <button
            key={item.id}
            className={`check-item ${item.done ? "done" : ""}`}
            onClick={() => toggleChecklist(item.id)}
          >
            <span>{item.title}</span>

            <small>{item.phase}</small>
          </button>
        ))}
      </div>
    </article>
  );
}

export default Checklist;