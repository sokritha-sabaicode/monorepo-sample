/**
 * Return date format
 */
export function dateFormat(date: Date, locale: string) {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function getRelativeTime(date: Date) {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date?.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return `${interval} years ago`;

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return `${interval} months ago`;

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `${interval} days ago`;

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `${interval} hours ago`;

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `${interval} minutes ago`;

  return `${Math.floor(seconds)} seconds ago`;
}
