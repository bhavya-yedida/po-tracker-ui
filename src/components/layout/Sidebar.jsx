import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/tasks", label: "Tasks" },
    { path: "/checklist", label: "Daily Routine" },
    { path: "/notes", label: "Notes" },
    { path: "/calendar", label: "Calendar" },
    { path: "/analytics", label: "Analytics" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="logo">Progress Tracker</h2>

      <nav>
        {links.map((l) => (
          <Link
            key={l.path}
            to={l.path}
            className={
              location.pathname === l.path
                ? "nav-link active"
                : "nav-link"
            }
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}