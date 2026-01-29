import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    if (!email || !password) return alert("Enter all details");

    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);

    alert("Signup successful!");
    try { window.dispatchEvent(new CustomEvent('userAuthChanged')); } catch (e) {}
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Signup</h1>

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

      <button className="btn btn-primary w-full" onClick={register}>
        Signup
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600">
          Login
        </a>
      </p>
    </div>
  );
}
