CREATE TABLE IF NOT EXISTS product_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_hash TEXT NOT NULL,
  name TEXT NOT NULL CHECK (
    name IN (
      'visited',
      'returned',
      'diagnosis_started',
      'answer_submitted',
      'diagnosis_completed',
      'drill_started',
      'result_copied',
      'official_opened'
    )
  ),
  question_count INTEGER NOT NULL DEFAULT 0 CHECK (question_count BETWEEN 0 AND 20),
  score INTEGER NOT NULL DEFAULT 0 CHECK (score BETWEEN 0 AND question_count),
  is_automated INTEGER NOT NULL DEFAULT 0 CHECK (is_automated IN (0, 1)),
  occurred_on TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS product_events_session_idx
ON product_events (session_hash, created_at);

CREATE INDEX IF NOT EXISTS product_events_name_idx
ON product_events (name, occurred_on);
