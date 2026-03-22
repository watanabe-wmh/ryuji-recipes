import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "リュウジのバズレシピまとめ",
  description: "料理研究家リュウジの人気バズレシピ20選。至高シリーズを中心に、材料・手順・コツをまとめました。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-stone-50 text-stone-800 min-h-screen">
        <header className="bg-orange-600 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <a href="/" className="block">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">
                🍳 リュウジのバズレシピまとめ
              </h1>
              <p className="text-orange-100 text-sm mt-1">
                人気レシピ20選 — 至高シリーズを中心に
              </p>
            </a>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <footer className="bg-stone-800 text-stone-400 text-center py-6 text-sm">
          <p>
            レシピ出典：
            <a
              href="https://bazurecipe.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:underline"
            >
              料理研究家リュウジのバズレシピ
            </a>
          </p>
          <p className="mt-1">個人利用目的のまとめサイトです</p>
        </footer>
      </body>
    </html>
  );
}
