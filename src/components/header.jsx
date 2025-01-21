import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faUser, faMicrophone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeState } from "../utils/sidebarSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { cleardata } from "../utils/credentialSlice.js"

function Header(params) {
    const [profileModel, setProfileModel] = useState(false);
    const [createchannelmodel, setCreateChannelModel] = useState(false)
    const dispatch = useDispatch();
    function togglesmenu() {
        dispatch(changeState());
    }

    function signOut(){
        dispatch(cleardata());
        localStorage.removeItem('key');
        setProfileModel(false);
    }
    const userinfo = useSelector(item => item.credential.data[0])

    return <>
        <header className="w-full select-none h-14 fixed z-10 bg-white">
            <nav className="px-4 gap-2 flex justify-between h-full items-center">
                <div className="flex items-center flex-grow">
                    <FontAwesomeIcon onClick={togglesmenu} className="h-4 w-4 rounded-full  hover:bg-gray-200 p-3" icon={faBars}></FontAwesomeIcon>
                    <img src="/src/assets/youtube.webp" alt="" width="122" height="56" />
                </div>
                <div className="flex justify-center items-center flex-grow-[3] gap-2 h-full">
                    <div className="flex w-5/6 h-2/3">
                        <input type="text" className="border-gray-300 rounded-s-full px-4 border w-full" placeholder="Search" />
                        <button className="border-gray-300 border px-3 rounded-e-full hover:bg-gray-200 " ><FontAwesomeIcon className=" rounded-full  p-2" icon={faMagnifyingGlass} /></button>
                    </div>
                    <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faMicrophone}></FontAwesomeIcon>
                </div>
                <div className="justify-end text-sm items-center gap-2 flex-grow h-full flex">
                    {userinfo.validuser ? <>
                        <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faVideo}></FontAwesomeIcon>
                        <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faBell}></FontAwesomeIcon>
                        <img src={userinfo.avatar} onClick={() => setProfileModel(!profileModel)} className="rounded-full" height="34" width="34" alt="" />
                    </>
                        :
                        <Link to='/login'>
                            <button className="flex items-center hover:bg-gray-100 gap-1 text-blue-500 font-medium border border-gray-300 p-1 rounded-full px-2">
                                <img src="./src/assets/signin.png" alt="" className="rounded-full" height="24" width="24" />
                                <span>Sign in</span>
                            </button>
                        </Link>}



                </div>
            </nav>
        </header>
        {profileModel ? <div className="bg-white rounded-md pt-4 pb-2 shadow-md border flex flex-col gap-2 text-sm border-gray-100 fixed z-20 right-16 top-2">
            <div className="flex px-3 gap-3 mr-8">
                <div>
                    <img src={userinfo.avatar} className="rounded-full" height="34" width="34" alt="" />
                </div>
                <div className="flex flex-col text-sm font-medium">
                    <span>Channel Name</span>
                    <span>@greedy_space</span>
                    <button onClick={()=> {setCreateChannelModel(true); setProfileModel(false)}} className="text-blue-500 text-xs mt-2">View your Channel</button>
                </div>
            </div>
            <div className="w-full border-t-2 border-gray-200 border-solid"></div>

            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/material-sharp/20/google-logo.png" alt="google-logo" />
                <span>Google Account</span>
            </div>
            <div onClick={signOut} className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/forma-thin/20/exit.png" alt="exit" />
                <span>Sign out</span>
            </div>

            <div className="w-full border-t-2 border-gray-200 border-solid"></div>

            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/ios/20/youtube-studio_1.png" alt="youtube-studio_1" />
                <span>Youtube Studio</span>
            </div>
            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/material-outlined/20/us-dollar-circled.png" alt="us-dollar-circled" />
                <span>Memberships</span>
            </div>

            <div className="w-full border-t-2 border-gray-200 border-solid"></div>
            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/windows/20/settings.png" alt="settings" />
                <span>Settings</span>
            </div>
            <div className="w-full border-t-2 border-gray-200 border-solid"></div>

            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/windows/20/help.png" alt="help" />
                <span>Help</span>
            </div>
            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/small/20/popular-topic.png" alt="popular-topic" />
                <span>Feedbacks</span>
            </div>
        </div> : ''}

        {createchannelmodel ? <div className="w-full z-[19] bg-transparent p-14 fixed h-full top-4 left-0 right-0 ">
            <div className="bg-white flex justify-between flex-col w-full h-full px-10 py-8 rounded-2xl shadow-lg  border border-gray-300">
                <div className="text-4xl font-bold">
                    <h1>How you'll appear</h1>
                </div>
                <div className="mx-auto w-8/12 text-2xl">
                    <img src="" alt="" />
                    <form action="">
                        <label htmlFor="Profile">Profile Image Url</label>
                        <br />
                        <input className="border mb-5 w-full rounded-md p-1 border-gray-500" type="url" name="Profile" />
                        <br />
                        <label htmlFor="channelName">Channel Name</label>
                        <br />
                        <input className="border mb-5 w-full rounded-md p-1 border-gray-500" type="text" name="channelName" />
                        <br />
                        <label htmlFor="username">User Name</label>
                        <br />
                        <input className="border mb-5 w-full rounded-md p-1 border-gray-500" type="text" name="username" />

                        <p className="text-base mt-5">By clicking creates channel you agree to <b className="text-blue-600">Youtube Terms & Service</b>. Changes made to your name and profile picture are visible only on Youtube and for other Google services. <b className="text-blue-600">Learn more</b></p>

                        <div className="flex gap-4 mt-10 text-xl justify-end ">
                            <button onClick={()=> setCreateChannelModel(false)}>Cancel</button>
                            <button className="text-blue-600 font-semibold">Create channel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> : "" }
        

    </>
}
export default Header;