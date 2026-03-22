import { notFound } from "next/navigation";
import { recipes } from "@/data/recipes";
import Link from "next/link";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) return { title: "レシピが見つかりません" };
  return {
    title: `${recipe.title} | リュウジのバズレシピまとめ`,
    description: recipe.description,
  };
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = recipes.find((r) => r.slug === slug);
  if (!recipe) notFound();

  const categoryColors: Record<string, string> = {
    "主菜": "bg-red-100 text-red-700",
    "麺・パスタ": "bg-amber-100 text-amber-700",
    "ご飯もの": "bg-orange-100 text-orange-700",
    "副菜・おつまみ": "bg-green-100 text-green-700",
    "スープ・鍋": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* パンくず */}
      <nav className="mb-6 text-sm text-stone-500">
        <Link href="/" className="hover:text-orange-600 transition-colors">
          ← レシピ一覧に戻る
        </Link>
      </nav>

      {/* YouTube動画 */}
      {recipe.youtubeId && (
        <div className="mb-8">
          <YouTubeEmbed videoId={recipe.youtubeId} />
        </div>
      )}

      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full ${categoryColors[recipe.category] || "bg-stone-100 text-stone-600"}`}
          >
            {recipe.category}
          </span>
          <span className="text-sm text-stone-400">
            {recipe.servings} / {recipe.cookTime}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-stone-900">
          {recipe.title}
        </h1>
        <p className="text-stone-600 mt-2 text-lg">{recipe.description}</p>
      </div>

      {/* 材料 */}
      <section className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">🥕</span> 材料
          <span className="text-sm font-normal text-stone-400">
            ({recipe.servings})
          </span>
        </h2>
        <ul className="divide-y divide-stone-100">
          {recipe.ingredients.map((ing, i) => (
            <li key={i} className="flex justify-between py-2">
              <span className="text-stone-700">{ing.name}</span>
              <span className="text-stone-500 font-medium">{ing.amount}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 手順 */}
      <section className="bg-white rounded-2xl p-6 shadow-md mb-6">
        <h2 className="text-xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <span className="text-2xl">👨‍🍳</span> 作り方
        </h2>
        <ol className="space-y-4">
          {recipe.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                {i + 1}
              </span>
              <p className="text-stone-700 pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* コツ */}
      {recipe.tips.length > 0 && (
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span> コツ・ポイント
          </h2>
          <ul className="space-y-2">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-stone-700">
                <span className="text-amber-500 flex-shrink-0">●</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* YouTube リンク */}
      {recipe.youtubeId && (
        <div className="text-center mt-8">
          <a
            href={`https://www.youtube.com/watch?v=${recipe.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md"
          >
            ▶ YouTubeで動画を見る
          </a>
        </div>
      )}
    </div>
  );
}
