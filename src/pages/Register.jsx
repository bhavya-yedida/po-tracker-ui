import { useState } from "react";
import { registerApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const register = async () => {
    const res = await registerApi(form);

    localStorage.setItem("token", res.data.token);

    nav("/");
  };

  return (
    <div className="auth">
      <div className="card">
        <h2>Register</h2>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, fullName: e.target.value })
          }
        />

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={register}>Register</button>
      </div>
    </div>
  );
}