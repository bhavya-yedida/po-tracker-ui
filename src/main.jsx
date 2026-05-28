import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";

const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);