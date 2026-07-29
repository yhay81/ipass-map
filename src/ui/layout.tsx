import type { Child } from "hono/jsx";

import { product } from "../config/product";

type LayoutProps = {
  children: Child;
  description?: string;
  title?: string;
};

export function Layout({
  children,
  description = product.description,
  title = product.name,
}: LayoutProps) {
  return (
    <html itemscope itemtype="https://schema.org/EducationalApplication" lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta content={description} name="description" />
        <meta content={product.name} itemProp="name" />
        <meta content={description} itemProp="description" />
        <meta content={product.url} itemProp="url" />
        <meta content={product.applicationCategory} itemProp="applicationCategory" />
        <meta content="Web" itemProp="operatingSystem" />
        <meta content="true" itemProp="isAccessibleForFree" />
        <meta content={description} property="og:description" />
        <meta content={`${product.url}/og.png`} property="og:image" />
        <meta content="1200" property="og:image:width" />
        <meta content="630" property="og:image:height" />
        <meta content="ja_JP" property="og:locale" />
        <meta content={title} property="og:title" />
        <meta content="website" property="og:type" />
        <meta content={product.url} property="og:url" />
        <meta content="summary_large_image" name="twitter:card" />
        <link href={product.url} rel="canonical" />
        <link href="/styles.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body>
        <a class="skip-link" href="#main">
          本文へ移動
        </a>
        <header class="site-header">
          <a class="brand" href="/">
            <span class="brand-grid" aria-hidden="true">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </span>
            {product.name}
          </a>
          <nav aria-label="メイン">
            <a href="#map">弱点マップ</a>
            <a href="/privacy">プライバシー</a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer>
          <span>{product.name}</span>
          <nav aria-label="フッター">
            <a href="/privacy">プライバシー</a>
            <a
              data-official-link
              href="https://www.ipa.go.jp/shiken/syllabus/gaiyou.html"
              rel="external"
            >
              IPAシラバス
            </a>
            <a href="/healthz">稼働状態</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
