export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="relative mb-5">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 pointer-events-none">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="용어, 정의, 비유로 검색..."
        className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white/90 border border-amber-100 text-sm text-stone-800 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all"
      />
      {value && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
            {resultCount}개
          </span>
          <button
            onClick={() => onChange("")}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors text-xs"
            aria-label="검색 초기화"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
