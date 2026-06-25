# 🌸 PMS栄養辞典

PMSの不調から栄養素を逆引きできる、サポートプログラム参加者向けの栄養辞典アプリです。

> 「むくみ」「頭痛」「イライラ」などの不調をタップするだけで、関連する栄養素・食材・摂取目安がすぐわかります。

---

## 画面

<!-- スクリーンショットを撮ったら下記に追加してください -->
<!-- ![トップページ](docs/top.png) -->
<!-- ![不調一覧](docs/symptoms.png) -->
<!-- ![栄養素詳細](docs/nutrient.png) -->

---

## 機能

- 🔍 **不調から逆引き**：7カテゴリの不調（むくみ・頭痛・イライラ・疲労・肌荒れ・便秘・睡眠）から関連栄養素を検索
- 💊 **栄養素詳細**：14種の栄養素の働き・豊富な食材・1日の摂取目安を表示
- 🔗 **不調↔栄養素のクロスリンク**：栄養素から関連する不調へも移動可能
- 📱 **スマホ最適化**：LINEのURLから開くことを想定したモバイルファーストUI

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16（App Router） |
| 言語 | TypeScript |
| スタイリング | Tailwind CSS v4 |
| データベース | Supabase（PostgreSQL） |
| デプロイ | Vercel |

---

## ローカル開発

```bash
# 依存パッケージのインストール
npm install

# .env.local を作成して環境変数を設定
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# 開発サーバー起動
npm run dev
```

`supabase-schema.sql` をSupabaseのSQL Editorで実行すると、テーブルと初期データが作成されます。

---

## 画面遷移

```
/                    トップページ
/symptoms            不調カテゴリ一覧
/symptoms/:id        不調詳細 + 関連栄養素
/nutrients           栄養素一覧（カテゴリ別）
/nutrients/:id       栄養素詳細
```
