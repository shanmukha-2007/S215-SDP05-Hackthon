import { useParams, Link } from "react-router-dom";
import articles from "../data/allArticles.json";
import AnimatePage from "../components/AnimatePage";

export default function ArticleDetails() {
  const { id } = useParams();

  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <AnimatePage>
        <div className="p-10 text-center">
          <h2 className="text-2xl font-bold text-red-500">Article Not Found</h2>
          <Link to="/articles" className="text-indigo-600 underline mt-4 block">
            Back to Articles
          </Link>
        </div>
      </AnimatePage>
    );
  }

  return (
    <AnimatePage>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-2xl space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700">
          {article.article} – {article.title}
        </h1>

        <div className="text-sm text-slate-500">
          Category: <strong>{article.category}</strong>
        </div>

        <p className="text-slate-700 text-lg leading-relaxed">
          {article.text}
        </p>

        <Link
          to="/articles"
          className="inline-block mt-6 px-4 py-2 bg-indigo-600 text-white rounded shadow"
        >
          ⟵ Back to Articles
        </Link>
      </div>
    </AnimatePage>
  );
}
