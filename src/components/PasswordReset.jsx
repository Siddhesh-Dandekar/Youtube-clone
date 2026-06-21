import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../utils/api';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function requestReset(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await apiFetch('/password-reset/request', { method: 'POST', body: { email } });
      setMessage(response.message);
      if (response.resetToken) setToken(response.resetToken);
    } catch (err) {
      setError(err.message);
    }
  }

  async function confirmReset(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    try {
      const response = await apiFetch('/password-reset/confirm', { method: 'POST', body: { token, password } });
      setMessage(response.message);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex min-h-screen bg-gray-100 px-4 pt-20">
      <div className="m-auto w-full max-w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-2xl font-semibold">Reset password</h1>
        <p className="mt-2 text-sm text-gray-600">Request a reset token, then use it to set a new password.</p>
        {error ? <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
        {message ? <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">{message}</div> : null}
        <form onSubmit={requestReset} className="mt-6 space-y-3">
          <label className="block text-sm font-medium" htmlFor="reset-email">Email</label>
          <input id="reset-email" type="email" required value={email} onChange={event => setEmail(event.target.value)} className="w-full rounded-md border px-3 py-2" />
          <button className="rounded-full bg-blue-700 px-4 py-2 text-white">Request token</button>
        </form>
        <form onSubmit={confirmReset} className="mt-8 space-y-3">
          <label className="block text-sm font-medium" htmlFor="reset-token">Reset token</label>
          <input id="reset-token" required value={token} onChange={event => setToken(event.target.value)} className="w-full rounded-md border px-3 py-2" />
          <label className="block text-sm font-medium" htmlFor="new-password">New password</label>
          <input id="new-password" type="password" minLength="8" required value={password} onChange={event => setPassword(event.target.value)} className="w-full rounded-md border px-3 py-2" />
          <button className="rounded-full bg-black px-4 py-2 text-white">Update password</button>
        </form>
        <Link to="/login" className="mt-6 inline-block text-sm font-medium text-blue-700">Back to sign in</Link>
      </div>
    </main>
  );
}

export default PasswordReset;
