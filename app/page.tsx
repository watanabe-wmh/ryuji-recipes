"use client";

import { useState, useMemo } from "react";
import { recipes } from "@/data/recipes";
import RecipeCard from "@/components/RecipeCard";
import { Category } from "@/types/recipe";

const categories: (Category | "すべて")[] = [
  "すべて",
  "主菜",
  "麺・パスタ",
  "ご飯もの",
  "副菜・おつまみ",
  "スープ・鍋",
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | "すべて">("すべて");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      const matchCategory = selectedCategory === "すべて" || r.category === selectedCategory;
      const matchSearch =
        searchQuery === "" ||
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.ingredients.some((i) => i.name.includes(searchQuery));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      {/* 検索バー */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="レシピ名・材料で検索..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-96 px-4 py-3 rounded-xl border border-stone-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all text-stone-700 bg-white"
        />
      </div>

      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
              selectedCategory === cat
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white text-stone-600 border border-stone-300 hover:border-orange-400 hover:text-orange-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* レシピ件数 */}
      <p className="text-sm text-stone-500 mb-4">
        {filteredRecipes.length} 件のレシピ
      </p>

      {/* レシピ一覧 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.slug} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center py-16 text-stone-400">
          <p className="text-4xl mb-4">🍳</p>
          <p>条件に合うレシピが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}
