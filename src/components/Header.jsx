import { useState } from "react";

export default function Header({ onNavClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-100 shadow-sm">
      <div className="w-full flex justify-center px-4 sm:px-6">
        <div className="w-full max-w-5xl h-14 flex items-center justify-between">
        {/* 로고 */}
        <button
          onClick={() => onNavClick("top")}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">🍱</span>
          <span className="text-lg font-extrabold text-amber-800 tracking-tight">지식 맛집</span>
        </button>

        {/* 데스크탑 메뉴 */}
        <nav className="hidden sm:flex items-center gap-1">
          <NavBtn onClick={() => onNavClick("menu")}>🍽️ 오늘의 메뉴</NavBtn>
          <NavBtn onClick={() => onNavClick("fridge")}>🧊 나만의 냉장고</NavBtn>
        </nav>

        {/* 모바일 햄버거 */}
        <button
          className="sm:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-amber-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-amber-700 rounded-full transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {menuOpen && (
        <div className="sm:hidden bg-white/95 backdrop-blur-md border-t border-amber-100 px-4 py-3 flex flex-col gap-1 animate-slide-down">
          <MobileNavBtn onClick={() => { onNavClick("menu"); setMenuOpen(false); }}>
            🍽️ 오늘의 메뉴
          </MobileNavBtn>
          <MobileNavBtn onClick={() => { onNavClick("fridge"); setMenuOpen(false); }}>
            🧊 나만의 냉장고
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
      className="px-4 py-2 rounded-xl text-sm font-semibold text-amber-700 hover:bg-amber-50 hover:text-amber-900 transition-colors duration-150"
    >
      {children}
    </button>
  );
}

function MobileNavBtn({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl text-sm font-semibold text-amber-700 hover:bg-amber-50 transition-colors duration-150"
    >
      {children}
    </button>
  );
}
