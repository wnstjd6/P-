import { useState } from "react";
import RecipeForm from "./RecipeForm";

const TASTE = {
  easy: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bar: "from-emerald-400 to-teal-400",
    label: "순한맛",
    emoji: "🟢",
    icon: "🥣",
  },
  spicy: {
    badge: "bg-red-100 text-red-600 border-red-200",
    bar: "from-red-400 to-orange-500",
    label: "매운맛",
    emoji: "🌶️",
    icon: "🔥",
  },
};

export default function TermCard({ term, savedRecipe, onSaveRecipe, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const taste = TASTE[term.taste];

  return (
    <div
      className={`flip-scene animate-card-in ${isFlipped ? "is-flipped" : ""}`}
      style={{ animationDelay: `${Math.min(index * 0.05, 0.4)}s`, opacity: 0 }}
    >
      <div className={`flip-card relative min-h-[300px] ${isFlipped ? "is-flipped" : ""}`}>
        {/* 앞면 */}
        <div className="flip-face absolute inset-0 bg-white rounded-3xl border border-amber-100/80 shadow-md overflow-hidden flex flex-col">
          <div className={`h-1.5 w-full bg-gradient-to-r ${taste.bar}`} />

          <div className="p-5 flex flex-col gap-3 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xl font-extrabold text-amber-950 tracking-tight">{term.term}</h3>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${taste.badge}`}>
                    {taste.emoji} {taste.label}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5 font-medium">{term.fullName}</p>
              </div>
              <span className="text-2xl opacity-80 shrink-0">{taste.icon}</span>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed flex-1">{term.definition}</p>

            {savedRecipe && (
              <div className="flex items-start gap-2 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200/80 rounded-2xl px-3.5 py-2.5">
                <span className="text-sm shrink-0">✏️</span>
                <p className="text-xs text-amber-900 leading-relaxed min-w-0 break-words">
                  <span className="font-bold text-amber-700">내 비유 · </span>
                  {savedRecipe.myAnalogy}
                </p>
              </div>
            )}

            <button
              onClick={() => setIsFlipped(true)}
              className="w-full font-bold text-sm py-3 rounded-2xl text-white shadow-md transition-all duration-200 active:scale-95 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
              style={{ boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}
            >
              맛보기 💡
            </button>
          </div>
        </div>

        {/* 뒷면 — 플래시카드 */}
        <div className="flip-face flip-back absolute inset-0 bg-white rounded-3xl border border-orange-100 shadow-md overflow-hidden flex flex-col">
          <div className={`h-1.5 w-full bg-gradient-to-r ${taste.bar}`} />

          <div className="p-5 flex flex-col gap-3 flex-1 overflow-y-auto max-h-[420px]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-orange-500 uppercase tracking-widest">
                👨‍🍳 셰프의 비유
              </span>
              <button
                onClick={() => setIsFlipped(false)}
                className="text-xs font-bold text-stone-400 hover:text-stone-600 px-2 py-1 rounded-lg hover:bg-stone-50 transition-colors"
              >
                ✕ 접기
              </button>
            </div>

            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-2xl p-4 border border-orange-100/80 relative overflow-hidden">
              <span className="absolute -right-2 -bottom-2 text-5xl opacity-10 select-none">🍳</span>
              <p className="text-sm text-amber-950 leading-relaxed font-medium relative z-10">
                "{term.chefAnalogy}"
              </p>
            </div>

            {savedRecipe && (
              <div className="bg-yellow-50 rounded-2xl p-3.5 border border-yellow-200/80">
                <p className="text-[10px] font-extrabold text-yellow-600 uppercase tracking-widest mb-1">
                  ✏️ 내가 만든 비유
                </p>
                <p className="text-sm text-yellow-900 leading-relaxed">{savedRecipe.myAnalogy}</p>
              </div>
            )}

            <RecipeForm
              termId={term.id}
              term={term.term}
              existingRecipeId={savedRecipe?.recipeId}
              initialValue={savedRecipe?.myAnalogy ?? ""}
              onSave={(recipe) => {
                onSaveRecipe(recipe);
                setIsFlipped(false);
              }}
              onClose={() => setIsFlipped(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
