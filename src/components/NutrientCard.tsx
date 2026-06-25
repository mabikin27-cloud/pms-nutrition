import Link from "next/link";
import { Nutrient } from "@/types";

const CATEGORY_COLORS: Record<string, string> = {
  ミネラル: "bg-brand-sage-light text-brand-sage",
  ビタミン: "bg-brand-pink-light text-brand-terracotta",
  タンパク質: "bg-orange-50 text-orange-600",
  食物繊維: "bg-green-50 text-green-700",
  脂質: "bg-yellow-50 text-yellow-700",
};

type Props = {
  nutrient: Nutrient;
  reason?: string | null;
};

export default function NutrientCard({ nutrient, reason }: Props) {
  const badgeClass =
    CATEGORY_COLORS[nutrient.category] ?? "bg-gray-100 text-gray-600";

  return (
    <Link href={`/nutrients/${nutrient.id}`}>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-brand-pink/20 hover:shadow-md hover:border-brand-pink/50 transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold text-brand-text">{nutrient.name}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
            {nutrient.category}
          </span>
        </div>
        {reason && (
          <p className="text-sm text-brand-muted mt-2 line-clamp-2">{reason}</p>
        )}
      </div>
    </Link>
  );
}
