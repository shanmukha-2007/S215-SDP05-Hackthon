import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("citizen");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    if (!email || !password) return alert("Enter email & password");

    localStorage.setItem("userRole", role);
    localStorage.setItem("userEmail", email);

    // Auto redirect based on role
    // Notify other parts of the app that auth changed
    try { window.dispatchEvent(new CustomEvent('userAuthChanged')); } catch (e) {}
    navigate(`/dashboard/${role}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Login</h1>

      <input
        className="input mb-3"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input mb-3"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select
        className="input mb-4"
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="citizen">Citizen</option>
        <option value="educator">Educator</option>
        <option value="legal">Legal Expert</option>
        <option value="admin">Admin</option>
      </select>

      <button className="btn btn-primary w-full" onClick={loginUser}>
        Login
      </button>

      <p className="text-center mt-4">
        New user?{" "}
        <a href="/signup" className="text-indigo-600">
          Signup
        </a>
      </p>
    </div>
  );
}
