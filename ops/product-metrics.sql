SELECT
  COUNT(DISTINCT CASE WHEN name = 'visited' THEN session_hash END) AS users,
  COUNT(DISTINCT CASE WHEN name = 'diagnosis_started' THEN session_hash END) AS starters,
  COUNT(DISTINCT CASE WHEN name = 'diagnosis_completed' THEN session_hash END) AS completers,
  COUNT(CASE WHEN name = 'answer_submitted' THEN 1 END) AS answers,
  COUNT(DISTINCT CASE WHEN name = 'drill_started' THEN session_hash END) AS drill_users,
  COUNT(DISTINCT CASE WHEN name = 'official_opened' THEN session_hash END) AS official_visitors,
  COUNT(DISTINCT CASE WHEN name = 'returned' THEN session_hash END) AS returned_users,
  COUNT(DISTINCT CASE WHEN name = 'visited' AND occurred_on >= date('now', '-6 days') THEN session_hash END) AS users_7d,
  COUNT(DISTINCT CASE WHEN name = 'diagnosis_completed' AND occurred_on >= date('now', '-6 days') THEN session_hash END) AS completers_7d,
  COALESCE(SUM(CASE WHEN name = 'diagnosis_completed' THEN score END), 0) AS completed_score,
  COALESCE(SUM(CASE WHEN name = 'diagnosis_completed' THEN question_count END), 0) AS completed_questions
FROM product_events
WHERE is_automated = 0;
