import TermCard from "./TermCard";

export default function TermList({ terms, recipes, onSaveRecipe }) {
  if (terms.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="font-bold text-amber-400 text-lg">해당 메뉴가 없어요</p>
        <p className="text-amber-300 text-sm mt-1">다른 필터를 선택해보세요!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {terms.map((term) => {
        const savedRecipe = recipes.find((r) => r.termId === term.id) ?? null;
        return (
          <TermCard
            key={term.id}
            term={term}
            savedRecipe={savedRecipe}
            onSaveRecipe={onSaveRecipe}
          />
        );
      })}
    </div>
  );
}
