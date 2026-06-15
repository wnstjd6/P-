import { useState } from "react";

function ProgressRing({ percent }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;

  return (
    <svg className="progress-ring w-9 h-9" viewBox="0 0 36 36">
      <circle cx="18" cy="18" r={r} fill="none" stroke="#fde68a" strokeWidth="3" />
      <circle
        cx="18" cy="18" r={r} fill="none"
        stroke="#f97316"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

export default function Header({ onNavClick, savedCount, totalTerms, savedPercent }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-amber-100/60 shadow-sm">
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="w-full max-w-6xl h-16 flex items-center justify-between">
          <button
            onClick={() => onNavClick("top")}
            className="flex items-center gap-2.5 group"
          >
            <span className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 text-lg shadow-md group-hover:scale-105 transition-transform duration-200">
              🍱
            </span>
            <div className="text-left">
              <span className="block text-base font-extrabold text-amber-900 tracking-tight leading-none">지식 맛집</span>
              <span className="block text-[10px] font-medium text-amber-500 mt-0.5">부동산 비유 학습</span>
            </div>
          </button>

          <nav className="hidden sm:flex items-center gap-1">
            <NavBtn onClick={() => onNavClick("menu")}>🍽️ 오늘의 메뉴</NavBtn>
            <NavBtn onClick={() => onNavClick("fridge")}>
              🧊 냉장고
              {savedCount > 0 && (
                <span className="ml-1.5 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {savedCount}
                </span>
              )}
            </NavBtn>
            <div className="ml-3 flex items-center gap-1.5 pl-3 border-l border-amber-100">
              <ProgressRing percent={savedPercent} />
              <span className="text-[11px] font-bold text-amber-600">{savedCount}/{totalTerms}</span>
            </div>
          </nav>

          <button
            className="sm:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-amber-50/80 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
          >
            <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-amber-100 px-4 py-3 flex flex-col gap-1 animate-slide-down">
          <MobileNavBtn onClick={() => { onNavClick("menu"); setMenuOpen(false); }}>
            🍽️ 오늘의 메뉴
          </MobileNavBtn>
          <MobileNavBtn onClick={() => { onNavClick("fridge"); setMenuOpen(false); }}>
            🧊 나만의 냉장고 {savedCount > 0 && `(${savedCount})`}
          </MobileNavBtn>
        </div>
      )}
    </header>
  );
}

function NavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center px-4 py-2 rounded-xl text-sm font-semibold text-amber-800 hover:bg-amber-50/80 hover:text-amber-950 transition-colors duration-150"
    >
      {children}
    </button>
  );
}

function MobileNavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold text-amber-800 hover:bg-amber-50 transition-colors duration-150"
    >
      {children}
    </button>
  );
}
