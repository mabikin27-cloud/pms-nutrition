import { supabase } from "@/lib/supabase";
import NutrientCard from "@/components/NutrientCard";
import BackButton from "@/components/BackButton";
import { notFound } from "next/navigation";
import { SymptomNutrient } from "@/types";

type Props = { params: Promise<{ id: string }> };

export default async function SymptomDetailPage({ params }: Props) {
  const { id } = await params;

  const [{ data: symptom }, { data: relations }] = await Promise.all([
    supabase.from("symptoms").select("*").eq("id", id).single(),
    supabase
      .from("symptom_nutrients")
      .select("*, nutrients(*)")
      .eq("symptom_id", id),
  ]);

  if (!symptom) notFound();

  return (
    <main className="max-w-sm mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <BackButton />
        <h1 className="text-xl font-bold text-brand-text mt-3">{symptom.name}</h1>
        {symptom.description && (
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            {symptom.description}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-base font-semibold text-brand-text">関連する栄養素</h2>
        <p className="text-xs text-brand-muted mt-0.5">
          {symptom.name}に関わる栄養素一覧です
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {relations?.map((rel: SymptomNutrient) =>
          rel.nutrients ? (
            <NutrientCard
              key={rel.nutrient_id}
              nutrient={rel.nutrients}
              reason={rel.reason}
            />
          ) : null
        )}
      </div>
    </main>
  );
}
