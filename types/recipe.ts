export type Category = "主菜" | "麺・パスタ" | "ご飯もの" | "副菜・おつまみ" | "スープ・鍋";

export type Recipe = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  servings: string;
  cookTime: string;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  tips: string[];
  youtubeId?: string;
  views?: number;
};
