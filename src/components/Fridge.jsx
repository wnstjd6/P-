import FridgeItem from "./FridgeItem";

export default function Fridge({ recipes, onDelete, onEdit }) {
  return (
    <section className="mt-16">
      <div className="relative rounded-3xl overflow-hidden border border-cyan-100/80 shadow-lg">
        {/* 냉장고 상단 */}
        <div className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 px-6 py-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              🧊 나만의 냉장고
            </h2>
            <p className="text-cyan-100 text-xs mt-1 font-medium">
              내가 요리한 비유 레시피 보관함 · LocalStorage 저장
            </p>
          </div>
          {recipes.length > 0 && (
            <div className="bg-white/20 backdrop-blur-sm text-white text-sm font-extrabold px-4 py-2 rounded-2xl border border-white/30">
              {recipes.length}개 보관 중
            </div>
          )}
        </div>

        {/* 냉장고 내부 */}
        <div
          className="relative px-5 sm:px-8 py-8 min-h-[200px]"
          style={{
            background: "linear-gradient(180deg, #ecfeff 0%, #f0f9ff 40%, #e0f2fe 100%)",
          }}
        >
          {recipes.length === 0 ? (
            <div className="text-center py-14">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/60 border-2 border-dashed border-cyan-200 mb-4">
                <span className="text-4xl opacity-50">🧊</span>
              </div>
              <p className="font-extrabold text-cyan-700 text-lg">냉장고가 비어있어요!</p>
              <p className="text-cyan-500/80 text-sm mt-2 max-w-xs mx-auto">
                위 메뉴 카드에서 '맛보기'를 누르고 나만의 비유를 요리해 저장해보세요
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
        </div>

        {/* 냉장고 하단 손잡이 */}
        <div className="bg-gradient-to-r from-slate-300 to-slate-400 h-3 flex items-center justify-center">
          <div className="w-16 h-1.5 rounded-full bg-slate-500/40" />
        </div>
      </div>
    </section>
  );
}
