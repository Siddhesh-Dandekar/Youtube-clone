import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideos from "./channel.video";

function Channel() {
    const params = useParams();
    const channelId = params.id;
    const UserInfo = useSelector(item => item.credential.data[0]);
    const [channelDetails, setChannelDetails] = useState('');
    const [channelVideos, setChannelVideos] = useState([]);

    const [errorFound , setErrorFound] = useState(false);
    useEffect(() => {
        const ChannelFetch = async () => {
            try {
                const response = await fetch(`http://localhost:5100/channel/${channelId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const channelInfo = await response.json();
                setChannelDetails(channelInfo);
                const updatedVideos = [];
                for (let x of channelInfo.videos) {
                    try {
                        const videoData = await fetch(`http://localhost:5100/video/${x}`).then(data => data.json())
                        updatedVideos.push(videoData);
                    }
                    catch (err) {

                    }
                }
                setChannelVideos(updatedVideos);

            } catch (err) {
                setErrorFound(true)
                console.log(err.message);
            }

        }
        ChannelFetch();
    }, [channelId]);

    // async function fetchchannelVideo(videoid) {
    //     try {
    //         const videoData = await fetch(`http://localhost:5100/video/${videoid}`).then(data => data.json())
    //         channelVideos.push(videoData);
    //         console.log(channelVideos)
    //         setChannelVideos(channelVideos);
    //     }
    //     catch (err) {
    //         return console.log(err.message)
    //     }
    // }


    return (<> {channelDetails ? <div className="w-full gap-4 flex flex-col px-4 md:px-8 pt-14">
        <div className="w-full mt-2">
            <img className="w-full rounded-2xl min-h-36 sm:min-h-48 max-h-40" src={channelDetails.channelBanner} alt="" />
        </div>
        <div className="flex w-full gap-2">
            <div>
                <img className="rounded-full w-32 sm:w-40" src={channelDetails.channelProfile} alt="" />
            </div>
            <div className="flex flex-col justify-center gap-1 sm:gap-3 ml-2">
                <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold" >{channelDetails.channelName}</h1>
                <h2 className="text-xs font-medium">@{channelDetails.channelName.toLowerCase().split(' ')[0]} <span className="text-gray-500">• {channelDetails.subscribers} subscribers • {channelDetails.videos.length} videos</span> </h2>
                <span className=" text-xs text-gray-600">More about this channel
                    ...more</span>
                {channelDetails.userId == UserInfo._id ? <Link to="/channel/studio"><button className="w-fit bg-gray-200 font-semibold text-xs sm:text-sm py-2 sm:py-2 px-2  sm:px-4 rounded-full">Customize Channel</button></Link> : <button className="w-fit bg-black text-xs sm:text-sm text-white py-2 px-4 rounded-full">Subscribe</button>}

            </div>
        </div>
        <div className="list-none overflow-hidden font-medium text-gray-600 flex gap-4 mt-2">
            <li className="hover:text-black">Home</li>
            <li className="hover:text-black">Videos</li>
            <li className="hover:text-black">Shorts</li>
            <li className="hover:text-black">Live</li>
            <li className="hover:text-black">Playlists</li>
            <li className="hover:text-black">Community</li>
        </div>
        <div className="w-full border-t-2 border-gray-200 border-solid"></div>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">

            {channelVideos.map(x => <ChannelVideos key={x._id} data={x} />)}


        </div>
    </div> : '' }

    {errorFound ? <main className="flex w-full pt-14 ">
        <div className="m-auto items-center gap-2 flex flex-col my-20">
            <img width="250" src="https://cdn.weasyl.com/static/media/8e/dc/29/8edc294ae4385580797f906d4c15f2d1480f364d3997f6b5196285ffcc689a8b.png" alt="" />
            <h1 className="text-xl text-center">This page isn't available. Sorry about that. <br />Please try searching something else.</h1>
            <Link to='/'><button className="my-1 bg-black w-fit px-3 py-1 text-lg  text-white rounded-full">Home Page</button></Link>
        </div>
    </main>: ''}

    </>)
}
export default Channel;