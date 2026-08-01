export function createSession({ description, tags, durationSeconds, finishedAt = new Date() }) {
  return {
    description: description.trim(),
    tags: tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean),
    durationSeconds,
    finishedAt: finishedAt.toISOString(),
  }
}