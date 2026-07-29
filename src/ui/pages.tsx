import { questionTopics } from "../questions";
import { Layout } from "./layout";

const domainLabels = {
  strategy: "ストラテジ",
  management: "マネジメント",
  technology: "テクノロジ",
} as const;

export function HomePage() {
  return (
    <Layout>
      <section class="study-shell" id="map">
        <header class="study-heading">
          <div>
            <p>SYLLABUS 6.5 / ORIGINAL QUESTIONS</p>
            <h1>12問で弱点を地図にする</h1>
          </div>
          <div class="domain-key" aria-label="出題領域">
            {Object.entries(domainLabels).map(([domain, label]) => (
              <span class={`domain-key-${domain}`}>
                <i></i>
                {label}
              </span>
            ))}
          </div>
        </header>

        <div class="study-desk">
          <aside class="map-panel" aria-label="弱点マップ">
            <div class="panel-label">
              <div>
                <span>弱点マップ</span>
                <strong data-map-status>未診断</strong>
              </div>
              <button class="quiet-button" data-reset-progress type="button">
                履歴を消す
              </button>
            </div>
            <div class="topic-map" data-topic-map>
              {questionTopics.map(({ domain, label, topic }) => (
                <article class={`topic-tile topic-${domain}`} data-topic={topic}>
                  <span>{domainLabels[domain]}</span>
                  <strong>{label}</strong>
                  <div class="topic-meter" aria-hidden="true">
                    <i></i>
                  </div>
                  <em>--</em>
                </article>
              ))}
            </div>
            <div class="map-legend">
              <span>
                <i class="legend-weak"></i>要復習
              </span>
              <span>
                <i class="legend-growing"></i>伸び途中
              </span>
              <span>
                <i class="legend-strong"></i>定着
              </span>
            </div>
          </aside>

          <section class="question-panel" aria-live="polite">
            <div class="start-sheet" data-start-sheet>
              <div class="answer-grid-preview" aria-hidden="true">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <i class={number % 3 === 0 ? "is-marked" : ""}></i>
                ))}
              </div>
              <div>
                <span class="sheet-number">DIAGNOSIS 01</span>
                <h2>まずは12問</h2>
                <p>3領域を4問ずつ。正答と解説を見ながら、苦手なテーマを色分けします。</p>
              </div>
              <button class="primary-button" data-start-diagnosis type="button">
                診断をはじめる
                <span aria-hidden="true">→</span>
              </button>
              <small>登録不要・約6分・履歴はこの端末だけ</small>
            </div>

            <div class="quiz-sheet" data-quiz-sheet hidden>
              <div class="quiz-toolbar">
                <div>
                  <span data-quiz-kind>弱点診断</span>
                  <strong data-question-position>1 / 12</strong>
                </div>
                <div class="progress-track" aria-label="進捗">
                  <i data-progress-bar></i>
                </div>
                <button class="quiet-button" data-quit-quiz type="button">
                  中断
                </button>
              </div>
              <div class="question-domain" data-question-domain></div>
              <h2 data-question-prompt></h2>
              <div class="choice-list" data-choice-list></div>
              <div class="answer-note" data-answer-note hidden>
                <strong data-answer-result></strong>
                <p data-answer-explanation></p>
              </div>
              <button class="next-button" data-next-question disabled type="button">
                答えを決める
              </button>
            </div>

            <div class="result-sheet" data-result-sheet hidden>
              <div class="result-stamp" data-result-score>
                0 / 12
              </div>
              <div>
                <span class="sheet-number">YOUR MAP</span>
                <h2 data-result-title>地図ができました</h2>
                <p data-result-summary></p>
              </div>
              <ol class="weak-list" data-weak-list></ol>
              <div class="result-actions">
                <button class="primary-button" data-start-drill type="button">
                  苦手10問を解く
                  <span aria-hidden="true">→</span>
                </button>
                <button class="secondary-button" data-copy-result type="button">
                  結果をコピー
                </button>
              </div>
            </div>
          </section>

          <aside class="route-panel">
            <div class="panel-label">
              <div>
                <span>次のルート</span>
                <strong>この端末に保存</strong>
              </div>
            </div>
            <ol class="route-list">
              <li class="is-current" data-route-diagnosis>
                <span>01</span>
                <div>
                  <strong>12問診断</strong>
                  <small>3領域を均等に確認</small>
                </div>
              </li>
              <li data-route-drill>
                <span>02</span>
                <div>
                  <strong>苦手10問</strong>
                  <small>弱いテーマから優先</small>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>公式問題へ</strong>
                  <small>本番形式で仕上げる</small>
                </div>
              </li>
            </ol>
            <div class="official-card">
              <span>公式で仕上げる</span>
              <strong>令和8年度 公開問題</strong>
              <p>弱点が見えたら、IPAの100問とCBT画面で確認。</p>
              <a
                data-official-link
                href="https://www3.jitec.ipa.go.jp/JitesCbt/html/openinfo/questions.html"
                rel="external"
              >
                公開問題を開く <span aria-hidden="true">↗</span>
              </a>
            </div>
          </aside>
        </div>

        <p class="source-note">
          問題と解説はIPA「ITパスポート試験シラバス
          Ver.6.5」を基に独自作成しています。IPAの過去問題の転載ではなく、IPA公式・認定サービスではありません。
        </p>
      </section>
      <script src="/app.js"></script>
    </Layout>
  );
}

export function PrivacyPage() {
  return (
    <Layout title="プライバシー | ITパスポート弱点マップ">
      <article class="prose">
        <p class="eyebrow">PRIVACY</p>
        <h1>解答履歴は、この端末に残します。</h1>
        <section>
          <h2>学習履歴</h2>
          <p>
            問題ごとの正誤とテーマ別正答率はブラウザのlocalStorageに保存します。サーバーには問題ごとの回答や苦手テーマを送信せず、別端末との同期も行いません。「履歴を消す」またはサイトデータの削除で消去できます。
          </p>
        </section>
        <section>
          <h2>利用状況</h2>
          <p>
            ページ表示、診断開始、回答操作、診断完了、苦手問題の開始、公式問題への遷移を、ブラウザで生成したランダムな匿名IDとともに記録します。イベントには問題ID、選択肢、苦手テーマを保存しません。Cookieは使いません。
          </p>
        </section>
        <section>
          <h2>保持期間と自動アクセス</h2>
          <p>
            匿名の利用イベントは35日以内に削除します。短時間に大量のイベントを送る匿名IDは受け付けません。明示的なQAとWebDriver制御のブラウザは自動アクセスとして分離し、実利用の集計から除外します。
          </p>
        </section>
        <section>
          <h2>出典と独立性</h2>
          <p>
            出題範囲の確認にはIPAのITパスポート試験シラバス
            Ver.6.5を使用しています。掲載問題は独自作成であり、このサービスはIPAによる公式・認定・提携サービスではありません。最新の出題範囲と受験情報はIPA公式サイトで確認してください。
          </p>
        </section>
        <section>
          <h2>運営</h2>
          <p>
            運営者はyhay81です。セキュリティ上の連絡はGitHubのPrivate vulnerability
            reportingをご利用ください。
          </p>
        </section>
      </article>
    </Layout>
  );
}

export function NotFoundPage() {
  return (
    <Layout title="ページが見つかりません | ITパスポート弱点マップ">
      <article class="prose not-found">
        <p class="eyebrow">404</p>
        <h1>この学習ルートは見つかりません。</h1>
        <p>
          <a class="text-link" href="/">
            弱点マップへ戻る
          </a>
        </p>
      </article>
    </Layout>
  );
}
