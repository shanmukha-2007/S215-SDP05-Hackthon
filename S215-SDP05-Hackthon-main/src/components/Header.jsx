import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail"));
    const t = localStorage.getItem('theme');
    if (t) setTheme(t);
    else setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const handler = () => setUserEmail(localStorage.getItem('userEmail'));
    window.addEventListener('userAuthChanged', handler);
    window.addEventListener('storage', handler);
    return () => {
      window.removeEventListener('userAuthChanged', handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    setUserEmail(null);
    navigate("/");
    try { window.dispatchEvent(new CustomEvent('userAuthChanged')); } catch (e) {}
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    if (next === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const navItem =
    "header-link block md:inline-block px-4 py-2 rounded-md text-sm font-medium";

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          ConstitutionVerse
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-slate-700 dark:text-slate-300"
        >
          ☰
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">

          <NavLink to="/" className={navItem}>
            Home
          </NavLink>

          <NavLink to="/articles" className={navItem}>
            Articles
          </NavLink>

          <NavLink to="/dashboard" className={navItem}>
            Dashboard
          </NavLink>

          <NavLink to="/court" className={navItem}>
            Courtroom
          </NavLink>

          <NavLink to="/parliament" className={navItem}>
            Parliament
          </NavLink>

          <NavLink to="/gamification" className={navItem}>
            Gamification
          </NavLink>

          <NavLink to="/chatbot" className={navItem}>
            Chatbot
          </NavLink>

          {userEmail ? (
            <NavLink to="/profile" className={navItem}>
              Profile
            </NavLink>
          ) : null}

          <button onClick={toggleTheme} className={`${navItem} inline-flex items-center`} aria-label="Toggle theme">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>

        </nav>

        {/* Auth CTA (visible on desktop as buttons) */}
        <div className="hidden md:flex items-center gap-3">
          {userEmail ? (
            <div className="flex items-center gap-3">
              <NavLink to="/profile" className="hidden md:inline-block px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-800">{userEmail.split('@')[0]}</NavLink>
              <button className="btn btn-ghost" onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/signup" className="btn">Signup</Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-lg border-t dark:border-slate-700 py-3">

          <NavLink onClick={() => setOpen(false)} to="/" className={navItem}>
            Home
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/articles" className={navItem}>
            Articles
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/dashboard" className={navItem}>
            Dashboard
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/court" className={navItem}>
            Courtroom
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/parliament" className={navItem}>
            Parliament
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/gamification" className={navItem}>
            Gamification
          </NavLink>

          <NavLink onClick={() => setOpen(false)} to="/chatbot" className={navItem}>
            Chatbot
          </NavLink>

          {userEmail ? (
            <>
              <NavLink onClick={() => setOpen(false)} to="/profile" className={navItem}>
                Profile
              </NavLink>
              <button onClick={() => { setOpen(false); logout(); }} className={`${navItem} text-left`}>Logout</button>
            </>
          ) : (
            <>
              <NavLink onClick={() => setOpen(false)} to="/login" className={navItem}>
                Login
              </NavLink>
              <NavLink onClick={() => setOpen(false)} to="/signup" className={navItem}>
                Signup
              </NavLink>
            </>
          )}

          <button onClick={() => { setOpen(false); toggleTheme(); }} className={`${navItem} inline-flex items-center`} aria-label="Toggle theme">
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>

        </div>
      )}
    </header>
  );
}
