import { useState } from "react";

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0", "-rotate-1"];
const COLORS = [
  "bg-yellow-200/90 border-yellow-300/80",
  "bg-amber-200/90 border-amber-300/80",
  "bg-lime-200/90 border-lime-300/80",
  "bg-pink-100/90 border-pink-200/80",
  "bg-sky-100/90 border-sky-200/80",
  "bg-violet-100/90 border-violet-200/80",
];

export default function FridgeItem({ recipe, onDelete, onEdit, index = 0 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(recipe.myAnalogy);

  const rotation = ROTATIONS[index % ROTATIONS.length];
  const color = COLORS[index % COLORS.length];

  const handleSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit({ ...recipe, myAnalogy: trimmed });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(recipe.myAnalogy);
    setIsEditing(false);
  };

  return (
    <div
      className={`postit-shadow ${color} ${isEditing ? "rotate-0" : rotation} border-2 rounded-xl p-4 relative flex flex-col gap-2 min-h-[140px]`}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/80 rounded-sm border border-stone-200/60 shadow-sm" />

      {!isEditing && (
        <div className="absolute top-2.5 right-2.5 flex gap-0.5">
          <button
            onClick={() => setIsEditing(true)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-blue-500 hover:bg-white/70 transition-colors text-xs"
            title="수정"
            aria-label="비유 수정"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(recipe.recipeId)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-stone-400 hover:text-red-500 hover:bg-white/70 transition-colors text-xs font-bold"
            title="삭제"
            aria-label="비유 삭제"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mt-2 pr-14">
        <span className="inline-block text-[10px] font-extrabold text-stone-500 uppercase tracking-widest bg-white/50 px-2 py-0.5 rounded-md">
          {recipe.term}
        </span>
      </div>

      {!isEditing ? (
        <p className="text-sm text-stone-800 leading-relaxed font-medium break-words flex-1">
          {recipe.myAnalogy}
        </p>
      ) : (
        <div className="flex flex-col gap-2 flex-1">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value.slice(0, 120))}
            rows={3}
            className="w-full bg-white/80 border border-stone-300/60 rounded-lg px-2.5 py-2 text-sm text-stone-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
            autoFocus
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleSave}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 rounded-lg transition-colors"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-white/80 hover:bg-white text-stone-500 text-xs font-bold py-2 rounded-lg border border-stone-200 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <p className="text-[10px] text-stone-400 text-right mt-auto">{recipe.createdAt}</p>
      )}
    </div>
  );
}
