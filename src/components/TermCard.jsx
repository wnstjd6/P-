import { useState } from "react";
import RecipeForm from "./RecipeForm";

const TASTE = {
  easy: {
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bar: "bg-emerald-400",
    label: "순한맛",
    emoji: "🟢",
  },
  spicy: {
    badge: "bg-red-100 text-red-600 border-red-200",
    bar: "bg-red-400",
    label: "매운맛",
    emoji: "🌶️",
  },
};

export default function TermCard({ term, savedRecipe, onSaveRecipe }) {
  const [isOpen, setIsOpen] = useState(false);
  const taste = TASTE[term.taste];

  return (
    <div className="card-lift bg-white rounded-3xl border border-amber-100 shadow-md overflow-hidden flex flex-col">
      {/* 상단 컬러 바 */}
      <div className={`h-1 w-full ${taste.bar}`} />

      <div className="p-5 flex flex-col gap-3">
        {/* 헤더 */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-lg font-extrabold text-amber-950 tracking-tight">{term.term}</h3>
            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${taste.badge}`}>
              {taste.emoji} {taste.label}
            </span>
          </div>
          <p className="text-xs text-amber-400 mt-0.5 font-medium">{term.fullName}</p>
        </div>

        {/* 정의 */}
        <p className="text-sm text-gray-600 leading-relaxed">{term.definition}</p>

        {/* 저장된 내 비유 뱃지 (닫혀 있을 때만) */}
        {savedRecipe && !isOpen && (
          <div className="flex items-start gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-3 py-2.5">
            <span className="text-sm shrink-0">✏️</span>
            <p className="text-xs text-yellow-800 leading-relaxed min-w-0 break-words">
              <span className="font-bold">내 비유: </span>{savedRecipe.myAnalogy}
            </p>
          </div>
        )}

        {/* 맛보기 버튼 */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full font-bold text-sm py-2.5 rounded-2xl transition-all duration-200 active:scale-95 ${
            isOpen
              ? "bg-gray-100 text-gray-500 hover:bg-gray-200"
              : "text-white shadow-md"
          }`}
          style={isOpen ? {} : {
            background: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)",
            boxShadow: "0 4px 14px rgba(249,115,22,0.3)",
          }}
        >
          {isOpen ? "✕ 접기" : "맛보기 💡"}
        </button>

        {/* 아코디언 내용 */}
        {isOpen && (
          <div className="flex flex-col gap-3 animate-slide-down">
            {/* 셰프 비유 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
              <p className="text-[11px] font-extrabold text-orange-400 uppercase tracking-widest mb-1.5">
                👨‍🍳 셰프의 비유
              </p>
              <p className="text-sm text-orange-900 leading-relaxed">{term.chefAnalogy}</p>
            </div>

            {/* 내가 만든 비유 */}
            {savedRecipe && (
              <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-200">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] font-extrabold text-yellow-500 uppercase tracking-widest">
                    ✏️ 내가 만든 비유
                  </p>
                  <span className="text-[10px] text-yellow-400">수정하려면 아래에 새로 저장하세요</span>
                </div>
                <p className="text-sm text-yellow-900 leading-relaxed">{savedRecipe.myAnalogy}</p>
              </div>
            )}

            {/* 입력 폼 */}
            <RecipeForm
              termId={term.id}
              term={term.term}
              initialValue={savedRecipe?.myAnalogy ?? ""}
              onSave={onSaveRecipe}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
