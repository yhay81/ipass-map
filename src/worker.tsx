import { Hono } from "hono";
import { requestId } from "hono/request-id";

import { securityHeaders } from "./middleware/security";
import { questions } from "./questions";
import { HomePage, NotFoundPage, PrivacyPage } from "./ui/pages";

export type Bindings = {
  ASSETS: Fetcher;
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
const sessionIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const eventNames = new Set([
  "visited",
  "returned",
  "diagnosis_started",
  "answer_submitted",
  "diagnosis_completed",
  "drill_started",
  "result_copied",
  "official_opened",
]);
const daySeconds = 86_400;

app.use("*", requestId());
app.use("*", securityHeaders);

const nowSeconds = () => Math.floor(Date.now() / 1000);

const normalize = (value: unknown, maximum: number) =>
  typeof value === "string" ? value.normalize("NFKC").trim().slice(0, maximum) : "";

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const isSameOriginMutation = (request: Request) => {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite === "same-origin";
  const origin = request.headers.get("origin");
  return origin === new URL(request.url).origin;
};

const isJsonRequest = (request: Request) =>
  request.headers.get("content-type")?.toLowerCase().startsWith("application/json") ?? false;

const recordEvent = async (
  db: D1Database,
  sessionId: string,
  name: string,
  questionCount: number,
  score: number,
  automated: boolean,
) => {
  const sessionHash = await sha256(sessionId);
  const timestamp = nowSeconds();
  const daily = await db
    .prepare(
      "SELECT COUNT(*) AS count FROM product_events WHERE session_hash = ? AND created_at >= ?",
    )
    .bind(sessionHash, timestamp - daySeconds)
    .first<{ count: number }>();
  if ((daily?.count ?? 0) >= 200) return false;

  await db
    .prepare(
      `INSERT INTO product_events
       (session_hash, name, question_count, score, is_automated, occurred_on, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      sessionHash,
      name,
      questionCount,
      score,
      automated ? 1 : 0,
      new Date().toISOString().slice(0, 10),
      timestamp,
    )
    .run();
  return true;
};

app.get("/", (c) => c.html(<HomePage />));
app.get("/privacy", (c) => c.html(<PrivacyPage />));
app.get("/api/questions", (c) => {
  c.header("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");
  return c.json({
    syllabus: "6.5",
    questions,
  });
});

app.post("/api/events", async (c) => {
  if (!isSameOriginMutation(c.req.raw)) return c.json({ error: "forbidden" }, 403);
  if (!isJsonRequest(c.req.raw)) return c.json({ error: "unsupported_media_type" }, 415);
  if (Number(c.req.header("content-length") ?? 0) > 1_500) {
    return c.json({ error: "payload_too_large" }, 413);
  }

  const body = await c.req.json<{
    automated?: boolean;
    name?: string;
    questionCount?: number;
    score?: number;
    sessionId?: string;
  }>();
  const sessionId = normalize(body.sessionId, 36);
  const name = normalize(body.name, 40);
  const questionCount = Number(body.questionCount ?? 0);
  const score = Number(body.score ?? 0);

  if (
    !sessionIdPattern.test(sessionId) ||
    !eventNames.has(name) ||
    !Number.isInteger(questionCount) ||
    questionCount < 0 ||
    questionCount > 20 ||
    !Number.isInteger(score) ||
    score < 0 ||
    score > questionCount
  ) {
    return c.json({ error: "invalid_event" }, 400);
  }

  const accepted = await recordEvent(
    c.env.DB,
    sessionId,
    name,
    questionCount,
    score,
    body.automated === true,
  );
  return accepted ? c.body(null, 204) : c.json({ error: "rate_limited" }, 429);
});

app.get("/healthz", (c) =>
  c.json({
    healthy: true,
    questionCount: questions.length,
    service: "ipass-map",
    syllabus: "6.5",
    time: new Date().toISOString(),
  }),
);

app.notFound((c) =>
  c.req.path.startsWith("/api/")
    ? c.json({ error: "not_found", requestId: c.get("requestId") }, 404)
    : c.html(<NotFoundPage />, 404),
);

app.onError((error, c) => {
  console.error(
    JSON.stringify({
      event: "request_failed",
      message: error.message,
      requestId: c.get("requestId"),
    }),
  );
  return c.json({ error: "internal_error", requestId: c.get("requestId") }, 500);
});

const scheduled: ExportedHandlerScheduledHandler<Bindings> = async (_controller, env) => {
  await env.DB.prepare("DELETE FROM product_events WHERE created_at < ?")
    .bind(nowSeconds() - 35 * daySeconds)
    .run();
};

export { app };
export default { fetch: app.fetch, scheduled };
