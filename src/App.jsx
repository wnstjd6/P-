import { useState, useEffect, useMemo } from "react";
import { INITIAL_TERMS } from "./data/menuData";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import StatsBar from "./components/StatsBar";
import TermList from "./components/TermList";
import Fridge from "./components/Fridge";
import Toast from "./components/Toast";

function Container({ children, className = "" }) {
  return (
    <div className="w-full flex justify-center">
      <div className={`w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useLocalStorage("user_recipes", []);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast.message) return;
    const t = setTimeout(() => setToast({ message: "", type: "success" }), 2800);
    return () => clearTimeout(t);
  }, [toast.message]);

  const filteredTerms = useMemo(() => {
    let terms = filter === "all" ? INITIAL_TERMS : INITIAL_TERMS.filter((t) => t.taste === filter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.fullName.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.chefAnalogy.toLowerCase().includes(q)
      );
    }
    return terms;
  }, [filter, search]);

  const easyCount = INITIAL_TERMS.filter((t) => t.taste === "easy").length;
  const spicyCount = INITIAL_TERMS.filter((t) => t.taste === "spicy").length;

  const handleSaveRecipe = (newRecipe) => {
    const isUpdate = recipes.some((r) => r.termId === newRecipe.termId);
    setRecipes((prev) => {
      const filtered = prev.filter((r) => r.termId !== newRecipe.termId);
      return [...filtered, newRecipe];
    });
    showToast(
      isUpdate ? `"${newRecipe.term}" 비유를 수정했어요!` : `"${newRecipe.term}" 비유를 냉장고에 저장했어요!`,
      "success"
    );
  };

  const handleDeleteRecipe = (recipeId) => {
    const target = recipes.find((r) => r.recipeId === recipeId);
    setRecipes((prev) => prev.filter((r) => r.recipeId !== recipeId));
    showToast(target ? `"${target.term}" 비유를 삭제했어요` : "비유를 삭제했어요", "delete");
  };

  const handleEditRecipe = (updatedRecipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.recipeId === updatedRecipe.recipeId ? updatedRecipe : r))
    );
    showToast(`"${updatedRecipe.term}" 비유를 수정했어요!`, "success");
  };

  const handleNavClick = (target) => {
    if (target === "top") window.scrollTo({ top: 0, behavior: "smooth" });
    else document.getElementById(`${target}-section`)?.scrollIntoView({ behavior: "smooth" });
  };

  const savedPercent = Math.round((recipes.length / INITIAL_TERMS.length) * 100);

  return (
    <div className="w-full min-h-screen bg-kitchen">
      <Header
        onNavClick={handleNavClick}
        savedCount={recipes.length}
        totalTerms={INITIAL_TERMS.length}
        savedPercent={savedPercent}
      />

      {/* 히어로 */}
      <section className="relative w-full overflow-hidden pt-20 pb-12">
        <span className="absolute top-10 left-[8%] text-6xl opacity-[0.07] animate-float select-none pointer-events-none">🍜</span>
        <span className="absolute top-16 right-[10%] text-5xl opacity-[0.07] animate-float select-none pointer-events-none" style={{ animationDelay: "1.2s" }}>🥘</span>
        <span className="absolute bottom-8 left-[20%] text-4xl opacity-[0.06] animate-float select-none pointer-events-none" style={{ animationDelay: "0.6s" }}>🍱</span>
        <span className="absolute top-32 right-[30%] text-3xl opacity-[0.05] animate-float select-none pointer-events-none" style={{ animationDelay: "2s" }}>🏠</span>

        <Container>
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 glass-panel text-orange-600 text-xs font-bold px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              파인만 학습법 × 부동산 지식
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-amber-950 leading-[1.15] tracking-tight">
              어려운 부동산,
              <br />
              <span className="text-shimmer">찰떡 비유</span>로 맛있게
            </h1>

            <p className="mt-5 text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              딱딱한 용어를 친근한 음식·일상 비유로 시식하고,
              나만의 레시피를 요리해 냉장고에 보관하세요.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <button
                onClick={() => handleNavClick("menu")}
                className="group bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-7 py-3.5 rounded-2xl text-sm shadow-lg transition-all duration-200 active:scale-95"
                style={{ boxShadow: "0 8px 24px rgba(249,115,22,0.35)" }}
              >
                🍽️ 오늘의 메뉴 보기
                <span className="inline-block ml-1 transition-transform group-hover:translate-x-0.5">→</span>
              </button>
              <button
                onClick={() => handleNavClick("fridge")}
                className="glass-panel hover:bg-white text-amber-800 font-bold px-7 py-3.5 rounded-2xl text-sm transition-all duration-200 active:scale-95 shadow-sm"
              >
                🧊 내 냉장고 ({recipes.length})
              </button>
            </div>
          </div>
        </Container>
      </section>

      <Container className="pb-16">
        <StatsBar
          totalTerms={INITIAL_TERMS.length}
          savedCount={recipes.length}
          easyCount={easyCount}
          spicyCount={spicyCount}
        />

        <section id="menu-section">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
            <div>
              <h2 className="text-2xl font-extrabold text-amber-950">🍽️ 오늘의 메뉴</h2>
              <p className="text-sm text-stone-500 mt-1">맛보기를 눌러 셰프의 비유를 확인하고, 나만의 비유를 요리해보세요</p>
            </div>
            <span className="self-start sm:self-auto text-xs font-bold text-orange-600 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-full">
              {filteredTerms.length} / {INITIAL_TERMS.length}개 표시
            </span>
          </div>

          <SearchBar value={search} onChange={setSearch} resultCount={filteredTerms.length} />
          <FilterBar currentFilter={filter} onFilterChange={setFilter} counts={{
            all: INITIAL_TERMS.length,
            easy: easyCount,
            spicy: spicyCount,
          }} />
          <TermList
            terms={filteredTerms}
            recipes={recipes}
            onSaveRecipe={handleSaveRecipe}
            searchQuery={search}
            onClearSearch={() => setSearch("")}
          />
        </section>

        <div id="fridge-section">
          <Fridge recipes={recipes} onDelete={handleDeleteRecipe} onEdit={handleEditRecipe} />
        </div>
      </Container>

      <footer className="w-full border-t border-amber-100/80 bg-white/40 backdrop-blur-sm">
        <Container className="py-10 text-center">
          <p className="text-amber-800 font-bold text-sm mb-1">🍱 지식 맛집</p>
          <p className="text-stone-400 text-xs">부린이를 위한 참여형 부동산 지식 플랫폼 · 파인만 학습법</p>
          <p className="text-stone-300 text-[10px] mt-3">LocalStorage로 저장 · 브라우저를 바꾸면 데이터가 사라질 수 있어요</p>
        </Container>
      </footer>

      <Toast message={toast.message} type={toast.type} />
    </div>
  );
}
