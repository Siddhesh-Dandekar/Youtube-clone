import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utils/api";

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [verificationToken, setVerificationToken] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleregister(event) {
        event.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);
        try {
            const register = await apiFetch('/signup', {
                method: "POST",
                body: { username, email, password }
            });
            setMessage(register.message);
            setVerificationToken(register.verificationToken || '');
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
                    <h1 className="text-3xl">Sign up</h1>
                    <p>Create your YouTube Clone account.</p>
                    {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
                    {message ? (
                        <div className="rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                            <p>{message}</p>
                            {verificationToken ? <p className="mt-2 break-all">Verification token: {verificationToken}</p> : null}
                            {verificationToken ? <Link className="mt-2 inline-block font-semibold text-blue-700" to={`/verify-email?token=${verificationToken}`}>Verify email</Link> : null}
                        </div>
                    ) : null}
                </div>
                <div className="w-full md:w-1/2 md:p-4 flex flex-col gap-2">
                    <form action="#" method="POST" className="text-xl" onSubmit={handleregister}>
                        <label htmlFor="fullname">Full Name</label>
                        <input type="text" required className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setUsername(e.target.value)} name="fullname" id="fullname" />
                        <label htmlFor="email">Email ID</label>
                        <input type="email" required className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                        <label htmlFor="password">Password</label>
                        <input type="password" required minLength="8" className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
                        <p className="text-sm mb-5">
                            Already have an account? <Link to="/login"><b className="hover:underline cursor-pointer">Sign in</b></Link>
                        </p>
                        <button disabled={loading} type="submit" className="text-white text-base p-2 px-3 hover:bg-blue-600 rounded-full ml-auto font-medium bg-blue-700 disabled:opacity-60">{loading ? 'Creating...' : 'Create account'}</button>
                        <Link to="/"><button type="button" className="p-2 px-3 text-base hover:bg-gray-200 rounded-md mx-3 font-medium">Cancel</button></Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
