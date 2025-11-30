// src/pages/Home.jsx
import IndiaFlag3D from "../components/IndiaFlag3D";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="space-y-20">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="grid md:grid-cols-2 gap-10 items-center py-16 px-6">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-5xl font-extrabold leading-tight text-indigo-600 dark:text-indigo-300">
            Explore The Constitution of India
            <br />
            <span className="text-slate-900 dark:text-slate-100">
              In a Modern 3D Interactive Experience
            </span>
          </h1>

          <p className="text-lg text-slate-700 dark:text-slate-300">
            Articles Explorer • Virtual Court • Parliament Simulator • AI Chatbot •
            Dashboards • Quizzes — everything in one single platform.
          </p>

          <div className="flex gap-4 pt-3">
            <Link className="btn btn-primary px-6 py-3" to="/articles">
              Explore Articles
            </Link>

            <Link className="btn btn-secondary px-6 py-3" to="/dashboard">
              Visit Dashboard
            </Link>
          </div>
        </motion.div>

        {/* ---------------- RIGHT SIDE 3D SPHERE ---------------- */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="h-[280px] md:h-[350px]"
        >
          <IndiaFlag3D />
        </motion.div>
      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="px-6 pb-16">
        <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-300 mb-10">
          Platform Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold">📘 Articles Explorer</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Browse and study Articles of the Constitution.
            </p>
          </motion.div>

          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold">⚖ Virtual Court</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Solve cases and understand rights in action.
            </p>
          </motion.div>

          <motion.div className="card p-6" whileHover={{ scale: 1.05 }}>
            <h3 className="text-xl font-bold">🏛 Parliament Simulator</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Debate, vote and pass virtual laws.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
