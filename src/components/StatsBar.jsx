function ProgressRing({ percent }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <div className="relative w-16 h-16 shrink-0">
      <svg className="progress-ring w-full h-full" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#fde68a" strokeWidth="6" />
        <circle
          cx="32" cy="32" r={r} fill="none"
          stroke="url(#grad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-amber-800">
        {percent}%
      </span>
    </div>
  );
}

export default function StatsBar({ totalTerms, savedCount, easyCount, spicyCount }) {
  const percent = totalTerms > 0 ? Math.round((savedCount / totalTerms) * 100) : 0;

  const stats = [
    { emoji: "📚", label: "전체 용어", value: totalTerms, color: "text-amber-800 bg-amber-50 border-amber-100" },
    { emoji: "✏️", label: "내 비유", value: savedCount, color: "text-orange-700 bg-orange-50 border-orange-100" },
    { emoji: "🟢", label: "순한맛", value: easyCount, color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { emoji: "🌶️", label: "매운맛", value: spicyCount, color: "text-red-600 bg-red-50 border-red-100" },
  ];

  return (
    <div className="glass-panel rounded-3xl p-5 sm:p-6 shadow-sm mb-8 animate-fade-up">
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
        <ProgressRing percent={percent} />
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">학습 소화율</p>
          <h3 className="text-lg font-extrabold text-amber-950">
            {savedCount === 0
              ? "아직 요리를 시작하지 않았어요!"
              : savedCount === totalTerms
                ? "🎉 모든 메뉴를 완벽히 소화했어요!"
                : `${savedCount}개 용어에 나만의 비유를 담았어요`}
          </h3>
          <p className="text-sm text-stone-500 mt-1">
            파인만 학습법 — 직접 비유를 만들면 기억이 2배 오래 남아요
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full sm:w-auto">
          {stats.map(({ emoji, label, value, color }) => (
            <div key={label} className={`rounded-2xl border px-3 py-2.5 text-center ${color}`}>
              <p className="text-lg leading-none">{emoji}</p>
              <p className="text-xl font-extrabold mt-1">{value}</p>
              <p className="text-[10px] font-bold opacity-70 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
