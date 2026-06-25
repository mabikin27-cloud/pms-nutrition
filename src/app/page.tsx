import Link from "next/link";

export default function TopPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* ヒーロー */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center bg-gradient-to-b from-brand-pink-light to-brand-white">
        <p className="text-4xl mb-4">🌸</p>
        <h1 className="text-2xl font-bold text-brand-text mb-3">PMS栄養辞典</h1>
        <p className="text-brand-muted text-sm leading-relaxed max-w-xs">
          不調から栄養素を逆引きできる、<br />
          あなたのためのPMSサポート辞典です。
        </p>
      </section>

      {/* ナビゲーション */}
      <section className="px-6 py-8 flex flex-col gap-4 max-w-sm mx-auto w-full">
        <Link href="/symptoms">
          <div className="bg-brand-pink text-white rounded-2xl p-5 shadow-sm hover:opacity-90 transition-opacity text-center">
            <p className="text-lg font-semibold">💧 不調から調べる</p>
            <p className="text-sm mt-1 opacity-80">むくみ・頭痛・イライラなど</p>
          </div>
        </Link>
        <Link href="/nutrients">
          <div className="bg-brand-sage text-white rounded-2xl p-5 shadow-sm hover:opacity-90 transition-opacity text-center">
            <p className="text-lg font-semibold">🌿 栄養素から調べる</p>
            <p className="text-sm mt-1 opacity-80">マグネシウム・鉄・ビタミンBなど</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
