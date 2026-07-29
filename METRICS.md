# Metrics

| Stage           | D1 event / condition                     |
| --------------- | ---------------------------------------- |
| `visited`       | 自動QA以外の匿名セッションがページを表示 |
| `activated`     | `diagnosis_started`                      |
| `job_completed` | 12問を完了し`diagnosis_completed`        |
| `next_step`     | `drill_started`または`official_opened`   |
| `returned`      | 別日に再訪し`returned`                   |

問題ID、選択肢、問題ごとの正誤、苦手テーマはイベントへ保存しません。完了時の問題数と合計正答数だけを保存します。

`npm run metrics`は、自動アクセスを除外した訪問、開始、完了、回答数、苦手ドリル、公式問題遷移、再訪と各率をJSONで出力します。分母0の比率は`null`とし、欠測を成功扱いしません。
