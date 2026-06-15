import { useState } from "react";

export default function RecipeForm({ termId, term, initialValue = "", onSave, onClose }) {
  const [input, setInput] = useState(initialValue);

  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSave({
      recipeId: Date.now(),
      termId,
      term,
      myAnalogy: trimmed,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setInput("");
    onClose();
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200 p-4 flex flex-col gap-2.5">
      <p className="text-[11px] font-extrabold text-amber-400 uppercase tracking-widest">
        ✏️ 나만의 비유 요리하기 (파인만 학습법)
      </p>

      {/* 입력창 + 저장 버튼 — min-w-0으로 overflow 방지 */}
      <div className="flex gap-2 min-w-0">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder={`${term}는 마치... 같다!`}
          className="min-w-0 flex-1 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 text-sm text-amber-900 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all"
        />
        <button
          onClick={handleSave}
          className="shrink-0 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold px-4 py-2 rounded-xl text-sm transition-all duration-150"
        >
          저장
        </button>
      </div>

      <button
        onClick={onClose}
        className="text-xs text-amber-300 hover:text-amber-500 transition-colors text-left"
      >
        ↩ 취소
      </button>
    </div>
  );
}
