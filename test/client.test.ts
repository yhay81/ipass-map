import { describe, expect, it } from "vitest";

import client from "../public/app.js?raw";
import metrics from "../ops/product-metrics.sql?raw";
import schema from "../db/migrations/0001_initial.sql?raw";

describe("browser client and metrics contract", () => {
  it("uses DOM text nodes without raw HTML injection", () => {
    expect(client).toContain("textContent");
    expect(client).toContain("replaceChildren");
    expect(client).not.toMatch(/\.innerHTML\s*=/);
  });

  it("builds a balanced diagnosis and a weakness-ranked drill", () => {
    expect(client).toContain("chooseDiagnosis");
    expect(client).toContain("slice(0, 4)");
    expect(client).toContain("chooseWeakDrill");
    expect(client).toContain("slice(0, 10)");
    expect(client).toContain("topicStats");
  });

  it("keeps question-level learning data on device and aggregate events on the server", () => {
    expect(client).toContain("localStorage");
    expect(client).toContain("progress.attempts[question.id]");
    expect(schema).toContain("question_count INTEGER NOT NULL");
    expect(schema).not.toContain("question_id");
    expect(schema).not.toContain("topic");
    expect(schema).not.toContain("selected_choice");
  });

  it("excludes explicit and WebDriver QA from product metrics", () => {
    expect(client).toContain('get("qa") === "1"');
    expect(client).toContain("navigator.webdriver === true");
    expect(client).toContain("automated");
    expect(metrics).toContain("WHERE is_automated = 0");
  });
});
