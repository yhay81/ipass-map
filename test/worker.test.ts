import { describe, expect, it, vi } from "vitest";

import { app, type Bindings } from "../src/worker";

const sessionId = "7c0dbe70-8c47-4fc0-aa62-52427133c612";
const sameOrigin = { "content-type": "application/json", "sec-fetch-site": "same-origin" };

type Call = {
  arguments: unknown[];
  sql: string;
};

const makeBindings = (eventCount = 0) => {
  const calls: Call[] = [];
  const prepare = vi.fn((sql: string) => {
    const call: Call = { arguments: [], sql };
    calls.push(call);
    const statement = {
      bind: vi.fn((...arguments_: unknown[]) => {
        call.arguments = arguments_;
        return statement;
      }),
      first: vi.fn(async () =>
        sql.includes("FROM product_events") ? { count: eventCount } : null,
      ),
      run: vi.fn(async () => ({ success: true })),
    };
    return statement;
  });
  return {
    bindings: {
      ASSETS: { fetch: () => Promise.resolve(new Response("not used")) },
      DB: { prepare },
    } as unknown as Bindings,
    calls,
  };
};

describe("ITパスポート弱点マップ worker", () => {
  it("renders the actual diagnostic workspace with modest typography and no experiment copy", async () => {
    const response = await app.request("/", undefined, makeBindings().bindings);
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-security-policy")).toContain("default-src 'self'");
    expect(html).toContain('lang="ja"');
    expect(html).toContain('class="study-desk"');
    expect(html).toContain("12問で弱点を地図にする");
    expect(html).toContain("苦手10問");
    expect(html).toContain("令和8年度 公開問題");
    expect(html).not.toContain('class="hero"');
    expect(html).not.toContain("Success signal");
    expect(html).not.toContain("実験");
  });

  it("serves all original questions and a versioned syllabus label", async () => {
    const response = await app.request("/api/questions", undefined, makeBindings().bindings);
    const payload = await response.json<{
      questions: Array<{ answer: number; choices: string[]; id: string }>;
      syllabus: string;
    }>();
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toContain("max-age=3600");
    expect(payload.syllabus).toBe("6.5");
    expect(payload.questions).toHaveLength(45);
    expect(payload.questions[0]?.choices).toHaveLength(4);
  });

  it("accepts named aggregate events and hashes the anonymous session", async () => {
    const { bindings, calls } = makeBindings();
    const response = await app.request(
      "/api/events",
      {
        body: JSON.stringify({
          automated: false,
          name: "diagnosis_completed",
          questionCount: 12,
          score: 8,
          sessionId,
        }),
        headers: sameOrigin,
        method: "POST",
      },
      bindings,
    );
    expect(response.status).toBe(204);
    const insert = calls.find((call) => call.sql.includes("INSERT INTO product_events"));
    expect(insert?.arguments).toContain("diagnosis_completed");
    expect(insert?.arguments).toContain(12);
    expect(insert?.arguments).toContain(8);
    expect(insert?.arguments).not.toContain(sessionId);
    expect(String(insert?.arguments[0])).toMatch(/^[0-9a-f]{64}$/);
  });

  it("rejects cross-site, unknown, oversized, and rate-limited events", async () => {
    const crossSite = await app.request(
      "/api/events",
      {
        body: JSON.stringify({ name: "visited", sessionId }),
        headers: { "content-type": "application/json", "sec-fetch-site": "cross-site" },
        method: "POST",
      },
      makeBindings().bindings,
    );
    expect(crossSite.status).toBe(403);

    const invalid = await app.request(
      "/api/events",
      {
        body: JSON.stringify({ name: "question_s-biz-01", sessionId }),
        headers: sameOrigin,
        method: "POST",
      },
      makeBindings().bindings,
    );
    expect(invalid.status).toBe(400);

    const oversized = await app.request(
      "/api/events",
      {
        body: JSON.stringify({ name: "visited", padding: "x".repeat(1600), sessionId }),
        headers: { ...sameOrigin, "content-length": "1700" },
        method: "POST",
      },
      makeBindings().bindings,
    );
    expect(oversized.status).toBe(413);

    const limited = await app.request(
      "/api/events",
      {
        body: JSON.stringify({ name: "visited", sessionId }),
        headers: sameOrigin,
        method: "POST",
      },
      makeBindings(200).bindings,
    );
    expect(limited.status).toBe(429);
  });

  it("documents local learning history, retention, cookies, and IPA independence", async () => {
    const response = await app.request("/privacy", undefined, makeBindings().bindings);
    const html = await response.text();
    expect(response.status).toBe(200);
    expect(html).toContain("localStorage");
    expect(html).toContain("Cookieは使いません");
    expect(html).toContain("35日以内");
    expect(html).toContain("公式・認定・提携サービスではありません");
  });

  it("serves HTML for missing pages, JSON for missing APIs, and a safe health response", async () => {
    const bindings = makeBindings().bindings;
    const page = await app.request("/missing", undefined, bindings);
    const api = await app.request("/api/missing", undefined, bindings);
    const health = await app.request("/healthz", undefined, bindings);
    expect(page.status).toBe(404);
    expect(await page.text()).toContain("ページが見つかりません");
    expect(api.status).toBe(404);
    expect(await api.json()).toEqual(expect.objectContaining({ error: "not_found" }));
    expect(await health.json()).toEqual(
      expect.objectContaining({
        healthy: true,
        questionCount: 45,
        service: "ipass-map",
        syllabus: "6.5",
      }),
    );
  });
});
