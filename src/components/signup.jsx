import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleregister(event){
        event.preventDefault();
        const register = await fetch("http://localhost:5100/signup", {
            method : "POST",
            headers : {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                username : username,
                email : email,
                password : password
            })
        }).then(response => response.json());

        console.log(register)
        if(register.error){
            alert(register.message);
        }
        else{
            alert(register.message);
            return navigate('/');
        }
    }
    return (
        <>
            <div className="h-screen flex w-full lg:bg-gray-100">
                <div className="max-w-screen-lg gap-5 md:gap-0 bg-white rounded-2xl relative flex justify-between  w-full flex-col md:flex-row m-auto pt-24 px-7 pb-4">
                    <img width="60" className="absolute top-7 left-7" height="60" src="https://img.icons8.com/color/60/google-logo.png" alt="google-logo" />
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h1 className="text-3xl">Sign up</h1>
                        <p>create your Google Account to continue to YouTube. This account will be available to other Google apps in the browser.</p>
                    </div>
                    <div className="w-full  md:w-1/2 md:p-4 flex flex-col gap-2">
                        <form action="#" method="POST" className="text-xl" onSubmit={(e) => handleregister(e)}>
                            <label htmlFor="fullname">Full Name</label>
                            <br />
                            <input type="text" required  className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setUsername(e.target.value)} name="fullname" id="fullname" />
                            <br />
                            <label htmlFor="email">Email ID</label>
                            <br />
                            <input type="email" required  className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setEmail(e.target.value)} name="email" id="email" />
                            <br />
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" required className="w-full rounded-sm border p-1 border-black mb-4" onChange={(e) => setPassword(e.target.value)} name="password" id="password" />
                            
                        
                        <p className="text-sm mb-5">Not your computer? Use Guest mode to sign in privately. <b className="text-blue-600 font-medium">Learn more about</b><br /> <Link to="/login"><b className="hover:underline cursor-pointer">Already have an account?</b></Link>   </p>
                        <button type="submit" className="text-white text-base p-2 px-3 hover:bg-blue-600 rounded-full ml-auto font-medium bg-blue-700">Create account</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Signup;