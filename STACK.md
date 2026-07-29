# Stack policy

- Runtime: Cloudflare Workers
- HTTP/UI: Hono、Hono JSX、Web標準JavaScript
- Tooling: Vite+、TypeScript、Oxlint/Oxfmt、Vitest、Wrangler
- Storage: D1は匿名集計イベントだけ。学習履歴は「この端末だけ」と明示してlocalStorageへ保存
- Authentication: 所有権・同期・課金がないためBetter Authは使わない
- Origin: `https://ipass-map.yhay81.com`。`workers.dev`は無効
- Content: シラバス Ver.6.5 を参照した独自問題。外部AI/APIは使わない

## Release gate

1. check、test、build、依存監査を通す。
2. 45問、3領域、9テーマ、正答インデックス、解説を検査する。
3. 診断、採点、結果地図、苦手10問、履歴削除をモバイルとキーボードで確認する。
4. 自動QA除外、35日削除、CSP、同一オリジン、body上限を確認する。
5. canonical、OG、robots、sitemap、IndexNow、本番ヘルスチェックを確認する。
