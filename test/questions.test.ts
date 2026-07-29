import { describe, expect, it } from "vitest";

import { questions, questionTopics } from "../src/questions";

describe("original question bank", () => {
  it("covers three domains and nine topics evenly", () => {
    expect(questions).toHaveLength(45);
    expect(questionTopics).toHaveLength(9);

    for (const domain of ["strategy", "management", "technology"]) {
      expect(questions.filter((question) => question.domain === domain)).toHaveLength(15);
    }
    for (const { topic } of questionTopics) {
      expect(questions.filter((question) => question.topic === topic)).toHaveLength(5);
    }
  });

  it("has unique ids, four choices, one valid answer, and useful explanations", () => {
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(question.prompt.length).toBeGreaterThan(8);
      expect(question.choices).toHaveLength(4);
      expect(question.answer).toBeGreaterThanOrEqual(0);
      expect(question.answer).toBeLessThan(4);
      expect(question.explanation.length).toBeGreaterThan(25);
      expect(question.choices[question.answer]?.length).toBeGreaterThan(0);
    }
  });
});
