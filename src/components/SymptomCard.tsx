import Link from "next/link";
import { Symptom } from "@/types";

const SYMPTOM_ICONS: Record<string, string> = {
  "S-01": "💧",
  "S-02": "🤕",
  "S-03": "😤",
  "S-04": "😴",
  "S-05": "✨",
  "S-06": "🌿",
  "S-07": "🌙",
};

export default function SymptomCard({ symptom }: { symptom: Symptom }) {
  return (
    <Link href={`/symptoms/${symptom.id}`}>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-pink/20 hover:shadow-md hover:border-brand-pink/50 transition-all duration-200 flex items-center gap-4">
        <span className="text-3xl">{SYMPTOM_ICONS[symptom.id] ?? "🌸"}</span>
        <div>
          <p className="font-semibold text-brand-text">{symptom.name}</p>
          {symptom.description && (
            <p className="text-sm text-brand-muted mt-0.5 line-clamp-2">
              {symptom.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
