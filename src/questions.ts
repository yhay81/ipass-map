export type QuestionDomain = "strategy" | "management" | "technology";

export type Question = {
  answer: number;
  choices: [string, string, string, string];
  domain: QuestionDomain;
  explanation: string;
  id: string;
  prompt: string;
  topic: string;
};

export const questions: Question[] = [
  {
    id: "s-biz-01",
    domain: "strategy",
    topic: "経営戦略",
    prompt:
      "新規事業のSWOT分析で「法改正によって市場全体の需要が増える見込み」を分類する場所はどれか。",
    choices: ["強み", "弱み", "機会", "脅威"],
    answer: 2,
    explanation:
      "法改正は企業の外部環境であり、需要増加につながる好ましい要因なので「機会」に分類します。",
  },
  {
    id: "s-biz-02",
    domain: "strategy",
    topic: "経営戦略",
    prompt:
      "「3年後に国内シェア20%」を最終目標にするとき、途中経過を測るKPIとして最も適切なものはどれか。",
    choices: ["月間の新規契約数", "会社の設立年月日", "社長の在任年数", "競合企業の所在地"],
    answer: 0,
    explanation:
      "KPIは最終目標であるKGIへ近づいているかを継続的に測る中間指標です。新規契約数はシェア拡大の進捗を測れます。",
  },
  {
    id: "s-biz-03",
    domain: "strategy",
    topic: "経営戦略",
    prompt:
      "顧客の購入履歴や問い合わせ履歴を一元管理し、継続的な関係づくりに活用する考え方はどれか。",
    choices: ["CRM", "CAD", "DNS", "WBS"],
    answer: 0,
    explanation:
      "CRMはCustomer Relationship Managementの略で、顧客情報を活用して関係を維持・向上する考え方です。",
  },
  {
    id: "s-biz-04",
    domain: "strategy",
    topic: "経営戦略",
    prompt:
      "既存の業務手順を前提にせず、顧客価値を起点に業務プロセスを抜本的に設計し直す取組はどれか。",
    choices: ["BPR", "BYOD", "RPA", "BCP"],
    answer: 0,
    explanation:
      "BPRはBusiness Process Re-engineeringの略で、業務プロセスを根本から再設計する取組です。",
  },
  {
    id: "s-biz-05",
    domain: "strategy",
    topic: "経営戦略",
    prompt:
      "顧客を年齢・居住地・購買行動などの共通点で分け、それぞれに合う施策を考える活動はどれか。",
    choices: ["市場細分化", "垂直統合", "標準化", "ベンチマーキング"],
    answer: 0,
    explanation:
      "市場細分化（セグメンテーション）は、共通する特徴で市場をグループに分け、対象を明確にする活動です。",
  },
  {
    id: "s-num-01",
    domain: "strategy",
    topic: "会計・分析",
    prompt:
      "固定費が30万円、商品1個当たりの販売価格が5,000円、変動費が2,000円のとき、損益分岐点販売数量は何個か。",
    choices: ["60個", "100個", "150個", "300個"],
    answer: 1,
    explanation:
      "1個当たりの限界利益は5,000−2,000＝3,000円です。30万円÷3,000円＝100個で固定費を回収します。",
  },
  {
    id: "s-num-02",
    domain: "strategy",
    topic: "会計・分析",
    prompt: "200万円の投資によって年間50万円の利益を得た。単純なROIは何%か。",
    choices: ["4%", "20%", "25%", "40%"],
    answer: 2,
    explanation: "ROIは利益÷投資額×100で求めます。50万円÷200万円×100＝25%です。",
  },
  {
    id: "s-num-03",
    domain: "strategy",
    topic: "会計・分析",
    prompt: "売上高1,000万円、売上原価600万円のとき、売上総利益はいくらか。",
    choices: ["400万円", "600万円", "1,000万円", "1,600万円"],
    answer: 0,
    explanation: "売上総利益は売上高−売上原価です。1,000万円−600万円＝400万円になります。",
  },
  {
    id: "s-num-04",
    domain: "strategy",
    topic: "会計・分析",
    prompt:
      "多数の商品を売上高の大きい順にA・B・Cへ分け、重点管理する商品を決める分析手法はどれか。",
    choices: ["ABC分析", "PERT", "回帰分析", "デルファイ法"],
    answer: 0,
    explanation:
      "ABC分析は、売上高などの重要度で対象をランク分けし、Aランクを重点的に管理する手法です。",
  },
  {
    id: "s-num-05",
    domain: "strategy",
    topic: "会計・分析",
    prompt:
      "製品Aの売上が120万円、製品Bが80万円、製品Cが50万円のとき、全売上に占める製品Aの割合はどれか。",
    choices: ["40%", "48%", "60%", "75%"],
    answer: 1,
    explanation: "全売上は120＋80＋50＝250万円です。120÷250×100＝48%になります。",
  },
  {
    id: "s-law-01",
    domain: "strategy",
    topic: "法務・データ",
    prompt:
      "新商品の名称と図形を組み合わせたマークを、他社に無断で使われないよう保護する権利はどれか。",
    choices: ["特許権", "商標権", "著作権", "実用新案権"],
    answer: 1,
    explanation: "商品名やサービス名、ロゴなど、商品・サービスを識別する標識は商標権で保護します。",
  },
  {
    id: "s-law-02",
    domain: "strategy",
    topic: "法務・データ",
    prompt: "著作権による保護の対象として最も適切なものはどれか。",
    choices: ["料理の抽象的なアイデア", "公開済みの法律", "創作性のある写真", "単なる数値データ"],
    answer: 2,
    explanation:
      "著作権は創作的な表現を保護します。アイデアや単なる事実・数値そのものではなく、創作性のある写真が対象です。",
  },
  {
    id: "s-law-03",
    domain: "strategy",
    topic: "法務・データ",
    prompt:
      "個人データを新しい広告用途に利用するとき、本人が拒否を選べる仕組みを示す用語はどれか。",
    choices: ["オプトアウト", "フェールセーフ", "ロールバック", "ベストエフォート"],
    answer: 0,
    explanation:
      "オプトアウトは、本人が利用や配信を拒否する意思を示せる仕組みです。適用には法令上の要件確認が必要です。",
  },
  {
    id: "s-law-04",
    domain: "strategy",
    topic: "法務・データ",
    prompt: "外部の生成AIへ入力する情報として、社内ルール上まず避けるべきものはどれか。",
    choices: ["公開済みの製品名", "一般的な時候の挨拶", "未公開の顧客名簿", "自社サイトのURL"],
    answer: 2,
    explanation:
      "未公開の顧客名簿は機密性と個人情報の問題があります。生成AIの利用規約と社内ルールを確認し、安易に入力しません。",
  },
  {
    id: "s-law-05",
    domain: "strategy",
    topic: "法務・データ",
    prompt:
      "統計資料で個人を直接識別できる氏名を削除しても、他の情報との組合せで個人を特定できる場合の対応として適切なものはどれか。",
    choices: ["必ず公開する", "再識別リスクも評価する", "氏名だけ別表にする", "暗号化せず保管する"],
    answer: 1,
    explanation:
      "氏名を消すだけでは十分でない場合があります。他の属性との組合せによる再識別リスクも評価します。",
  },
  {
    id: "m-proj-01",
    domain: "management",
    topic: "プロジェクト",
    prompt: "プロジェクトの作業を、管理できる大きさまで階層的に分解したものはどれか。",
    choices: ["WBS", "SLA", "RFI", "KPI"],
    answer: 0,
    explanation:
      "WBSはWork Breakdown Structureの略で、成果物や作業を管理可能な単位へ階層的に分解します。",
  },
  {
    id: "m-proj-02",
    domain: "management",
    topic: "プロジェクト",
    prompt: "複数の作業経路のうち、遅れるとプロジェクト全体の完了日が遅れる最長経路を何というか。",
    choices: ["クリティカルパス", "エスカレーション", "ベースライン", "マイルストーン"],
    answer: 0,
    explanation:
      "クリティカルパス上の作業には原則として余裕時間がなく、その遅れが全体の完了日に直結します。",
  },
  {
    id: "m-proj-03",
    domain: "management",
    topic: "プロジェクト",
    prompt:
      "開発途中で追加要望が出た。納期・費用・品質への影響を確認して承認を得てから取り込む管理はどれか。",
    choices: ["変更管理", "構成監査", "需要予測", "販売管理"],
    answer: 0,
    explanation:
      "変更管理では、変更要求の影響を評価し、承認・却下・優先順位を明確にしてから計画へ反映します。",
  },
  {
    id: "m-proj-04",
    domain: "management",
    topic: "プロジェクト",
    prompt: "アジャイル開発で、実現したい機能や改善を優先順位付きで並べた一覧はどれか。",
    choices: ["プロダクトバックログ", "障害台帳", "監査証跡", "データ辞書"],
    answer: 0,
    explanation:
      "プロダクトバックログは、プロダクトに必要な機能・改善・修正を優先順位付きで管理する一覧です。",
  },
  {
    id: "m-proj-05",
    domain: "management",
    topic: "プロジェクト",
    prompt:
      "計画価値100万円、出来高80万円、実コスト120万円の時点での状況として適切なものはどれか。",
    choices: [
      "計画より進み、予算内",
      "計画より遅れ、予算超過",
      "計画どおり、予算内",
      "進捗も費用も判断不能",
    ],
    answer: 1,
    explanation:
      "出来高80万円は計画価値100万円より小さいので遅れ、実コスト120万円は出来高80万円より大きいので予算超過です。",
  },
  {
    id: "m-svc-01",
    domain: "management",
    topic: "サービス管理",
    prompt: "サービス提供者と利用者の間で、稼働率や応答時間などの目標値を合意した文書はどれか。",
    choices: ["SLA", "NDA", "WBS", "RFP"],
    answer: 0,
    explanation:
      "SLAはService Level Agreementの略で、提供するサービスの品質水準を当事者間で合意します。",
  },
  {
    id: "m-svc-02",
    domain: "management",
    topic: "サービス管理",
    prompt: "システム停止から利用再開までに許容される最長時間を表す指標はどれか。",
    choices: ["RTO", "RPO", "MTBF", "ROI"],
    answer: 0,
    explanation:
      "RTOは目標復旧時間です。RPOは、復旧時にどの時点までデータを戻せればよいかを示す目標復旧時点です。",
  },
  {
    id: "m-svc-03",
    domain: "management",
    topic: "サービス管理",
    prompt:
      "障害の影響を早く抑えてサービスを復旧する活動と、根本原因を特定して再発を防ぐ活動の組合せはどれか。",
    choices: [
      "インシデント管理と問題管理",
      "販売管理と在庫管理",
      "変更管理と契約管理",
      "監査と会計",
    ],
    answer: 0,
    explanation:
      "インシデント管理は迅速なサービス復旧、問題管理は根本原因の特定と再発防止を主目的とします。",
  },
  {
    id: "m-svc-04",
    domain: "management",
    topic: "サービス管理",
    prompt: "利用者からの問い合わせや障害連絡を一元的に受け付ける窓口はどれか。",
    choices: ["サービスデスク", "データセンター", "株主総会", "認証局"],
    answer: 0,
    explanation:
      "サービスデスクは利用者との単一窓口となり、問い合わせ、依頼、インシデントを受け付けます。",
  },
  {
    id: "m-svc-05",
    domain: "management",
    topic: "サービス管理",
    prompt: "平均故障間隔が長く、平均修復時間が短いシステムの特徴として最も適切なものはどれか。",
    choices: ["可用性が高くなりやすい", "必ず処理速度が低い", "機密性が失われる", "保守できない"],
    answer: 0,
    explanation:
      "故障までの時間が長く、修復が短ければ、稼働している時間の割合である可用性は高くなりやすくなります。",
  },
  {
    id: "m-ops-01",
    domain: "management",
    topic: "運用・統制",
    prompt: "火災による設備損失に備えて保険へ加入するリスク対応はどれか。",
    choices: ["回避", "移転", "低減", "受容"],
    answer: 1,
    explanation: "保険によって損失の経済的負担を保険会社へ移すため、リスク移転に当たります。",
  },
  {
    id: "m-ops-02",
    domain: "management",
    topic: "運用・統制",
    prompt: "情報システム監査人に最も求められる立場はどれか。",
    choices: [
      "監査対象から独立した立場",
      "開発責任者と同じ立場",
      "販売部門だけの立場",
      "取引先を代弁する立場",
    ],
    answer: 0,
    explanation: "客観的な評価を行うため、監査人には監査対象からの独立性が求められます。",
  },
  {
    id: "m-ops-03",
    domain: "management",
    topic: "運用・統制",
    prompt:
      "毎週日曜にフルバックアップ、月〜土曜に前回のバックアップ以降の変更分だけを保存する方式はどれか。",
    choices: ["増分バックアップ", "差分バックアップ", "ミラーリング", "ストライピング"],
    answer: 0,
    explanation:
      "増分バックアップは、直前のフルまたは増分バックアップ以降に変更された分だけを保存します。",
  },
  {
    id: "m-ops-04",
    domain: "management",
    topic: "運用・統制",
    prompt: "プログラムの変更履歴を残し、複数人の変更を統合できる仕組みはどれか。",
    choices: ["バージョン管理", "負荷分散", "暗号化", "名前解決"],
    answer: 0,
    explanation:
      "バージョン管理は、ファイルの変更履歴、差分、作業ブランチなどを管理し、共同作業を支援します。",
  },
  {
    id: "m-ops-05",
    domain: "management",
    topic: "運用・統制",
    prompt: "業務を継続的に改善するPDCAで、実施結果を目標と照らして確認する段階はどれか。",
    choices: ["Plan", "Do", "Check", "Act"],
    answer: 2,
    explanation: "Checkでは、実施結果を測定・評価し、計画した目標との差を確認します。",
  },
  {
    id: "t-comp-01",
    domain: "technology",
    topic: "コンピュータ",
    prompt: "1バイトは通常何ビットか。",
    choices: ["2ビット", "4ビット", "8ビット", "16ビット"],
    answer: 2,
    explanation: "1バイトは通常8ビットです。ビットは0または1を表す情報の最小単位です。",
  },
  {
    id: "t-comp-02",
    domain: "technology",
    topic: "コンピュータ",
    prompt: "2進数の10110を10進数で表したものはどれか。",
    choices: ["18", "20", "22", "24"],
    answer: 2,
    explanation: "10110₂は16＋4＋2＝22です。各桁は右から1、2、4、8、16の重みを持ちます。",
  },
  {
    id: "t-comp-03",
    domain: "technology",
    topic: "コンピュータ",
    prompt: "仮想化によって、1台の物理サーバー上で複数の独立したOSを動作させる主な利点はどれか。",
    choices: [
      "資源を柔軟に分配できる",
      "電源が不要になる",
      "障害が絶対に起きない",
      "通信が不要になる",
    ],
    answer: 0,
    explanation:
      "仮想化ではCPUやメモリなどの物理資源を複数の仮想マシンへ柔軟に配分し、利用効率を高められます。",
  },
  {
    id: "t-comp-04",
    domain: "technology",
    topic: "コンピュータ",
    prompt:
      "利用者がWebブラウザからメールや文書作成機能を使い、サーバーやOSを管理しないクラウド形態はどれか。",
    choices: ["SaaS", "PaaS", "IaaS", "オンプレミス"],
    answer: 0,
    explanation:
      "SaaSは完成したソフトウェア機能をサービスとして利用する形態で、利用者は基盤やOSを管理しません。",
  },
  {
    id: "t-comp-05",
    domain: "technology",
    topic: "コンピュータ",
    prompt:
      "変数sumを0で初期化し、iを1から4まで1ずつ増やしながらsumにiを加える。最後のsumはいくつか。",
    choices: ["4", "6", "10", "16"],
    answer: 2,
    explanation: "1＋2＋3＋4＝10です。繰返し処理の各回でsumへ現在のiを加えます。",
  },
  {
    id: "t-data-01",
    domain: "technology",
    topic: "データ・通信",
    prompt: "関係データベースの表で、各行を重複なく識別する列または列の組合せはどれか。",
    choices: ["主キー", "外部キー", "ビュー", "インデックス"],
    answer: 0,
    explanation: "主キーは表の各行を一意に識別します。重複値やNULLを許さない設計が基本です。",
  },
  {
    id: "t-data-02",
    domain: "technology",
    topic: "データ・通信",
    prompt: "商品表から価格が1,000円以上の行だけを取得するとき、SQLの検索条件に使う句はどれか。",
    choices: ["WHERE", "ORDER BY", "INSERT", "DROP"],
    answer: 0,
    explanation: "WHERE句は取得・更新・削除する行の条件を指定します。ORDER BYは並び順の指定です。",
  },
  {
    id: "t-data-03",
    domain: "technology",
    topic: "データ・通信",
    prompt: "銀行振込で、出金だけ成功し入金が失敗する状態を防ぐトランザクションの性質はどれか。",
    choices: ["原子性", "可読性", "移植性", "冗長性"],
    answer: 0,
    explanation:
      "原子性は一連の処理をすべて成功またはすべて取り消しにし、中途半端な状態を防ぐ性質です。",
  },
  {
    id: "t-data-04",
    domain: "technology",
    topic: "データ・通信",
    prompt: "ドメイン名から対応するIPアドレスを調べる仕組みはどれか。",
    choices: ["DNS", "DHCP", "FTP", "NTP"],
    answer: 0,
    explanation: "DNSはドメイン名とIPアドレスなどの対応を管理し、名前解決を行います。",
  },
  {
    id: "t-data-05",
    domain: "technology",
    topic: "データ・通信",
    prompt: "端末へIPアドレスやデフォルトゲートウェイを自動配布するプロトコルはどれか。",
    choices: ["DHCP", "DNS", "HTTP", "SMTP"],
    answer: 0,
    explanation: "DHCPはネットワークへ接続した端末に、IPアドレスなどの設定を自動的に割り当てます。",
  },
  {
    id: "t-sec-01",
    domain: "technology",
    topic: "セキュリティ・AI",
    prompt: "Webサイトとの通信内容を暗号化し、接続先の正当性確認にも使われる仕組みはどれか。",
    choices: ["TLS", "CSV", "OCR", "BIOS"],
    answer: 0,
    explanation:
      "HTTPSではTLSを使って通信を暗号化し、電子証明書によって接続先の正当性を確認します。",
  },
  {
    id: "t-sec-02",
    domain: "technology",
    topic: "セキュリティ・AI",
    prompt:
      "入力データから一定長の値を求め、改ざん検知やパスワード照合に使う一方向の処理はどれか。",
    choices: ["ハッシュ", "圧縮", "標本化", "仮想化"],
    answer: 0,
    explanation:
      "ハッシュ関数は入力から固定長の値を生成します。元の入力を容易に復元できない一方向性が重要です。",
  },
  {
    id: "t-sec-03",
    domain: "technology",
    topic: "セキュリティ・AI",
    prompt: "パスワードに加えて、スマートフォンへ届く確認コードを使ってログインする方式はどれか。",
    choices: ["多要素認証", "シングルサインオン", "匿名認証", "アクセスログ"],
    answer: 0,
    explanation:
      "知識要素のパスワードと、所持要素のスマートフォンを組み合わせるため、多要素認証です。",
  },
  {
    id: "t-sec-04",
    domain: "technology",
    topic: "セキュリティ・AI",
    prompt: "従業員には担当業務に必要な最小限の権限だけを与える考え方はどれか。",
    choices: ["最小権限の原則", "オープンデータ", "ベストエフォート", "先入先出法"],
    answer: 0,
    explanation:
      "最小権限の原則は、業務に必要な範囲だけ権限を与え、誤操作や侵害時の影響を抑える考え方です。",
  },
  {
    id: "t-sec-05",
    domain: "technology",
    topic: "セキュリティ・AI",
    prompt:
      "正解ラベル付きの過去データから、迷惑メールかどうかを判定するモデルを学習させる方法はどれか。",
    choices: ["教師あり学習", "教師なし学習", "強化学習", "暗号化"],
    answer: 0,
    explanation:
      "入力と正解ラベルの組を使って予測規則を学ぶ方法が教師あり学習です。分類や数値予測に使われます。",
  },
];

export const questionTopics = [
  { domain: "strategy", label: "経営戦略", topic: "経営戦略" },
  { domain: "strategy", label: "会計・分析", topic: "会計・分析" },
  { domain: "strategy", label: "法務・データ", topic: "法務・データ" },
  { domain: "management", label: "プロジェクト", topic: "プロジェクト" },
  { domain: "management", label: "サービス管理", topic: "サービス管理" },
  { domain: "management", label: "運用・統制", topic: "運用・統制" },
  { domain: "technology", label: "コンピュータ", topic: "コンピュータ" },
  { domain: "technology", label: "データ・通信", topic: "データ・通信" },
  { domain: "technology", label: "セキュリティ・AI", topic: "セキュリティ・AI" },
] as const;
