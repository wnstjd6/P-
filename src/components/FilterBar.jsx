const FILTERS = [
  {
    value: "all",
    label: "전체보기",
    emoji: "📋",
    desc: "모든 메뉴",
    active: "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200/60 border-transparent",
    inactive: "bg-white/80 text-amber-800 border-amber-100 hover:border-amber-300 hover:bg-amber-50/80",
  },
  {
    value: "easy",
    label: "순한맛",
    emoji: "🟢",
    desc: "기초 용어",
    active: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-200/60 border-transparent",
    inactive: "bg-white/80 text-emerald-700 border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/80",
  },
  {
    value: "spicy",
    label: "매운맛",
    emoji: "🌶️",
    desc: "심화 금융",
    active: "bg-gradient-to-r from-red-500 to-orange-600 text-white shadow-lg shadow-red-200/60 border-transparent",
    inactive: "bg-white/80 text-red-600 border-red-100 hover:border-red-300 hover:bg-red-50/80",
  },
];

export default function FilterBar({ currentFilter, onFilterChange, counts = {} }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 mb-7 p-1.5 rounded-2xl bg-amber-50/60 border border-amber-100/80">
      {FILTERS.map(({ value, label, emoji, desc, active, inactive }) => {
        const isActive = currentFilter === value;
        const count = counts[value];
        return (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`flex-1 flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 active:scale-[0.98] ${
              isActive ? active : inactive
            }`}
          >
            <span className="text-base">{emoji}</span>
            <span className="flex flex-col items-start leading-tight">
              <span>{label}</span>
              <span className={`text-[10px] font-medium ${isActive ? "text-white/80" : "opacity-60"}`}>
                {desc}{count != null ? ` · ${count}개` : ""}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
