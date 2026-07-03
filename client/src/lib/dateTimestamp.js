import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  isYesterday,
  isThisWeek,
  format,
} from 'date-fns';

export function formatChatTime(date) {
  const d = new Date(date);
  const now = new Date();

  const seconds = differenceInSeconds(now, d);
  if (seconds < 60) return 'Just now';

  const minutes = differenceInMinutes(now, d);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = differenceInHours(now, d);
  if (hours < 24 && !isYesterday(d)) return `${hours}h ago`;

  if (isYesterday(d)) return 'Yesterday';

  if (isThisWeek(d)) return format(d, 'EEEE'); // "Friday"

  return format(d, 'dd/MM/yyyy'); // "22/05/2025"
}
