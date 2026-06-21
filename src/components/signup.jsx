import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [verificationToken, setVerificationToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister(event) {
        event.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);
        try {
            const register = await apiFetch('/signup', {
                method: "POST",
                body: { username, email, password }
            });
            setMessage(register.message || 'Account created.');
            setVerificationToken(register.verificationToken || '');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 sm:p-8 shadow-sm border border-gray-100 dark:border-neutral-800">
                <Link to="/" className="mb-6 flex items-center gap-2">
                    <img src="https://img.icons8.com/fluency/40/youtube-play.png" alt="" width="40" height="40" />
                    <span className="text-xl font-semibold dark:text-white">YouTube Clone</span>
                </Link>
                <h1 className="mb-1 text-2xl font-semibold dark:text-white">Create your account</h1>
                <p className="mb-6 text-sm text-gray-500 dark:text-neutral-400">It only takes a minute.</p>

                {error ? (
                    <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-300">{error}</div>
                ) : null}
                {message ? (
                    <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950 dark:border-green-900 dark:text-green-300">
                        <p>{message}</p>
                        {verificationToken ? (
                            <Link className="mt-2 inline-block font-semibold text-blue-700 dark:text-blue-300" to={`/verify-email?token=${verificationToken}`}>Verify email</Link>
                        ) : null}
                    </div>
                ) : null}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label htmlFor="fullname" className="mb-1 block text-sm font-medium dark:text-white">Full name</label>
                        <input
                            id="fullname"
                            type="text"
                            required
                            autoComplete="name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-3 py-2 focus:border-black dark:focus:border-white focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium dark:text-white">Email</label>
                        <input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-3 py-2 focus:border-black dark:focus:border-white focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium dark:text-white">Password</label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                minLength="8"
                                autoComplete="new-password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-3 py-2 pr-16 focus:border-black dark:focus:border-white focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-1 text-xs font-medium text-gray-600 dark:text-neutral-300 hover:underline"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <p className="mt-1 text-xs text-gray-500 dark:text-neutral-400">At least 8 characters.</p>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-neutral-400">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
