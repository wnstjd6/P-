import FridgeItem from "./FridgeItem";

export default function Fridge({ recipes, onDelete, onEdit }) {
  return (
    <section className="mt-14">
      {/* 구분선 */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-200" />
        <div className="flex items-center gap-2 shrink-0">
          <h2 className="text-xl font-extrabold text-amber-900">🧊 나만의 냉장고</h2>
          {recipes.length > 0 && (
            <span className="text-xs font-bold text-amber-500 bg-amber-100 px-2.5 py-1 rounded-full">
              {recipes.length}개
            </span>
          )}
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-200" />
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-16 rounded-3xl border-2 border-dashed border-amber-200 bg-amber-50/50">
          <p className="text-5xl mb-4 opacity-50">🧊</p>
          <p className="font-extrabold text-amber-400">냉장고가 비어있어요!</p>
          <p className="text-amber-300 text-sm mt-1.5">위 카드에서 나만의 비유를 저장해보세요.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {recipes.map((recipe, i) => (
            <FridgeItem
              key={recipe.recipeId}
              recipe={recipe}
              onDelete={onDelete}
              onEdit={onEdit}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}
