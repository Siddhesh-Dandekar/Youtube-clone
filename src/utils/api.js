const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export const getToken = () => {
  const token = localStorage.getItem('key');
  return token && token !== 'undefined' ? token : null;
};

export const setToken = (token) => {
  if (token) localStorage.setItem('key', token);
};

export const clearToken = () => {
  localStorage.removeItem('key');
};

export async function apiFetch(path, options = {}) {
  const { auth = false, body, headers = {}, ...rest } = options;
  const requestHeaders = { ...headers };
  const token = getToken();

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json';
  }
  if (auth && token) {
    requestHeaders.Authorization = `JWT ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: requestHeaders,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    if (response.status === 401) clearToken();
    const message = response.status === 429
      ? 'Too many requests. Please wait a moment and try again.'
      : data?.message || `Request failed (${response.status})`;
    throw new ApiError(message, response.status, data);
  }

  return data;
}

export function getVideos(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value);
  });
  return apiFetch(`/videos${query.toString() ? `?${query}` : ''}`);
}

export function getRecommendations(exclude) {
  const query = new URLSearchParams();
  if (exclude) query.set('exclude', exclude);
  query.set('limit', '12');
  return apiFetch(`/videos/recommendations?${query}`);
}
