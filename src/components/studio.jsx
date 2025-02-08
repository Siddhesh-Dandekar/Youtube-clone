import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { data, Link } from "react-router-dom";
import ManageVideos from "./Manage.video";
import CreateChannel from "./createChannel";

function Studio() {
    const [channelPage, setChannelPage] = useState(true);
    const [videoPage, setVideoPage] = useState(false);
    const [manageVideo, setManageVideo] = useState(false)
    const [loading, setLoading] = useState(false);


    //Uploading Video
    const [channelDetails, setChannelDetails] = useState('')
    const [channelVideos, setChannelVideos] = useState([]);
    const [videoTitle, setVideoTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [description, setDescription] = useState('')

    //Channel Update
    const [updateBanner, setUpdateBanner] = useState(null);
    const [updateProfile, setUpdateProfile] = useState(null);
    const [updateName, setUpdateName] = useState(null);
    const [updateDescription, setUpdateDescription]= useState(null)


    //Fetching menu state
    const visiblestatus = useSelector(x => x.sidebar);
    const UserInfo = useSelector(x => x.credential.data[0])

    //Fetching channel and videos information at first load and after updating 
    useEffect(() => {
        const ChannelFetch = async () => {
            const channelInfo = await fetch(`https://youtube-clone-api-j322.onrender.com/channel/${UserInfo.channelId}`).then(data => data.json());
            setChannelDetails(channelInfo);
            const updatedVideos = [];
            if (channelInfo.videos) {
                for (let x of channelInfo.videos) {
                    try {
                        const videoData = await fetch(`https://youtube-clone-api-j322.onrender.com/video/${x}`).then(data => data.json());
                        updatedVideos.push(videoData);
                    }
                    catch (err) {

                    }

                }
            }
            setChannelVideos(updatedVideos);
        }
        ChannelFetch();
    }, [UserInfo, loading]);

    const accessToken = localStorage.getItem('key');

    //This function allows user to upload video
    async function uploadVideo(event) {
        event.preventDefault();
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            if (accessToken && accessToken !== undefined) {
                const uploadVideo = await fetch('https://youtube-clone-api-j322.onrender.com/upload', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        title: videoTitle,
                        videoUrl: videoUrl,
                        thumbnailUrl: thumbnailUrl,
                        description: description
                    })
                }).then(data => data.json());
                if (uploadVideo) {
                    alert('Video Uploaded Successfully');
                }
                setVideoTitle('');
                setVideoUrl('');
                setThumbnailUrl('');
                setDescription('');
            }
        }
        catch (err) {
            alert(err.message);
        }

    }

    //This function allows user to update Channel
    async function updateChannel(event, updaterequest) {
        event.preventDefault();
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            if (updaterequest == "Name" && accessToken) {
                const updateChannelInfo = await fetch('https://youtube-clone-api-j322.onrender.com/channel/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        channelName: updateName
                    })
                }).then(data => data.json())
            }
            if (updaterequest == "Banner" && accessToken) {
                const updateChannelInfo = await fetch('https://youtube-clone-api-j322.onrender.com/channel/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        channelBanner: updateBanner
                    })
                }).then(data => data.json())
            }
            if (updaterequest == "Profile" && accessToken) {
                const updateChanneIInfo = await fetch('https://youtube-clone-api-j322.onrender.com/channel/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        channelProfile: updateProfile
                    })
                }).then(data => data.json())
            }
            if (updaterequest == "Description" && accessToken) {
                const updateChanneIInfo = await fetch('https://youtube-clone-api-j322.onrender.com/channel/update', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        description: updateDescription
                    })
                }).then(data => data.json())
            }

        } catch (err) {
            alert(err.message)
        }
    }

    //This function allows user to Delete Video
    async function deleteVideo(id) {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
            if (accessToken && accessToken !== undefined) {
                const DeleteVideo = await fetch('https://youtube-clone-api-j322.onrender.com/video/delete', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        videoid: id,
                        channelid: channelDetails._id
                    })
                }).then(data => data.json());

            }
        } catch (err) {
            return console.log(err.message)
        }
    }
    
    //This function allows user to Edit Videos
    async function editVideo(event, obj) {
        const { _id, editTitle, editThumbnailUrl, editDescription } = obj;
        console.log(_id)
        event.preventDefault();
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
            if (accessToken && accessToken !== undefined) {
                const EditVideo = await fetch('https://youtube-clone-api-j322.onrender.com/video/edit', {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        videoid: _id,
                        title: editTitle,
                        thumbnailUrl: editThumbnailUrl,
                        description: editDescription
                    })
                }).then(data => data.json());
            }
        } catch (err) {
            console.log(err.message)
        }
    }
    return (<>
        {/* {UserInfo.validuser ?  : } */}

        {UserInfo.validuser ? (UserInfo.channelId ? <main className="flex w-full min-h-screen pt-14 ">
            {visiblestatus.visible ? <div className="w-56 fixed bg-white h-screen z-10  flex text-[0.8rem] flex-col px-4 pt-2 list-none">
                <div className="flex flex-col py-2 items-center px-2">
                    <img className="rounded-full border" src={channelDetails.channelProfile} width="110" height="110" alt="" />
                    <h1 className="font-semibold">Your Channel</h1>
                    <Link to={`/channel/${channelDetails._id}`}><span>{channelDetails.channelName}</span></Link>
                </div>
                <Link to="/">
                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <svg className="mr-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                        </svg>
                        <h2 className=" font-medium flex-grow">Home</h2>
                    </div></Link>
                <div onClick={() => { setChannelPage(false); setManageVideo(false); setVideoPage(true) }} className="h-10 cursor-pointer px-2 flex items-center rounded-lg  hover:bg-gray-100">
                    <img width="20" height="20" className="mr-5" src="https://img.icons8.com/fluency-systems-regular/20/upload--v1.png" alt="upload--v1" />
                    <h2 className=" font-medium flex-grow" >Upload Videos</h2>
                </div>
                <div onClick={() => { setChannelPage(false); setManageVideo(true); setVideoPage(false) }} className="h-10 cursor-pointer px-2 flex items-center rounded-lg hover:bg-gray-100">
                    <img width="20" height="20" className="mr-5" src="https://img.icons8.com/ios-glyphs/20/video-trimming.png" alt="video-trimming" />
                    <h2 className=" font-medium flex-grow">Manage Videos</h2>
                </div>
                <div onClick={() => { setChannelPage(true); setManageVideo(false); setVideoPage(false) }} className="h-10 cursor-pointer px-2 flex items-center rounded-lg hover:bg-gray-100">
                    <img width="20" height="20" className="mr-5" src="https://img.icons8.com/windows/20/vertical-settings-mixer.png" alt="vertical-settings-mixer" />
                    <h2 className=" font-medium flex-grow">Channel</h2>
                </div>

                <div className="w-full my-2 border-t-2 border-gray-200 border-solid"></div>
            </div> : <div className="w-20 gap-5 fixed bg-white flex text-[0.6rem] flex-col items-center pt-2 list-none">
                <Link to="/"><div className=" px-2 gap-1 flex flex-col items-center rounded-lg ">
                    <svg className="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                    </svg>
                    <h2 className=" font-medium">Home</h2>
                </div></Link>

                <div onClick={() => { setChannelPage(false); setManageVideo(false); setVideoPage(true) }} className="h-10 px-2 gap-1 cursor-pointer flex flex-col items-center rounded-lg hover:bg-gray-100">
                    <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/20/upload--v1.png" alt="upload--v1" />
                    <h2 className=" font-medium flex-grow">Videos</h2>
                </div>
                <div onClick={() => { setChannelPage(false); setManageVideo(true); setVideoPage(false) }} className="h-10 px-2 gap-1 cursor-pointer flex flex-col items-center rounded-lg hover:bg-gray-100">
                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/20/video-trimming.png" alt="video-trimming" />
                    <h2 className=" font-medium flex-grow">Manage</h2>
                </div>
                <div onClick={() => { setChannelPage(true); setManageVideo(false); setVideoPage(false) }} className="h-10 px-2 gap-1 cursor-pointer flex flex-col items-center rounded-lg hover:bg-gray-100">
                    <img width="20" height="20" src="https://img.icons8.com/windows/20/vertical-settings-mixer.png" alt="vertical-settings-mixer" />
                    <h2 className=" font-medium flex-grow">Channel</h2>
                </div>
            </div>}

            <div className={`w-full mx-2 ml-20 overflow-hidden ${loading ? 'pointer-events-none' : ''} relative ${visiblestatus.visible ? 'blureffect xl:ml-56' : ''
                }`}>
                {channelPage ? <>
                    <h1 className="text-xl font-semibold py-2 ">Channel Customisation</h1>
                    <div className="w-full md:w-2/3">
                        <div className="hover:bg-gray-100 p-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold">Banner Image</span>
                                    <img width="48" height="48" src="https://img.icons8.com/fluency/48/pro-display-xdr.png" alt="pro-display-xdr" />
                                </div>

                                <div className="flex text-sm gap-2 flex-col ">
                                    <form action="#" onSubmit={(e) => updateChannel(e, "Banner")} className="flex flex-col gap-2">
                                        <span className="max-sm:text-xs">For the best results on all devices, use an image that's at least 2048 x 1152 pixels</span>
                                        <input required type="url" onChange={(e) => setUpdateBanner(e.target.value)} placeholder="enter URL" className="border h-7 text-sm px-1" />
                                        <button type="submit" className="my-1 bg-gray-200 w-fit px-2 py-1 sm:text-base rounded-full">upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="hover:bg-gray-100 p-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col gap-2 items-start">
                                    <span className="font-semibold">Profile Picture</span>
                                    <img width="60" height="60" className="rounded-full border" src={channelDetails.channelProfile} alt="pro-display-xdr" />
                                </div>

                                <div className="flex text-sm gap-2 flex-col ">
                                    <form action="#" onSubmit={(e) => updateChannel(e, "Profile")} className="flex flex-col gap-2">
                                        <span className="max-sm:text-xs">It's recommended that you use a picture that's at least 98 x 98 pixels</span>
                                        <input required type="url" onChange={(e) => setUpdateProfile(e.target.value)} placeholder="enter URL" className="border h-7 text-sm px-1" />
                                        <button type="submit" className="my-1 bg-gray-200 w-fit px-2 py-1 sm:text-base rounded-full">upload</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="hover:bg-gray-100 p-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold">Edit Channel Name</span>
                                </div>

                                <div className="flex text-sm gap-2 flex-col ">
                                    <form action="#" onSubmit={(e) => updateChannel(e, "Name")} className="flex flex-col gap-2">
                                        <span className="max-sm:text-xs">Choose a channel name that represents you and your content. Changes made to your name and picture are only visible on YouTube and not on other Google services</span>
                                        <input required onChange={(e) => setUpdateName(e.target.value)} type="text" placeholder="Enter Name" className="border h-7 text-sm px-1" />
                                        <button type="submit" className="my-1 bg-gray-200 w-fit px-2 py-1 sm:text-base rounded-full">Change</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="hover:bg-gray-100 p-2">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold">Description</span>
                                </div>

                                <div className="flex text-sm gap-2 flex-col mb-4 ">
                                    <form action="#" onSubmit={(e) => updateChannel(e, "Description")} className="flex flex-col gap-2">
                                    <span className="max-sm:text-xs">Update Your Channel Description</span>
                                        <textarea maxLength='150' rows='5' required onChange={(e) => setUpdateDescription(e.target.value)} type="text" placeholder="Description" className="border leading-none h-7 text-sm p-1" />
                                        <button type="submit" className="my-1 bg-gray-200 w-fit px-2 py-1 sm:text-base rounded-full">Change</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </> : ''}
                {videoPage ? <>
                    <h1 className="text-xl font-semibold py-2">Upload Video</h1>
                    <div className="w-full">
                        <div className="text-xs sm:text-base border border-gray-600 rounded-md w-full md:w-2/3 p-2 sm:p-4">
                            <form action="#" className="w-full font-medium " onSubmit={(e) => uploadVideo(e)}>
                                <label htmlFor="">Video Title</label>
                                <br />
                                <input onChange={(e) => setVideoTitle(e.target.value)} value={videoTitle} required type="text" className="border w-full mb-2" />
                                <br />
                                <label htmlFor="">Video Url</label>
                                <br />
                                <input onChange={(e) => setVideoUrl(e.target.value)} value={videoUrl} required type="url" className="border w-full mb-2" />
                                <br />
                                <label htmlFor="">Thumbnail Url</label>
                                <br />
                                <input onChange={(e) => setThumbnailUrl(e.target.value)} value={thumbnailUrl} required type="url" className="border w-full mb-2" />
                                <br />
                                <label htmlFor="">Description</label>
                                <br />
                                <textarea onChange={(e) => setDescription(e.target.value)} value={description} name="" rows="20" className="p-1 border w-full leading-none" id=""></textarea>
                                <br />
                                <button type="submit" className="my-1 bg-gray-200 w-fit px-3 py-1 sm:text-base rounded-full">Upload</button>
                            </form>
                        </div>

                    </div>
                </> : ''}
                {manageVideo ? <>
                    <h1 className="text-xl font-semibold py-2 ">Manage Videos</h1>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">

                        {channelVideos.map(x => <ManageVideos key={x._id} data={x} del={deleteVideo} edit={editVideo} />)}


                    </div>
                </> : ''}
                {loading ? <div className="w-80 m-auto left-0 top-0 bottom-0 absolute rounded-lg right-0 bg-gray-100 border-gray-300 border-2 h-32">
                    <div className="flex flex-col gap-2 items-center h-full justify-center">
                        <span className="text-lg font-semibold">Updating...</span>
                        <img src="../loading.gif" className="mix-blend-darken" alt="" width="50" />
                    </div>
                </div> : ''}
            </div>
        </main> : <CreateChannel name={UserInfo.username}/>) :
            <main className="flex w-full pt-14 ">
                <div className="m-auto items-center gap-2 flex flex-col my-20">
                    <img width="250" src="https://cdn.weasyl.com/static/media/8e/dc/29/8edc294ae4385580797f906d4c15f2d1480f364d3997f6b5196285ffcc689a8b.png" alt="" />
                    <h1 className="text-xl text-center">This page isn't available. Sorry about that. <br />Please login before you access this page</h1>
                    <Link to='/'><button className="my-1 bg-black w-fit px-3 py-1 text-lg  text-white rounded-full">Home Page</button></Link>
                </div>
            </main>}

    </>)
}

export default Studio;