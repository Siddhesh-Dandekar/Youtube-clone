import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../utils/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignin(event) {
        event.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await apiFetch('/login', {
                method: "POST",
                body: { email, password }
            });
            setToken(response.token);
            navigate('/');
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
                <h1 className="mb-1 text-2xl font-semibold dark:text-white">Sign in</h1>
                <p className="mb-6 text-sm text-gray-500 dark:text-neutral-400">Welcome back. Enter your details to continue.</p>

                {error ? (
                    <div role="alert" className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:border-red-900 dark:text-red-300">{error}</div>
                ) : null}

                <form onSubmit={handleSignin} className="space-y-4">
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
                        <div className="mb-1 flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium dark:text-white">Password</label>
                            <Link to="/password-reset" className="text-xs text-blue-600 hover:underline dark:text-blue-400">Forgot?</Link>
                        </div>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                minLength="8"
                                autoComplete="current-password"
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
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700 disabled:opacity-60"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600 dark:text-neutral-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-blue-600 hover:underline dark:text-blue-400">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
