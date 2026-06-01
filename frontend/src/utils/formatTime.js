/**
 * Formats a Date object or ISO string into a relative time string (e.g. "2m ago")
 * @param {Date|string} dateInput - The date to format
 * @returns {string} Relative time representation
 */
export const formatRelativeTime = (dateInput) => {
  if (!dateInput) return '';
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const secondsDiff = Math.floor((now - date) / 1000);

  if (secondsDiff < 5) return 'Just now';
  if (secondsDiff < 60) return `${secondsDiff}s ago`;

  const minutesDiff = Math.floor(secondsDiff / 60);
  if (minutesDiff < 60) return `${minutesDiff}m ago`;

  const hoursDiff = Math.floor(minutesDiff / 60);
  if (hoursDiff < 24) return `${hoursDiff}h ago`;

  const daysDiff = Math.floor(hoursDiff / 24);
  if (daysDiff < 7) return `${daysDiff}d ago`;

  // Fallback to absolute date formatting if older than a week
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};
