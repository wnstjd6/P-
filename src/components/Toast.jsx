export default function Toast({ message, type = "success" }) {
  if (!message) return null;

  const styles = {
    success: "bg-emerald-600 border-emerald-400",
    delete: "bg-stone-700 border-stone-500",
    info: "bg-amber-600 border-amber-400",
  };

  const icons = {
    success: "✅",
    delete: "🗑️",
    info: "💡",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-5 py-3 rounded-2xl text-white text-sm font-semibold shadow-2xl border animate-toast ${styles[type]}`}
    >
      <span>{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
}
