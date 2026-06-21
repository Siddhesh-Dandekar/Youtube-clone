import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../utils/api";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handlesiginin(event) {
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
        <div className="h-screen flex w-full lg:bg-gray-100">
            <div className="max-w-screen-lg gap-5 md:gap-0 bg-white rounded-2xl relative flex justify-between w-full flex-col md:flex-row m-auto pt-24 px-7 pb-4">
                <img width="60" className="absolute top-7 left-7" height="60" src="https://img.icons8.com/color/60/google-logo.png" alt="Google logo" />
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-3xl">Sign in</h1>
                    <p>Use your YouTube Clone account</p>
                    {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
                </div>
                <div className="w-full md:w-1/2 md:p-4 flex flex-col gap-2">
                    <form action="#" className="text-xl" method="POST" onSubmit={handlesiginin}>
                        <label htmlFor="email">Email ID</label>
                        <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full rounded-sm border p-1 border-black mb-4" name="email" id="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" minLength="8" required onChange={e => setPassword(e.target.value)} className="w-full rounded-sm border p-1 border-black mb-2" name="password" id="password" />
                        <Link to="/password-reset" className="mb-4 block text-sm font-medium text-blue-600 hover:underline">Forgot password?</Link>
                        <p className="text-sm mb-5">
                            Not your computer? Use Guest mode to sign in privately.<br />
                            <Link to="/signup"><b className="hover:underline cursor-pointer">Don't have an account?</b></Link>
                        </p>
                        <button disabled={loading} type="submit" className="text-white text-lg p-2 px-3 hover:bg-blue-600 rounded-full ml-auto font-medium bg-blue-700 disabled:opacity-60">{loading ? 'Signing in...' : 'Next'}</button>
                        <Link to="/"><button type="button" className="p-2 px-3 text-lg hover:bg-gray-200 rounded-md mx-3 font-medium">Cancel</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
