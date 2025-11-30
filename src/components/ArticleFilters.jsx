export default function ArticleFilters({
  selectedPart,
  setSelectedPart,
  selectedType,
  setSelectedType,
}) {
  const parts = [
    "All Parts", "Part I", "Part II", "Part III", "Part IV", "Part IVA",
    "Part V", "Part VI", "Part VII", "Part VIII", "Part IX", "Part IXA",
    "Part IXB", "Part X", "Part XI", "Part XII", "Part XIII", "Part XIV",
    "Part XIVA", "Part XV", "Part XVI", "Part XVII", "Part XVIII", "Part XIX", "Part XX",
  ];

  const types = ["All", "Fundamental Right", "Duties", "Directive Principles", "General"];

  return (
    <div className="p-4 bg-white dark:bg-slate-800 shadow rounded-xl space-y-4">

      <div className="grid md:grid-cols-2 gap-4">
        <select
          className="input"
          value={selectedPart}
          onChange={(e) => setSelectedPart(e.target.value)}
        >
          {parts.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>

        <select
          className="input"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {types.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
