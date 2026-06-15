import { useState } from "react";
import { INITIAL_TERMS } from "./data/menuData";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import TermList from "./components/TermList";
import Fridge from "./components/Fridge";

/* 콘텐츠 최대 너비를 flex 중앙 정렬로 감싸는 wrapper */
function Container({ children, className = "" }) {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-5xl px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [recipes, setRecipes] = useLocalStorage("user_recipes", []);

  const filteredTerms =
    filter === "all"
      ? INITIAL_TERMS
      : INITIAL_TERMS.filter((t) => t.taste === filter);

  const handleSaveRecipe = (newRecipe) => {
    setRecipes((prev) => {
      const filtered = prev.filter((r) => r.termId !== newRecipe.termId);
      return [...filtered, newRecipe];
    });
  };

  const handleDeleteRecipe = (recipeId) => {
    setRecipes((prev) => prev.filter((r) => r.recipeId !== recipeId));
  };

  const handleEditRecipe = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.recipeId === updatedRecipe.recipeId ? updatedRecipe : r))
    );
  };

  const handleNavClick = (target) => {
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(`${target}-section`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="w-full min-h-screen"
      style={{ background: "linear-gradient(160deg, #fff9f0 0%, #fff3e0 50%, #fff9f0 100%)" }}
    >
      <Header onNavClick={handleNavClick} />

      {/* ── 히어로 ── */}
      <section className="relative w-full overflow-hidden pt-16 pb-10 text-center">
        {/* 배경 장식 이모지 */}
        <span className="absolute top-8 left-8 text-5xl opacity-10 animate-float select-none pointer-events-none">🍜</span>
        <span className="absolute top-12 right-12 text-4xl opacity-10 animate-float select-none pointer-events-none" style={{ animationDelay: "1s" }}>🥘</span>
        <span className="absolute bottom-4 left-1/4 text-3xl opacity-10 animate-float select-none pointer-events-none" style={{ animationDelay: "0.5s" }}>🍱</span>

        <div className="relative w-full flex justify-center px-4">
          <div className="w-full max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-orange-200">
              🍴 파인만 학습법으로 배우는 부동산
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-amber-950 leading-tight tracking-tight">
              어려운 부동산 지식,{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-orange-500">찰떡 비유</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-200 rounded" style={{ zIndex: -1 }} />
              </span>
              로{" "}맛있게 소화하세요!
            </h1>
            <p className="mt-4 text-amber-700 text-sm sm:text-base leading-relaxed">
              딱딱한 용어를 친근한 비유로 시식하고,<br />
              나만의 레시피를 직접 요리해 냉장고에 저장해보세요.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button
                onClick={() => handleNavClick("menu")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-lg transition-all duration-200 active:scale-95"
                style={{ boxShadow: "0 8px 20px rgba(249,115,22,0.3)" }}
              >
                🍽️ 오늘의 메뉴 보기
              </button>
              <button
                onClick={() => handleNavClick("fridge")}
                className="bg-white hover:bg-amber-50 text-amber-700 font-bold px-6 py-3 rounded-2xl text-sm border-2 border-amber-200 transition-all duration-200 active:scale-95"
              >
                🧊 내 냉장고 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 구분선 ── */}
      <Container className="py-2">
        <div className="border-t-2 border-dashed border-amber-200" />
      </Container>

      {/* ── 메뉴 섹션 ── */}
      <Container className="py-8">
        <section id="menu-section">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-xl font-extrabold text-amber-900">🍽️ 오늘의 메뉴</h2>
            <span className="text-xs text-amber-400 font-medium bg-amber-100 px-2.5 py-1 rounded-full">
              총 {filteredTerms.length}개
            </span>
          </div>
          <FilterBar currentFilter={filter} onFilterChange={setFilter} />
          <TermList
            terms={filteredTerms}
            recipes={recipes}
            onSaveRecipe={handleSaveRecipe}
          />
        </section>

        {/* ── 냉장고 ── */}
        <div id="fridge-section">
          <Fridge recipes={recipes} onDelete={handleDeleteRecipe} onEdit={handleEditRecipe} />
        </div>
      </Container>

      {/* ── 푸터 ── */}
      <footer className="w-full text-center py-8 text-amber-300 text-xs">
        <p className="mb-1">🍱 지식 맛집 — 부린이를 위한 부동산 지식 플랫폼</p>
        <p>파인만 학습법으로 부동산 개념을 완전히 소화하세요</p>
      </footer>
    </div>
  );
}
