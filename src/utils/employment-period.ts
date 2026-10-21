import type { EmploymentPeriod } from '../types/portfolio';

const monthFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

function parseMonth(value: string) {
  const [year, month] = value.split('-').map(Number);
  return { year, month };
}

export function formatEmploymentPeriod(period: EmploymentPeriod, now = new Date()): string {
  const start = parseMonth(period.start);
  const end = period.end ? parseMonth(period.end) : { year: now.getFullYear(), month: now.getMonth() + 1 };
  // Count both endpoint months, matching the month-based dates shown on LinkedIn.
  const months = Math.max(0, (end.year - start.year) * 12 + end.month - start.month + 1);
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const duration = [
    years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '',
    remainingMonths > 0 || years === 0 ? `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}` : '',
  ].filter(Boolean).join(' ');
  const startLabel = monthFormatter.format(new Date(Date.UTC(start.year, start.month - 1)));
  const endLabel = period.end ? monthFormatter.format(new Date(Date.UTC(end.year, end.month - 1))) : 'Present';

  return `${startLabel} – ${endLabel} (${duration})`;
}
