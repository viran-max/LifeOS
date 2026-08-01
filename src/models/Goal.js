export function createGoal({ title, type, targetMinutes }) {
  return {
    title: title.trim(),
    type, // 'weekly' | 'monthly'
    targetMinutes: Number(targetMinutes),
    createdAt: new Date().toISOString(),
  }
}