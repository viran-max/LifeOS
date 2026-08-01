export function createSession({ description, tags, durationSeconds, goalId = null, finishedAt = new Date() }) {
  return {
    description: description.trim(),
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    durationSeconds,
    goalId,
    finishedAt: finishedAt.toISOString(),
  }
}