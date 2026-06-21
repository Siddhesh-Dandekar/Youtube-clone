import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faMicrophone, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeState } from "../utils/sidebarSlice";
import { useEffect, useState } from "react";
import { cleardata } from "../utils/credentialSlice.js";
import { clearinfo, searchinfo } from "../utils/searchSlice.js";
import { apiFetch, clearToken } from "../utils/api.js";
import { relativeDate } from "../utils/format.js";

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userinfo = useSelector(item => item.credential.data[0]);
    const [profileModel, setProfileModel] = useState(false);
    const [createchannelmodel, setCreateChannelModel] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState({ items: [], unread: 0 });
    const [channelDetails, setChannelDetails] = useState(null);
    const [searchbar, setSearchBar] = useState('');
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    function togglesmenu() {
        dispatch(changeState());
    }

    function handlesearch(event) {
        event.preventDefault();
        const value = searchbar.trim();
        if (!value) return;
        dispatch(searchinfo(value));
        navigate(`/search?query=${encodeURIComponent(value)}`);
    }

    function clearsearch() {
        dispatch(clearinfo(null));
        setSearchBar('');
    }

    function signOut() {
        dispatch(cleardata());
        clearToken();
        setProfileModel(false);
        navigate('/');
    }

    useEffect(() => {
        let active = true;
        async function channelfetch() {
            if (!userinfo.channelId) {
                setChannelDetails(null);
                return;
            }
            try {
                const ChannelInfo = await apiFetch(`/channel/${userinfo.channelId}`);
                if (active) setChannelDetails(ChannelInfo);
            } catch {
                if (active) setChannelDetails(null);
            }
        }
        channelfetch();
        return () => {
            active = false;
        };
    }, [userinfo.channelId]);

    async function loadNotifications() {
        if (!userinfo.validuser) return;
        try {
            const data = await apiFetch('/notifications', { auth: true });
            setNotifications(data);
        } catch (err) {
            setError(err.message);
        }
    }

    async function toggleNotifications() {
        const next = !notificationOpen;
        setNotificationOpen(next);
        setProfileModel(false);
        if (next) await loadNotifications();
    }

    async function markRead(id) {
        try {
            await apiFetch(`/notifications/${id}/read`, { method: 'POST', auth: true });
            await loadNotifications();
        } catch (err) {
            setError(err.message);
        }
    }

    async function createChannel(event) {
        event.preventDefault();
        setError('');
        setMessage('');
        try {
            const newChannel = await apiFetch('/channel', {
                method: "POST",
                auth: true,
                body: {
                    channelName,
                    description,
                    channelProfile: profileUrl || "https://yt3.ggpht.com/RAnCvom2Cnxn5g5xe1Vz5T4S9167TWv18cz2MTUu1hXv_tNZ-h2b34RoWPQqtAhvwXdgDijE=s108-c-k-c0x00ffffff-no-rj"
                }
            });
            setMessage("Channel successfully created.");
            setCreateChannelModel(false);
            navigate(`/channel/${newChannel.channelId}`);
            window.location.reload();
        } catch (err) {
            setError(err.message);
        }
    }

    return <>
        <header className="w-full select-none h-14 fixed z-10 bg-white">
            <nav className="px-4 gap-2 flex justify-between h-full items-center" aria-label="Primary">
                <div className="flex gap-1 items-center flex-grow">
                    <button aria-label="Toggle sidebar" onClick={togglesmenu} className="h-10 w-10 rounded-full hover:bg-gray-200">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    <Link to="/" aria-label="YouTube home">
                        <img className="hidden sm:block" src="/youtube.webp" alt="YouTube" width="122" height="56" />
                        <img width="34" height="34" src="https://img.icons8.com/fluency/48/youtube-play.png" className="sm:hidden" alt="YouTube" />
                    </Link>
                </div>
                <form onSubmit={handlesearch} className="flex justify-center items-center w-36 sm:w-auto flex-grow-[3] gap-2 h-full">
                    <div className="flex relative w-full sm:w-5/6 h-2/3">
                        <input
                            onChange={(e) => setSearchBar(e.target.value)}
                            type="search"
                            className="border-gray-300 relative rounded-s-full px-2 sm:px-4 border w-full"
                            placeholder="Search"
                            value={searchbar}
                            aria-label="Search videos"
                        />
                        {searchbar ? (
                            <button type="button" onClick={clearsearch} className="absolute cursor-pointer hover:bg-gray-200 rounded-full right-10 sm:right-16 top-1" aria-label="Clear search">
                                <img width="30" height="30" src="https://img.icons8.com/ios/30/multiply.png" alt="" />
                            </button>
                        ) : null}
                        <button type="submit" className="border-gray-300 border px-1 sm:px-3 rounded-e-full hover:bg-gray-200" aria-label="Search">
                            <FontAwesomeIcon className="rounded-full p-2" icon={faMagnifyingGlass} />
                        </button>
                    </div>
                    <button type="button" aria-label="Voice search coming soon" className="h-10 w-10 hidden sm:block rounded-full bg-gray-100 hover:bg-gray-200">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </button>
                </form>
                <div className="justify-end text-sm items-center gap-2 flex-grow h-full flex">
                    {userinfo.validuser ? <>
                        {channelDetails ? (
                            <Link className="flex" to='/channel/studio' aria-label="Open studio">
                                <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faVideo} />
                            </Link>
                        ) : null}
                        <button onClick={toggleNotifications} className="relative h-10 w-10 hidden sm:flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200" aria-label="Notifications">
                            <FontAwesomeIcon icon={faBell} />
                            {notifications.unread ? <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-[0.65rem] text-white">{notifications.unread}</span> : null}
                        </button>
                        <button onClick={() => { setProfileModel(!profileModel); setNotificationOpen(false); }} aria-label="Open profile menu">
                            <img src={channelDetails ? channelDetails.channelProfile : "https://img.icons8.com/color/32/test-account.png"} className="rounded-full" height="34" width="34" alt="Profile" />
                        </button>
                    </> : (
                        <Link to='/login'>
                            <button className="flex items-center hover:bg-gray-100 text-blue-500 font-medium border border-gray-300 p-1 rounded-full sm:px-2">
                                <img src="/signin.png" alt="" className="rounded-full" height="24" width="24" />
                                <span className="hidden sm:block">Sign in</span>
                            </button>
                        </Link>
                    )}
                </div>
            </nav>
        </header>

        {(message || error) ? (
            <div className={`fixed right-4 top-16 z-30 rounded-md border p-3 text-sm shadow ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>
                {error || message}
            </div>
        ) : null}

        {notificationOpen ? (
            <div className="fixed right-14 top-14 z-20 w-80 rounded-md border border-gray-100 bg-white p-3 text-sm shadow-md">
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="font-semibold">Notifications</h2>
                    <button className="text-xs text-blue-600" onClick={loadNotifications}>Refresh</button>
                </div>
                <div className="max-h-96 overflow-auto">
                    {notifications.items.length ? notifications.items.map(item => (
                        <button
                            key={item._id}
                            onClick={() => markRead(item._id)}
                            className={`mb-2 w-full rounded-md p-2 text-left hover:bg-gray-100 ${item.read ? 'text-gray-500' : 'bg-gray-50 font-medium'}`}
                        >
                            <span className="block">{item.message}</span>
                            <span className="text-xs text-gray-500">{relativeDate(item.createdAt)}</span>
                        </button>
                    )) : <p className="py-8 text-center text-gray-500">No notifications yet.</p>}
                </div>
            </div>
        ) : null}

        {profileModel ? (
            <div className="bg-white rounded-md pt-4 pb-2 shadow-md border flex flex-col gap-2 text-sm border-gray-100 fixed z-20 right-16 top-2">
                {userinfo.channelId ? (
                    <div className="flex px-3 gap-3 mr-8">
                        <img src={channelDetails ? channelDetails.channelProfile : "https://img.icons8.com/color/32/test-account.png"} className="rounded-full" height="34" width="34" alt="Channel avatar" />
                        <div className="flex flex-col text-sm font-medium">
                            {channelDetails ? <>
                                <span className="max-w-32 text-ellipsis overflow-hidden whitespace-nowrap">{channelDetails.channelName}</span>
                                <span className="max-w-32 text-ellipsis overflow-hidden whitespace-nowrap">@{userinfo.username?.split(" ")[0]?.toLowerCase()}</span>
                            </> : <span>Loading...</span>}
                            <Link to={`channel/${userinfo.channelId}`}><button className="text-blue-500 text-xs mt-2">View your Channel</button></Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex px-3 gap-3 mr-8">
                        <img width="34" height="34" className="rounded-full" src="https://img.icons8.com/color/32/test-account.png" alt="User avatar" />
                        <div className="flex flex-col items-start text-sm font-medium">
                            <span className="w-32 text-ellipsis overflow-hidden whitespace-nowrap">{userinfo.username}</span>
                            <button onClick={() => { setCreateChannelModel(true); setProfileModel(false); }} className="text-blue-500 text-sm mt-1">Create Channel</button>
                        </div>
                    </div>
                )}
                <div className="w-full border-t-2 border-gray-200 border-solid" />
                <Link to="/account" className="flex px-3 p-2 hover:bg-gray-100">Google Account</Link>
                <button onClick={signOut} className="flex px-3 p-2 cursor-pointer hover:bg-gray-100 text-left">Sign out</button>
                <div className="w-full border-t-2 border-gray-200 border-solid" />
                <Link to="/channel/studio" className="flex px-3 p-2 hover:bg-gray-100">Youtube Studio</Link>
                <Link to="/subscriptions" className="flex px-3 p-2 hover:bg-gray-100">Memberships</Link>
                <div className="w-full border-t-2 border-gray-200 border-solid" />
                <Link to="/settings" className="flex px-3 p-2 hover:bg-gray-100">Settings</Link>
                <Link to="/help" className="flex px-3 p-2 hover:bg-gray-100">Help</Link>
                <Link to="/feedback" className="flex px-3 p-2 hover:bg-gray-100">Feedback</Link>
            </div>
        ) : null}

        {createchannelmodel ? (
            <div className="w-full z-[19] bg-transparent p-3 md:p-14 fixed h-full top-4 left-0 right-0">
                <div className="bg-white flex justify-between flex-col w-full h-full no-scrollbar overflow-scroll px-2 md:px-10 py-2 md:py-8 rounded-2xl shadow-lg border border-gray-300">
                    <div className="text-2xl md:text-4xl font-bold">
                        <h1>How you'll appear</h1>
                    </div>
                    <div className="mx-auto w-11/12 md:w-10/12 lg:w-8/12 text-xl md:text-2xl">
                        <form action="#" method="POST" onSubmit={createChannel}>
                            <label htmlFor="profileUrl">Profile Image Url</label>
                            <input id="profileUrl" onChange={(e) => setProfileUrl(e.target.value)} className="border mb-5 w-full rounded-md p-1 border-gray-500" type="url" name="Profile" />
                            <label htmlFor="channelName">Channel Name</label>
                            <input id="channelName" onChange={(e) => setChannelName(e.target.value)} className="border mb-5 w-full rounded-md p-1 border-gray-500" type="text" required name="channelName" />
                            <label htmlFor="channelDescription">Description</label>
                            <textarea id="channelDescription" maxLength='150' rows='4' className="border mb-5 w-full rounded-md p-1 border-gray-500 leading-tight" onChange={(e) => setDescription(e.target.value)} />
                            <p className="text-base mt-5">By clicking create channel you agree to Youtube Terms & Service.</p>
                            <div className="flex gap-4 mt-10 text-xl justify-end">
                                <button type="button" onClick={() => setCreateChannelModel(false)}>Cancel</button>
                                <button className="text-blue-600 font-semibold">Create channel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        ) : null}
    </>;
}

export default Header;
