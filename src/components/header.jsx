import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faUser, faMicrophone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeState } from "../utils/sidebarSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cleardata } from "../utils/credentialSlice.js"
import { clearinfo, searchinfo } from "../utils/searchSlice.js";

function Header() {
    const navigate = useNavigate();
    const [profileModel, setProfileModel] = useState(false);
    const [createchannelmodel, setCreateChannelModel] = useState(false)
    const [channelDetails, setChannelDetails] = useState('')
    const [searchbar , setSearchBar] = useState('')

    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState('');
    const [profileUrl, setProfileUrl] = useState('');

    const dispatch = useDispatch();
    function togglesmenu() {
        dispatch(changeState());
    }

    function handlesearch(){
        dispatch(searchinfo(searchbar));
    }
    function clearsearch(){
        dispatch(clearinfo(null))
        setSearchBar('')
    }

    function signOut() {
        dispatch(cleardata());
        localStorage.removeItem('key');
        setProfileModel(false);
    }
    const userinfo = useSelector(item => item.credential.data[0])

    useEffect(() => {
        const channelfetch = async () => {
            if (userinfo.channelId) {
                const ChannelInfo = await fetch(`http://localhost:5100/channel/${userinfo.channelId}`).then(data => data.json());
                setChannelDetails(ChannelInfo)
            }
        }
        channelfetch();
    },[userinfo.channelId])


    async function createChannel(event) {
        event.preventDefault();
        const accessToken = localStorage.getItem("key");
        if (accessToken !== "undefined" && accessToken) {
            const newChannel = await fetch('http://localhost:5100/channel', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${accessToken}`
                },
                body: JSON.stringify({
                    channelName: channelName,
                    description: description,
                    channelProfile: profileUrl || "https://yt3.ggpht.com/RAnCvom2Cnxn5g5xe1Vz5T4S9167TWv18cz2MTUu1hXv_tNZ-h2b34RoWPQqtAhvwXdgDijE=s108-c-k-c0x00ffffff-no-rj"
                })
            }).then(data => data.json())

            console.log(newChannel)
            if (newChannel.error) {
                alert(newChannel.message);
                setCreateChannelModel(false);
            }
            else {
                alert("channel Successfully Created");
                window.location.reload(false);
            }


        }

    }

    return <>
        <header className="w-full select-none h-14 fixed z-10 bg-white">
            <nav className="px-4 gap-2 flex justify-between h-full items-center">
                <div className="flex items-center flex-grow">
                    <FontAwesomeIcon onClick={togglesmenu} className="h-4 w-4 rounded-full  hover:bg-gray-200 p-3" icon={faBars}></FontAwesomeIcon>
                    <Link to="/"><img src="/src/assets/youtube.webp" alt="" width="122" height="56" /></Link>
                </div>
                <div className="flex justify-center items-center flex-grow-[3] gap-2 h-full">
                    <div className="flex relative w-5/6 h-2/3">
                        <input onChange={(e) => setSearchBar(e.target.value)} type="text" className="border-gray-300 relative rounded-s-full px-4 border w-full" placeholder="Search" value={searchbar}/>
                        {searchbar ? <img onClick={clearsearch} className="absolute cursor-pointer hover:bg-gray-200 rounded-full right-16 top-1" width="30" height="30" src="https://img.icons8.com/ios/30/multiply.png" alt="multiply"/> : '' }
                        <button onClick={handlesearch} className="border-gray-300 border px-3 rounded-e-full hover:bg-gray-200 " ><FontAwesomeIcon className=" rounded-full  p-2" icon={faMagnifyingGlass} /></button>
                    </div>
                    <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faMicrophone}></FontAwesomeIcon>
                </div>
                <div className="justify-end text-sm items-center gap-2 flex-grow h-full flex">
                    {userinfo.validuser ? <>
                        {channelDetails ? <Link to='/channel/studio'><FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faVideo}></FontAwesomeIcon></Link> : ''}
                        <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faBell}></FontAwesomeIcon>
                        <img src={channelDetails ? channelDetails.channelProfile : "https://img.icons8.com/color/32/test-account.png"} onClick={() => setProfileModel(!profileModel)} className="rounded-full" height="34" width="34" alt="" />
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
            {userinfo.channelId ? <div className="flex px-3 gap-3 mr-8">
                <div>
                        <img src={channelDetails ? channelDetails.channelProfile : "https://img.icons8.com/color/32/test-account.png"} className="rounded-full" height="34" width="34" alt="" />
                </div>
                <div className="flex flex-col text-sm font-medium">
                    {channelDetails ? <>
                        <span className="max-w-32 text-ellipsis overflow-hidden whitespace-nowrap">{channelDetails.channelName}</span>
                        <span className="max-w-32 text-ellipsis overflow-hidden whitespace-nowrap">@{userinfo.username.split(" ")[0].toLowerCase()}</span>
                    </> : <span>Loading....</span>}

                    <Link to={`channel/${userinfo.channelId}`}><button className="text-blue-500 text-xs mt-2">View your Channel</button></Link>
                </div>
            </div> : <div className="flex px-3 gap-3 mr-8">
                <div>
                    <img width="34" height="34" className="rounded-full" src="https://img.icons8.com/color/32/test-account.png" alt="user-male-circle" />
                </div>
                <div className="flex flex-col items-start text-sm font-medium">
                    <span className="w-32 text-ellipsis overflow-hidden whitespace-nowrap">{userinfo.username}</span>
                    <button onClick={() => { setCreateChannelModel(true); setProfileModel(false) }} className="text-blue-500 text-sm mt-1">Create Channel</button>
                </div>
            </div>}
            <div className="w-full border-t-2 border-gray-200 border-solid"></div>

            <div className="flex px-3 p-2 hover:bg-gray-100">
                <img width="20" height="20" className="mr-3" src="https://img.icons8.com/material-sharp/20/google-logo.png" alt="google-logo" />
                <span>Google Account</span>
            </div>
            <div onClick={signOut} className="flex px-3 p-2 cursor-pointer hover:bg-gray-100">
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

        {createchannelmodel ? <div className="w-full z-[19] bg-transparent p-3 md:p-14 fixed h-full top-4 left-0 right-0 ">
            <div className="bg-white flex justify-between flex-col w-full h-full no-scrollbar overflow-scroll px-2 md:px-10 py-2 md:py-8 rounded-2xl shadow-lg  border border-gray-300">
                <div className="text-2xl md:text-4xl font-bold">
                    <h1>How you'll appear</h1>
                </div>
                <div className="mx-auto w-11/12 md:w-10/12 lg:w-8/12 text-xl md:text-2xl">
                    <img src="" alt="" />
                    <form action="#" method="POST" onSubmit={(e) => createChannel(e)}>
                        <label htmlFor="Profile">Profile Image Url</label>
                        <br />
                        <input onChange={(e) => setProfileUrl(e.target.value)} className="border mb-5 w-full rounded-md p-1 border-gray-500" type="url" name="Profile" />
                        <br />
                        <label htmlFor="channelName">Channel Name</label>
                        <br />
                        <input onChange={(e) => setChannelName(e.target.value)} className="border mb-5 w-full rounded-md p-1 border-gray-500" type="text" required name="channelName" />
                        <br />
                        <label htmlFor="username">Description</label>
                        <br />
                        <textarea rows='4' className="border mb-5 w-full rounded-md p-1 border-gray-500" onChange={(e) => setDescription(e.target.value)} ></textarea>

                        <p className="text-base mt-5">By clicking creates channel you agree to <b className="text-blue-600">Youtube Terms & Service</b>. Changes made to your name and profile picture are visible only on Youtube and for other Google services. <b className="text-blue-600">Learn more</b></p>

                        <div className="flex gap-4 mt-10 text-xl justify-end ">
                            <button onClick={() => setCreateChannelModel(false)}>Cancel</button>
                            <button className="text-blue-600 font-semibold">Create channel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> : ""}


    </>
}
export default Header;