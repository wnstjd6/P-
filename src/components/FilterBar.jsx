const FILTERS = [
  {
    value: "all",
    label: "전체보기",
    emoji: "📋",
    active: "bg-amber-500 text-white shadow-lg shadow-amber-200 border-amber-500",
    inactive: "bg-white text-amber-700 border-amber-200 hover:border-amber-400 hover:bg-amber-50",
  },
  {
    value: "easy",
    label: "순한맛 (기초)",
    emoji: "🟢",
    active: "bg-green-500 text-white shadow-lg shadow-green-200 border-green-500",
    inactive: "bg-white text-green-700 border-green-200 hover:border-green-400 hover:bg-green-50",
  },
  {
    value: "spicy",
    label: "매운맛 (심화)",
    emoji: "🌶️",
    active: "bg-red-500 text-white shadow-lg shadow-red-200 border-red-500",
    inactive: "bg-white text-red-600 border-red-200 hover:border-red-400 hover:bg-red-50",
  },
];

export default function FilterBar({ currentFilter, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {FILTERS.map(({ value, label, emoji, active, inactive }) => (
        <button
          key={value}
          onClick={() => onFilterChange(value)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-bold border-2 transition-all duration-200 active:scale-95 ${
            currentFilter === value ? active : inactive
          }`}
        >
          <span>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
