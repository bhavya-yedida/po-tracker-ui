function Notes({
  notes,
  setNotes,
}) {
  return (
    <article className="panel notes-panel">
      <div className="panel-header">
        <h2>Study Notes</h2>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Write your daily analysis, mock feedback, or weakness notes..."
      />
    </article>
  );
}

export default Notes;