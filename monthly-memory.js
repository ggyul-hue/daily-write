export function selectMonthlyMemories(records, year, monthIndex) {
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  if (sorted.length <= 2) return sorted;
  const midpoint = (new Date(year, monthIndex + 1, 0).getDate() + 1) / 2;
  // Exclude the endpoints so the three memories are always distinct.
  const middle = sorted.slice(1, -1).reduce((closest, record) =>
    Math.abs(Number(record.date.slice(8, 10)) - midpoint) < Math.abs(Number(closest.date.slice(8, 10)) - midpoint)
      ? record : closest);
  return [sorted[0], middle, sorted.at(-1)];
}

export function monthlySummary(year, monthIndex, today, companion, count) {
  const currentMonth = `${year}-${String(monthIndex + 1).padStart(2, "0")}` === today.slice(0, 7);
  const opening = currentMonth ? `${monthIndex + 1}월, 지금까지` : `${monthIndex + 1}월에는`;
  return `${opening} ${companion} ${count}개의 조각을 남겼어요.`;
}
