import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ChannelVideos from "./channel.video";
import { apiFetch } from "../utils/api";
import { compactNumber } from "../utils/format";

const tabs = ['Home', 'Videos', 'Shorts', 'Live', 'Playlists', 'Community'];

function Channel() {
    const params = useParams();
    const channelId = params.id;
    const UserInfo = useSelector(item => item.credential.data[0]);
    const [channelDetails, setChannelDetails] = useState(null);
    const [channelVideos, setChannelVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('Home');
    const [subscribed, setSubscribed] = useState(false);
    const [errorFound, setErrorFound] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let active = true;
        async function ChannelFetch() {
            try {
                const [channelInfo, videos] = await Promise.all([
                    apiFetch(`/channel/${channelId}`),
                    apiFetch(`/channel/${channelId}/videos`)
                ]);
                if (!active) return;
                setChannelDetails(channelInfo);
                setChannelVideos(videos);
            } catch (err) {
                if (active) {
                    setErrorFound(true);
                    setMessage(err.message);
                }
            }
        }
        ChannelFetch();
        return () => {
            active = false;
        };
    }, [channelId]);

    useEffect(() => {
        let active = true;
        async function fetchSubscription() {
            if (!UserInfo.validuser || !channelId || UserInfo._id === channelDetails?.userId) return;
            try {
                const status = await apiFetch(`/channel/${channelId}/subscription`, { auth: true });
                if (active) {
                    setSubscribed(status.subscribed);
                    setChannelDetails(prev => prev ? { ...prev, subscribers: status.subscribers } : prev);
                }
            } catch {
                if (active) setSubscribed(false);
            }
        }
        fetchSubscription();
        return () => {
            active = false;
        };
    }, [UserInfo.validuser, UserInfo._id, channelId, channelDetails?.userId]);

    const filteredVideos = useMemo(() => {
        if (activeTab === 'Shorts') {
            return channelVideos.filter(video => `${video.title} ${video.description}`.toLowerCase().includes('short'));
        }
        return channelVideos;
    }, [activeTab, channelVideos]);

    async function handleSubscribe() {
        if (!UserInfo.validuser) {
            setMessage('Sign in to subscribe.');
            return;
        }
        try {
            const result = await apiFetch(`/channel/${channelId}/subscribe`, { method: 'POST', auth: true });
            setSubscribed(result.subscribed);
            setChannelDetails(prev => ({ ...prev, subscribers: result.subscribers }));
        } catch (err) {
            setMessage(err.message);
        }
    }

    if (errorFound) {
        return <main className="flex w-full pt-14">
            <div className="m-auto items-center gap-2 flex flex-col my-20">
                <img width="250" src="https://cdn.weasyl.com/static/media/8e/dc/29/8edc294ae4385580797f906d4c15f2d1480f364d3997f6b5196285ffcc689a8b.png" alt="Unavailable channel" />
                <h1 className="text-xl text-center">This page isn't available. Sorry about that.<br />Please try searching something else.</h1>
                <p className="text-sm text-gray-500">{message}</p>
                <Link to='/'><button className="my-1 bg-black w-fit px-3 py-1 text-lg text-white rounded-full">Home Page</button></Link>
            </div>
        </main>;
    }

    if (!channelDetails) {
        return <main className="pt-20 px-8"><div className="h-40 animate-pulse rounded-xl bg-gray-200" /></main>;
    }

    const ownChannel = channelDetails.userId === UserInfo._id;

    return (
        <div className="w-full gap-4 flex flex-col px-4 md:px-8 pt-14">
            {message ? <div className="fixed right-4 top-16 z-30 rounded-md border bg-white p-3 text-sm shadow">{message}</div> : null}
            <div className="w-full mt-2">
                <img className="w-full rounded-2xl min-h-36 sm:min-h-48 max-h-40" src={channelDetails.channelBanner} alt={`${channelDetails.channelName} banner`} />
            </div>
            <div className="flex w-full gap-2">
                <div className="flex min-w-fit">
                    <img className="rounded-full h-fit w-32 sm:w-40" src={channelDetails.channelProfile} alt={`${channelDetails.channelName} avatar`} />
                </div>
                <div className="flex flex-col justify-center gap-1 sm:gap-3 ml-2">
                    <h1 className="text-lg sm:text-2xl md:text-4xl font-semibold dark:text-white">{channelDetails.channelName}{channelDetails.verified ? <span className="ml-2 text-xs align-middle text-gray-500 dark:text-neutral-400" title="Verified">✓</span> : null}</h1>
                    <h2 className="text-xs font-medium">@{channelDetails.channelName.toLowerCase().split(' ')[0]} <span className="text-gray-500">· {compactNumber(channelDetails.subscribers)} subscribers · {channelVideos.length} videos</span></h2>
                    <span className="text-[0.6rem] sm:text-xs text-gray-600">{channelDetails.description || 'More about this channel'}</span>
                    {ownChannel ? (
                        <Link to="/channel/studio"><button className="w-fit bg-gray-200 font-semibold text-xs sm:text-sm py-2 px-2 sm:px-4 rounded-full">Customize Channel</button></Link>
                    ) : (
                        <button onClick={handleSubscribe} className={`w-fit text-xs sm:text-sm font-medium py-2 px-4 rounded-full ${subscribed ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                            {subscribed ? 'Subscribed' : 'Subscribe'}
                        </button>
                    )}
                </div>
            </div>
            <div className="list-none overflow-hidden font-medium text-gray-600 flex gap-4 mt-2" role="tablist" aria-label="Channel sections">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`hover:text-black dark:hover:text-white border-b-2 py-2 ${activeTab === tab ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent'}`}
                        role="tab"
                        aria-selected={activeTab === tab}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className="w-full border-t-2 border-gray-200 dark:border-neutral-800 border-solid" />
            {['Live', 'Playlists', 'Community'].includes(activeTab) ? (
                <div className="py-16 text-center text-gray-500">
                    <h2 className="text-lg font-semibold text-gray-700">{activeTab}</h2>
                    <p className="text-sm">This channel has no {activeTab.toLowerCase()} posts yet.</p>
                </div>
            ) : (
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                    {filteredVideos.map(x => <ChannelVideos key={x._id} data={x} />)}
                </div>
            )}
            {!['Live', 'Playlists', 'Community'].includes(activeTab) && filteredVideos.length === 0 ? (
                <div className="py-16 text-center text-gray-500">No videos in this section yet.</div>
            ) : null}
        </div>
    );
}

export default Channel;
