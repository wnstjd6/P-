import TermCard from "./TermCard";

export default function TermList({ terms, recipes, onSaveRecipe, searchQuery, onClearSearch }) {
  if (terms.length === 0) {
    return (
      <div className="text-center py-20 rounded-3xl border-2 border-dashed border-amber-200/80 bg-white/50">
        <p className="text-6xl mb-4 opacity-40">🍽️</p>
        <p className="font-extrabold text-amber-600 text-lg">
          {searchQuery ? "검색 결과가 없어요" : "해당 메뉴가 없어요"}
        </p>
        <p className="text-stone-400 text-sm mt-2">
          {searchQuery ? "다른 키워드로 검색하거나 필터를 바꿔보세요" : "다른 맛 필터를 선택해보세요!"}
        </p>
        {searchQuery && (
          <button
            onClick={onClearSearch}
            className="mt-4 text-sm font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2"
          >
            검색 초기화
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {terms.map((term, i) => {
        const savedRecipe = recipes.find((r) => r.termId === term.id) ?? null;
        return (
          <TermCard
            key={term.id}
            term={term}
            savedRecipe={savedRecipe}
            onSaveRecipe={onSaveRecipe}
            index={i}
          />
        );
      })}
    </div>
  );
}
