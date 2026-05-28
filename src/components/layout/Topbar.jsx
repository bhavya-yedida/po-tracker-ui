export default function Topbar() {
  const toggleTheme = () => {
    const current = document.body.classList.contains("dark")
      ? "dark"
      : "light";

    const next = current === "dark" ? "light" : "dark";

    document.body.classList.remove("dark", "light");
    document.body.classList.add(next);

    localStorage.setItem("theme", next);
  };

  return (
    <div className="topbar">
      <input className="search" placeholder="Search..." />

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={toggleTheme}>
          Toggle Theme
        </button>

        <div className="avatar">A</div>
      </div>
    </div>
  );
}