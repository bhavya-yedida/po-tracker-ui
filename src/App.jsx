import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Checklist from "./pages/Checklist";
import Notes from "./pages/Notes";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";

import Layout from "./components/layout/Layout";

function Protected({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  return children;
}

function Wrap({ children }) {
  return <Protected><Layout>{children}</Layout></Protected>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Wrap><Dashboard /></Wrap>} />
        <Route path="/tasks" element={<Wrap><Tasks /></Wrap>} />
        <Route path="/checklist" element={<Wrap><Checklist /></Wrap>} />
        <Route path="/notes" element={<Wrap><Notes /></Wrap>} />

        <Route path="/calendar" element={<Wrap><Calendar /></Wrap>} />
        <Route path="/analytics" element={<Wrap><Analytics /></Wrap>} />

      </Routes>
    </BrowserRouter>
  );
}