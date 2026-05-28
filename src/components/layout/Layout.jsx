import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main-area">
        <Topbar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}