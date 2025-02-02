import {Link} from 'react-router-dom'
import { useState } from 'react';
function CreateChannel(props) {
    const { name } = props;
    const [createchannelmodel, setCreateChannelModel] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState('');
    const [profileUrl, setProfileUrl] = useState('');

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

    return (<>
        <main className="flex flex-col min-h-screen bg-gray-200 w-full pt-14 ">
            <div className={`w-full bg-white px-5 md:px-20 overflow-hidden relative`}>
                <h1 className="text-xl font-semibold py-2">Account</h1>
                <div className="flex items-center justify-between my-6">
                    <div className="flex items-center text-base md:text-2xl font-medium gap-4">
                        <img className="w-20 md:w-28" src="https://img.icons8.com/color/110/test-account.png" alt="" />
                        <span>{name}</span>
                    </div>
                    <Link to="/"><button className="bg-blue-700 h-fit text-xl text-white rounded-sm px-2 py-1">Home</button></Link>
                </div>
            </div>
            <div className="w-full border-t-2 border-gray-600 border-solid"></div>
            <div className="w-full pb-10 px-5 md:px-20 overflow-hidden relative">
                <div className="flex max-sm:flex-col-reverse max-sm:items-center justify-between pt-6">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl md:text-3xl font-medium">Choose how you appear and what you see on YouTube</h2>
                        <h3 className="text-xl mt-4 font-medium">Your Youtube Channel</h3>
                        <span className="max-md:text-sm">This is your public presence on YouTube. You need a channel to upload your videos, comment on videos, or create playlists</span>
                        <button onClick={()=>setCreateChannelModel(true)} className="bg-blue-700 w-fit h-fit text-xl text-white rounded-sm px-2 mt-3 py-1">Create Channel</button>
                    </div>

                    <img className="mix-blend-darken" width="260" src="https://i.pinimg.com/originals/b6/63/ea/b663ea6c3cf85dfb4df3348484972260.jpg" alt="" />
                </div>
            </div>

        </main>

        {createchannelmodel ? <div className="w-full z-[25] bg-transparent p-3 md:p-14 fixed h-screen top-0 left-0 right-0 ">
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
    </>)
}

export default CreateChannel;