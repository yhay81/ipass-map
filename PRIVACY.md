# Privacy

## Device-local learning data

- 問題ごとの正誤回数と最終訪問日をlocalStorageへ保存する。
- サーバー同期、アカウント、Cookieは使わない。
- 画面の「履歴を消す」またはサイトデータ削除で消去できる。

## Server-side aggregate events

- ページ表示、再訪、診断開始、回答操作、診断完了、苦手ドリル開始、結果コピー、公式問題遷移を記録する。
- ブラウザ生成UUIDはSHA-256でハッシュし、元のUUIDをD1へ保存しない。
- 問題ID、回答、苦手テーマは保存しない。診断完了時の問題数と合計正答数だけを保存する。
- 匿名イベントは35日以内に削除する。
- `?qa=1`とWebDriver制御は自動アクセスとして分離する。

Operator: yhay81。Security contact: GitHub Private vulnerability reporting。
