import { supabase } from "@/lib/supabase";
import BackButton from "@/components/BackButton";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SymptomNutrient } from "@/types";

type Props = { params: Promise<{ id: string }> };

export default async function NutrientDetailPage({ params }: Props) {
  const { id } = await params;

  const [{ data: nutrient }, { data: relations }] = await Promise.all([
    supabase.from("nutrients").select("*").eq("id", id).single(),
    supabase
      .from("symptom_nutrients")
      .select("*, symptoms(*)")
      .eq("nutrient_id", id),
  ]);

  if (!nutrient) notFound();

  return (
    <main className="max-w-sm mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <BackButton />
        <div className="flex items-center gap-3 mt-3">
          <h1 className="text-xl font-bold text-brand-text">{nutrient.name}</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-pink-light text-brand-terracotta">
            {nutrient.category}
          </span>
        </div>
      </div>

      {/* 働き */}
      {nutrient.description && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-brand-sage mb-2">働き</h2>
          <p className="text-sm text-brand-text leading-relaxed">{nutrient.description}</p>
        </section>
      )}

      {/* 摂取目安 */}
      {nutrient.daily_intake && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-brand-sage mb-2">1日の摂取目安</h2>
          <div className="bg-brand-sage-light rounded-xl px-4 py-3">
            <p className="text-sm text-brand-text font-medium">{nutrient.daily_intake}</p>
          </div>
        </section>
      )}

      {/* 豊富な食材 */}
      {nutrient.foods && nutrient.foods.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-brand-sage mb-2">豊富な食材</h2>
          <div className="flex flex-wrap gap-2">
            {nutrient.foods.map((food: string) => (
              <span
                key={food}
                className="bg-brand-pink-light text-brand-terracotta text-xs px-3 py-1 rounded-full"
              >
                {food}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* 関連する不調 */}
      {relations && relations.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-brand-sage mb-2">関連する不調</h2>
          <div className="flex flex-col gap-2">
            {relations.map((rel: SymptomNutrient) =>
              rel.symptoms ? (
                <Link key={rel.symptom_id} href={`/symptoms/${rel.symptom_id}`}>
                  <div className="bg-white border border-brand-pink/20 rounded-xl px-4 py-3 hover:border-brand-pink/50 transition-colors">
                    <p className="text-sm font-medium text-brand-text">{rel.symptoms.name}</p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}
    </main>
  );
}
