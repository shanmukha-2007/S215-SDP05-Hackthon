// src/components/ArticleCard.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * article: { id, article, title, category, text, part, amendmentYear, tags, type }
 * - part: optional string like "Part I"
 * - amendmentYear: optional number
 * - tags: optional array of strings
 * - type: "Right" | "Duty" | "Other"
 */

export default function ArticleCard({ article }) {
  const tagColor = (cat) => {
    if (!cat) return "bg-slate-200 text-slate-800";
    if (cat.includes("Fundamental")) return "bg-amber-100 text-amber-800";
    if (cat.includes("Directive")) return "bg-cyan-100 text-cyan-800";
    if (cat.includes("Parliament") || cat.includes("Union")) return "bg-indigo-100 text-indigo-800";
    if (cat.includes("State")) return "bg-emerald-100 text-emerald-800";
    return "bg-slate-200 text-slate-800";
  };

  return (
    <motion.article
      id={`article-${article.id}`}
      layout
      whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(2,6,23,0.08)" }}
      className="card"
      style={{ cursor: "pointer" }}
    >
      <div className="flex items-start gap-4">
        {/* left icon circle */}
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-indigo-600 text-white font-bold">
          {article.id}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{article.article} — {article.title}</h3>
              <p className="text-sm text-slate-600 mt-1 line-clamp-3">{article.text}</p>
            </div>

            <div className="text-right space-y-1">
              {article.part && <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">{article.part}</span>}
              {article.amendmentYear && <div className="text-xs text-slate-500">Amend: {article.amendmentYear}</div>}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className={`text-xs px-2 py-1 rounded ${tagColor(article.category)}`}>{article.category}</span>

              {article.tags?.slice(0,4).map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">{t}</span>
              ))}
            </div>

            <div className="text-sm">
              {article.type === "Right" && <span className="text-green-600 font-semibold">Right</span>}
              {article.type === "Duty" && <span className="text-amber-600 font-semibold">Duty</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
