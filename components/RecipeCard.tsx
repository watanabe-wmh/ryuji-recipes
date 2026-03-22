import Link from "next/link";
import Image from "next/image";
import { Recipe } from "@/types/recipe";

const categoryColors: Record<string, string> = {
  "主菜": "bg-red-100 text-red-700",
  "麺・パスタ": "bg-amber-100 text-amber-700",
  "ご飯もの": "bg-orange-100 text-orange-700",
  "副菜・おつまみ": "bg-green-100 text-green-700",
  "スープ・鍋": "bg-blue-100 text-blue-700",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const thumbnailUrl = recipe.youtubeId
    ? `https://img.youtube.com/vi/${recipe.youtubeId}/mqdefault.jpg`
    : null;

  return (
    <Link href={`/recipes/${recipe.slug}`} className="group block">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-200 group-hover:shadow-xl group-hover:-translate-y-1">
        {thumbnailUrl && (
          <div className="relative aspect-video bg-stone-200">
            <Image
              src={thumbnailUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${categoryColors[recipe.category] || "bg-stone-100 text-stone-600"}`}
            >
              {recipe.category}
            </span>
            <span className="text-xs text-stone-400">{recipe.cookTime}</span>
          </div>
          <h3 className="font-bold text-lg text-stone-800 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">
            {recipe.description}
          </p>
          {recipe.views && (
            <p className="text-xs text-stone-400 mt-2">
              👀 {recipe.views.toLocaleString()} views
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
