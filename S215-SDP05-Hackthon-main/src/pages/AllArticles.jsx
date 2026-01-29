import { useEffect, useState } from "react";
import articles from "../data/allArticles.json";

export default function AllArticles() {
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(articles || []);

  useEffect(() => {
    setFiltered(
      articles.filter(
        (a) =>
          a.title.toLowerCase().includes(search.toLowerCase()) ||
          a.text.toLowerCase().includes(search.toLowerCase()) ||
          a.article.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-indigo-600">All Articles</h1>

      <input
        className="input"
        placeholder="Search articles..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((a) => (
          <div key={a.id} className="card">
            <h2 className="text-xl font-semibold">{a.article} — {a.title}</h2>
            <p className="mt-2 text-slate-600">{a.text}</p>
            <p className="mt-1 text-sm text-indigo-600 font-medium">{a.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
