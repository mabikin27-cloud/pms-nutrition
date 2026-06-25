import { supabase } from "@/lib/supabase";
import SymptomCard from "@/components/SymptomCard";
import Link from "next/link";
import { Symptom } from "@/types";

export default async function SymptomsPage() {
  const { data: symptoms, error } = await supabase
    .from("symptoms")
    .select("*")
    .order("sort_order");

  if (error) {
    return (
      <main className="px-6 py-8">
        <p className="text-brand-muted text-sm">データの取得に失敗しました。</p>
      </main>
    );
  }

  return (
    <main className="max-w-sm mx-auto w-full px-6 py-8">
      <div className="mb-6">
        <Link href="/" className="text-sm text-brand-muted hover:text-brand-terracotta transition-colors">
          ← トップへ
        </Link>
        <h1 className="text-xl font-bold text-brand-text mt-3">不調から調べる</h1>
        <p className="text-sm text-brand-muted mt-1">気になる不調を選んでください</p>
      </div>

      <div className="flex flex-col gap-3">
        {symptoms?.map((symptom: Symptom) => (
          <SymptomCard key={symptom.id} symptom={symptom} />
        ))}
      </div>
    </main>
  );
}
