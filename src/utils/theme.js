export const THEME_KEY = 'yt-theme';
export const THEME_OPTIONS = ['system', 'light', 'dark'];

export function getPreference() {
  if (typeof window === 'undefined') return 'system';
  const stored = window.localStorage.getItem(THEME_KEY);
  return THEME_OPTIONS.includes(stored) ? stored : 'system';
}

export function resolveTheme(preference) {
  if (preference === 'light' || preference === 'dark') return preference;
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(resolved) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.toggle('dark', resolved === 'dark');
  root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light';
}

export function setPreference(preference) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_KEY, preference);
  }
  applyTheme(resolveTheme(preference));
}

export function subscribeToSystem(callback) {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = event => callback(event.matches ? 'dark' : 'light');
  if (mq.addEventListener) {
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }
  mq.addListener(handler);
  return () => mq.removeListener(handler);
}
