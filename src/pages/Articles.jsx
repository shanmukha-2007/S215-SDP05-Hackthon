import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import ArticleFilters from "../components/ArticleFilters";
import QuickJump from "../components/QuickJump";
import AnimatePage from "../components/AnimatePage";

import allArticles from "../data/allArticles.json";

export default function Articles() {
  const [search, setSearch] = useState("");

  const [selectedPart, setSelectedPart] = useState("All Parts");
  const [selectedType, setSelectedType] = useState("All");

  const handleJump = (number) => {
    const element = document.getElementById(`article-${number}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filtered = allArticles.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.article.toLowerCase().includes(search.toLowerCase()) ||
      a.text.toLowerCase().includes(search.toLowerCase());

    const matchPart =
      selectedPart === "All Parts" || a.part === selectedPart;

    const matchType =
      selectedType === "All" || a.category === selectedType;

    return matchSearch && matchPart && matchType;
  });

  return (
    <AnimatePage>
      <div className="space-y-6">

        {/* Title */}
        <div className="p-6 bg-white dark:bg-slate-800 shadow rounded-xl">
          <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
            Explore Articles 📜
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Search, filter, and quickly jump to any Article (1–395).
          </p>

          <input
            type="text"
            placeholder="Search articles..."
            className="input mt-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <ArticleFilters
          selectedPart={selectedPart}
          setSelectedPart={setSelectedPart}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
        />

        {/* Quick Jump */}
        <QuickJump total={395} onJump={handleJump} />

        {/* Articles List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <div id={`article-${article.id}`} key={article.id}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-600 dark:text-slate-400">
            No matching articles found 🧐
          </p>
        )}
      </div>
    </AnimatePage>
  );
}
