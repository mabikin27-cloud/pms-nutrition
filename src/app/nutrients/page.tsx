import { supabase } from "@/lib/supabase";
import NutrientCard from "@/components/NutrientCard";
import Link from "next/link";
import { Nutrient } from "@/types";

export default async function NutrientsPage() {
  const { data: nutrients, error } = await supabase
    .from("nutrients")
    .select("*")
    .order("sort_order");

  if (error) {
    return (
      <main className="px-6 py-8">
        <p className="text-brand-muted text-sm">データの取得に失敗しました。</p>
      </main>
    );
  }

  const grouped = (nutrients ?? []).reduce<Record<string, Nutrient[]>>(
    (acc, nutrient: Nutrient) => {
      if (!acc[nutrient.category]) acc[nutrient.category] = [];
      acc[nutrient.category].push(nutrient);
      return acc;
    },
    {}
  );

  const CATEGORY_ORDER = ["ミネラル", "ビタミン", "タンパク質", "食物繊維", "脂質"];
  const sortedCategories = Object.keys(grouped).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  return (
    <main className="max-w-sm mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <Link href="/" className="text-sm text-brand-muted hover:text-brand-terracotta transition-colors">
          ← トップへ
        </Link>
        <h1 className="text-xl font-bold text-brand-text mt-3">栄養素から調べる</h1>
        <p className="text-sm text-brand-muted mt-1">気になる栄養素を選んでください</p>
      </div>

      <div className="flex flex-col gap-8">
        {sortedCategories.map((category) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-brand-sage mb-3 px-1">{category}</h2>
            <div className="flex flex-col gap-3">
              {grouped[category].map((nutrient: Nutrient) => (
                <NutrientCard key={nutrient.id} nutrient={nutrient} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
