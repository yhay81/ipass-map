# Security Policy

脆弱性を公開Issueへ投稿せず、GitHubのPrivate vulnerability reportingから連絡してください。

## Baseline

- 秘密値、個別解答、苦手テーマをGitまたはD1へ保存しない。
- CSP、HSTS、同一オリジン検査、JSON body上限、イベント名・数値範囲の検証を有効にする。
- 匿名IDはSHA-256でハッシュし、1匿名ID当たり1日200イベントを上限とする。
- 動的表示は`textContent`とDOM APIを使い、ユーザー生成HTMLを描画しない。
- イベントは35日以内に削除し、自動QAを実利用集計から除外する。
