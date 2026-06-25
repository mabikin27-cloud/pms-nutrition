# CLAUDE.md

このファイルは、リポジトリ内のコードを扱う際に Claude Code (claude.ai/code) へ提供するガイダンスです。

## プロジェクト概要

**PMS栄養辞典** — PMSサポートのための栄養素リファレンスアプリ。ユーザーが自分の不調から関連栄養素・食材へとナビゲートできる。対象ユーザーはPMSサポートプログラムの参加者で、LINEからスマートフォンでアクセスすることを想定。

詳細は `requirements.md` を参照。

## 技術スタック

- **フロントエンド**：Next.js（App Router）
- **バックエンド・DB**：Supabase
- **デプロイ**：Vercel（無料枠）
- **言語**：TypeScript

## 開発コマンド

```bash
npm run dev    # 開発サーバー起動（http://localhost:3000）
npm run build  # 本番ビルド
npm run lint   # ESLintチェック
```

## 開発フェーズ

- **MVP（現在）**：ログインなし。Supabaseにデータを格納して閲覧。不調→栄養素→食材の3階層閲覧。
- **v1.0**：メール + Google OAuth ログイン（参加者限定アクセス）。
- **v2.0**：不調・栄養素データの管理者編集画面（CMS）、PMS4タイプ診断との連携。

## 画面遷移・ルート構造

```
/                    — トップページ
/symptoms            — 不調カテゴリ一覧（7カテゴリ、カード形式）
/symptoms/:id        — 不調詳細 ＋ 関連栄養素一覧（1ページに統合、例：S-01）
/nutrients           — 栄養素一覧（逆引き）
/nutrients/:id       — 栄養素詳細（例：N-01）
/login               — v1.0のみ
```

メインフロー：トップ → /symptoms → /symptoms/:id → /nutrients/:id（2クリック）

## フォルダ構成の方針

- `src/app/` にページを配置（App Router）
- `src/components/` に再利用コンポーネントを配置
- `src/lib/` にSupabaseクライアントなどのユーティリティを配置
- `src/types/` に型定義を配置

## データモデル

```typescript
type Nutrient = {
  id: string           // 例: "N-01"
  name: string         // 例: "マグネシウム"
  category: string     // 例: "ミネラル"
  description: string  // 働き
  foods: string[]      // 豊富な食材リスト
  daily_intake: string // 例: "女性 270mg/日"
}

type Symptom = {
  id: string           // 例: "S-01"
  name: string         // 例: "むくみ"
  description: string  // 不調の説明
}
```

**不調ID一覧**：S-01 むくみ、S-02 頭痛・片頭痛、S-03 イライラ・気分の波、S-04 疲労感・だるさ、S-05 肌荒れ・ニキビ、S-06 便秘・お腹の張り、S-07 眠れない・睡眠の乱れ

**栄養素ID一覧**：N-01 マグネシウム、N-02 カリウム、N-03 鉄、N-04 亜鉛、N-05〜N-11 ビタミン各種、N-12 タンパク質、N-13 食物繊維、N-14 オメガ3脂肪酸

不調↔栄養素の対応関係と医学的根拠の詳細は `requirements.md` を参照。

## Supabaseテーブル構成

- `symptoms`：id, name, description, sort_order
- `nutrients`：id, name, category, description, foods (text[]), daily_intake, sort_order
- `symptom_nutrients`：symptom_id, nutrient_id, reason（中間テーブル）

## デザインルール

- **ブランドカラー**：ソフトピンク (#F2A7B5) × オフホワイト (#FAF8F5) × テラコッタ (#C4714F) × セージグリーン (#7A9B76)
- **モバイルファースト**：参加者がLINEからスマートフォンで開くことを前提
- **スタイル**：カード型レイアウト、角丸、余白多め
- **参考UI**：LunaLuna（カード・配色）、miyakawa-lab.com（余白・シンプルさ）
- **パフォーマンス**：スマホ回線でもページ読み込み3秒以内
