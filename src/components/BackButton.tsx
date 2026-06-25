"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 text-sm text-brand-muted hover:text-brand-terracotta transition-colors"
    >
      ← 戻る
    </button>
  );
}
