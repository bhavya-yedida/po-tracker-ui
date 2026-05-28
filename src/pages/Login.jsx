import { useState } from "react";
import { loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async () => {
    const res = await loginApi(form);

    localStorage.setItem("token", res.data.token);

    nav("/");
  };

  return (
    <div className="auth">
      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}