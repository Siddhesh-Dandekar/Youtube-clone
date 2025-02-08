import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
    const userinfo = useSelector(items => items.credential);
    const navigate = useNavigate();
    const [ email, setEmail] = useState('');
    const [ password , setPassword] = useState('')
    const [isSignIn, setIsSignIn] = useState(false);


    //This function is used to allow user to Login 
    async function handlesiginin(event){
        event.preventDefault();
        const loginuserr = await fetch('https://youtube-clone-api-j322.onrender.com/login', {
            method : "POST",
            headers : {
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                email : email,
                password : password
            })

        })

        const response = await loginuserr.json()
        if(loginuserr.ok){
            localStorage.setItem("key",response.token);
            navigate('/');
        }else{
            alert(response.message)
        }        
    }
    return (
        <>
            <div className="h-screen flex w-full lg:bg-gray-100">
                <div className="max-w-screen-lg gap-5 md:gap-0 bg-white rounded-2xl relative flex justify-between  w-full flex-col md:flex-row m-auto pt-24 px-7 pb-4">
                    <img width="60" className="absolute top-7 left-7" height="60" src="https://img.icons8.com/color/60/google-logo.png" alt="google-logo" />
                    <div className="w-full md:w-1/2 flex flex-col gap-4">
                        <h1 className="text-3xl">Sign in</h1>
                        <p>Use your Google Account</p>
                    </div>
                    <div className="w-full  md:w-1/2 md:p-4 flex flex-col gap-2">
                        <form action="#" className="text-xl" method="POST" onSubmit={e => handlesiginin(e)}>
                            <label htmlFor="email">Email ID</label>
                            <br />
                            <input type="email" required onChange={(e)=> setEmail(e.target.value)} className="w-full rounded-sm border p-1 border-black mb-4" name="email" id="email" />
                            <br />
                            <label htmlFor="password">Password</label>
                            <br />
                            <input type="password" minLength="8" required onChange={e => setPassword(e.target.value)} className="w-full rounded-sm border p-1 border-black mb-4" name="password" id="password" />

                            <p className="text-sm mb-5">Not your computer? Use Guest mode to sign in privately. <b className="text-blue-600 font-medium">Learn more about</b><br /> <Link to="/signup"><b className="hover:underline cursor-pointer">Don't have an account?</b></Link>   </p>
                            <button type="submit" className="text-white text-lg p-2 px-3 hover:bg-blue-600 rounded-full ml-auto font-medium bg-blue-700">Next</button>
                            <Link to="/"><button className=" p-2 px-3 text-lg hover:bg-gray-200 rounded-md mx-3 font-medium ">Cancel</button></Link>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login;