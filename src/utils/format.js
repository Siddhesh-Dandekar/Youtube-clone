export function compactNumber(value = 0) {
  const number = Number(value) || 0;
  if (number >= 1000000) return `${(number / 1000000).toFixed(1)}M`;
  if (number >= 1000) return `${(number / 1000).toFixed(1)}K`;
  return String(number);
}

export function relativeDate(value) {
  if (!value) return 'recently';
  const date = new Date(value);
  const seconds = Math.max(1, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  for (const [label, size] of units) {
    const count = Math.floor(seconds / size);
    if (count >= 1) return `${count} ${label}${count > 1 ? 's' : ''} ago`;
  }
  return 'just now';
}

export function youtubeEmbedUrl(videoUrl = '') {
  try {
    const url = new URL(videoUrl);
    if (url.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed/${url.pathname.slice(1)}`;
    }
    const videoId = url.searchParams.get('v') || url.pathname.split('/').filter(Boolean).pop();
    return `https://www.youtube.com/embed/${videoId}`;
  } catch {
    const fallback = videoUrl.split('/').filter(Boolean).pop();
    return `https://www.youtube.com/embed/${fallback || ''}`;
  }
}

export function videoChannel(video) {
  return video?.channel || {};
}

export function formatDuration(seconds) {
  const total = Math.floor(Number(seconds) || 0);
  if (total <= 0) return null;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = n => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
