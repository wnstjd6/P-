import { useState } from "react";

const MAX_LEN = 120;

export default function RecipeForm({ termId, term, existingRecipeId, initialValue = "", onSave, onClose }) {
  const [input, setInput] = useState(initialValue);
  const isUpdate = Boolean(existingRecipeId);

  const handleSave = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    onSave({
      recipeId: existingRecipeId ?? Date.now(),
      termId,
      term,
      myAnalogy: trimmed,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    if (!isUpdate) setInput("");
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-amber-200/80 p-4 flex flex-col gap-3">
      <div>
        <p className="text-[11px] font-extrabold text-amber-500 uppercase tracking-widest">
          ✏️ 나만의 비유 요리하기
        </p>
        <p className="text-[11px] text-stone-400 mt-0.5">파인만 학습법 — 내 말로 설명하면 진짜 이해된 거예요</p>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSave();
          }
        }}
        rows={2}
        placeholder={`${term}는 마치... 같다!`}
        className="w-full bg-amber-50/80 border border-amber-200/80 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent transition-all resize-none"
      />

      <div className="flex items-center justify-between gap-2">
        <span className={`text-[10px] font-medium ${input.length >= MAX_LEN ? "text-red-500" : "text-stone-400"}`}>
          {input.length}/{MAX_LEN}
        </span>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-2 rounded-xl text-xs font-bold text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={!input.trim()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 text-white font-bold px-5 py-2 rounded-xl text-sm transition-all duration-150 shadow-sm"
          >
            {isUpdate ? "수정" : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
