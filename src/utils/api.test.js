import { afterEach, describe, expect, it, vi } from 'vitest';
import { apiFetch, clearToken, getToken, setToken } from './api';

describe('apiFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    clearToken();
  });

  it('clears the token when the API returns 401', async () => {
    setToken('expired-token');
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 401 })));

    await expect(apiFetch('/validuser', { auth: true })).rejects.toMatchObject({ status: 401 });
    expect(getToken()).toBeNull();
  });
});
