import { useState } from "react";

const ROTATIONS = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0"];
const COLORS = [
  "bg-yellow-200 border-yellow-300",
  "bg-amber-200 border-amber-300",
  "bg-lime-200 border-lime-300",
  "bg-pink-100 border-pink-200",
  "bg-sky-100 border-sky-200",
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
      className={`postit-shadow ${color} ${isEditing ? "rotate-0" : rotation} border-2 rounded-lg p-4 relative flex flex-col gap-2`}
    >
      {/* 테이프 효과 */}
      <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-10 h-4 bg-white/70 rounded-sm border border-gray-200 shadow-sm" />

      {/* 액션 버튼들 */}
      {!isEditing && (
        <div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-blue-400 hover:bg-white/60 transition-colors text-xs"
            title="수정"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(recipe.recipeId)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-red-400 hover:bg-white/60 transition-colors text-xs font-bold"
            title="삭제"
          >
            ✕
          </button>
        </div>
      )}

      <div className="mt-1 pr-12">
        <span className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">{recipe.term}</span>
      </div>

      {/* 일반 보기 */}
      {!isEditing && (
        <p className="text-sm text-gray-800 leading-relaxed font-medium break-words">{recipe.myAnalogy}</p>
      )}

      {/* 수정 모드 */}
      {isEditing && (
        <div className="flex flex-col gap-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
            className="w-full bg-white/70 border border-gray-300 rounded-lg px-2 py-1.5 text-sm text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300"
            autoFocus
          />
          <div className="flex gap-1.5">
            <button
              onClick={handleSave}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-1.5 rounded-lg transition-colors"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-white/70 hover:bg-white text-gray-500 text-xs font-bold py-1.5 rounded-lg border border-gray-200 transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      )}

      {!isEditing && (
        <p className="text-[10px] text-gray-400 text-right">{recipe.createdAt}</p>
      )}
    </div>
  );
}
