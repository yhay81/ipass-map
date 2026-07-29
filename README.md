# ITパスポート弱点マップ

シラバス Ver.6.5 を基にした独自問題を12問解き、ストラテジ・マネジメント・テクノロジの苦手を9テーマの地図で確認するWebアプリです。

本番: <https://ipass-map.yhay81.com>

## Product boundary

- 45問はIPA公開問題の転載ではなく独自作成です。
- 問題ごとの正誤とテーマ別正答率は端末内に保存します。
- D1には匿名の開始・完了などの集計イベントだけを35日間保存します。
- アカウント、Cookie、広告トラッカー、生成AI APIは使いません。
- IPAによる公式・認定・提携サービスではありません。

## Local development

Node.js 24はfnmで管理し、Vite+によるランタイム管理は無効にします。

```powershell
vp env off
npm ci
npx wrangler d1 migrations apply ipass-map --local
npm run dev
```

## Quality and deployment

```powershell
npm run release:check
npm run check
npm test
npm run build
npm audit
npx wrangler d1 migrations apply ipass-map --remote
npm run deploy
npm run indexnow
```

公開前後にモバイル・キーボード操作、問題の採点と解説、結果地図、苦手10問、公式問題への遷移、匿名計測の自動QA除外を実URLで確認します。
