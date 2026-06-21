import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { apiFetch } from '../utils/api';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(searchParams.get('token') || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function verify(value = token) {
    if (!value) return;
    setError('');
    setMessage('');
    try {
      const response = await apiFetch('/email/verify', { method: 'POST', body: { token: value } });
      setMessage(response.message);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const initialToken = searchParams.get('token') || '';
    if (!initialToken) return;
    setToken(initialToken);
    async function autoVerify() {
      setError('');
      setMessage('');
      try {
        const response = await apiFetch('/email/verify', { method: 'POST', body: { token: initialToken } });
        setMessage(response.message);
      } catch (err) {
        setError(err.message);
      }
    }
    autoVerify();
  }, [searchParams]);

  return (
    <main className="flex min-h-screen bg-gray-100 px-4 pt-20">
      <div className="m-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">Verify email</h1>
        <p className="mt-2 text-sm text-gray-600">Paste the verification token from signup.</p>
        {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        {message ? <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</div> : null}
        <form onSubmit={(event) => { event.preventDefault(); verify(); }} className="mt-6 space-y-3">
          <label className="block text-sm font-medium" htmlFor="verify-token">Verification token</label>
          <input id="verify-token" required value={token} onChange={event => setToken(event.target.value)} className="w-full rounded-md border px-3 py-2" />
          <button className="rounded-full bg-blue-700 px-4 py-2 text-white">Verify</button>
        </form>
        <Link to="/login" className="mt-6 inline-block text-sm font-medium text-blue-700">Back to sign in</Link>
      </div>
    </main>
  );
}

export default VerifyEmail;
