import Microvideo from "./microvideo";
import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "./comment";
import { apiFetch, getRecommendations } from "../utils/api";
import { compactNumber, relativeDate, youtubeEmbedUrl } from "../utils/format";

function Watchvideo() {
    const params = useParams();
    const [videoData, setVideoData] = useState(null);
    const [sidevideos, setSideVideos] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [isChannel, setIsChannel] = useState(null);
    const [subscribed, setSubscribed] = useState(false);
    const [subscriberCount, setSubscriberCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorFound, setErrorFound] = useState(false);
    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [sort, setSort] = useState('newest');
    const UserInfo = useSelector(item => item.credential.data[0]);

    const channelData = videoData?.channel || {};
    const sortedComments = useMemo(() => {
        const list = [...comments];
        if (sort === 'top') {
            return list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        }
        return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }, [comments, sort]);

    useEffect(() => {
        let active = true;
        async function fetchCurrentUserChannel() {
            if (!UserInfo?.channelId) {
                setIsChannel(null);
                return;
            }
            try {
                const channelInfo = await apiFetch(`/channel/${UserInfo.channelId}`);
                if (active) setIsChannel(channelInfo);
            } catch {
                if (active) setIsChannel(null);
            }
        }
        fetchCurrentUserChannel();
        return () => {
            active = false;
        };
    }, [UserInfo?.channelId]);

    useEffect(() => {
        let active = true;
        async function fetchVideo() {
            try {
                setErrorFound(false);
                const videosInfo = await apiFetch(`/video/${params.id}`);
                if (!active) return;
                setVideoData(videosInfo);
                setLikeCount(videosInfo.likes || 0);
                setDislikeCount(videosInfo.dislikes || 0);
                setComments(videosInfo.comments || []);
                setSubscriberCount(videosInfo.channel?.subscribers || 0);
                setTimeout(() => {
                    apiFetch(`/views/${videosInfo._id}`, { method: 'POST' }).catch(() => {});
                    if (UserInfo?.validuser) {
                        apiFetch(`/history/${videosInfo._id}`, { method: 'POST', auth: true }).catch(() => {});
                    }
                }, 2000);
            } catch {
                if (active) setErrorFound(true);
            }
        }
        fetchVideo();
        return () => {
            active = false;
        };
    }, [params.id, UserInfo?.validuser]);

    useEffect(() => {
        let active = true;
        async function fetchSideVideos() {
            try {
                const response = await getRecommendations(videoData?._id);
                if (active) setSideVideos(response.items || []);
            } catch {
                if (active) setSideVideos([]);
            }
        }
        if (videoData?._id) fetchSideVideos();
        return () => {
            active = false;
        };
    }, [videoData?._id]);

    useEffect(() => {
        let active = true;
        async function fetchSubscription() {
            if (!UserInfo?.validuser || !videoData?.channelId || UserInfo._id === videoData.userId) return;
            try {
                const status = await apiFetch(`/channel/${videoData.channelId}/subscription`, { auth: true });
                if (active) {
                    setSubscribed(status.subscribed);
                    setSubscriberCount(status.subscribers);
                }
            } catch {
                if (active) setSubscribed(false);
            }
        }
        fetchSubscription();
        return () => {
            active = false;
        };
    }, [UserInfo?.validuser, UserInfo?._id, videoData?.channelId, videoData?.userId]);

    async function handleLikes() {
        if (!UserInfo.validuser) return;
        try {
            const liked = await apiFetch(`/likes/${videoData._id}`, { method: "POST", auth: true });
            setLikeCount(liked.likes);
            setDislikeCount(liked.dislikes);
        } catch (err) {
            setMessage(err.message);
        }
    }

    async function handleDislikes() {
        if (!UserInfo.validuser) return;
        try {
            const liked = await apiFetch(`/dislikes/${videoData._id}`, { method: "POST", auth: true });
            setLikeCount(liked.likes);
            setDislikeCount(liked.dislikes);
        } catch (err) {
            setMessage(err.message);
        }
    }

    async function handleSubscribe() {
        if (!UserInfo.validuser) {
            setMessage('Sign in to subscribe.');
            return;
        }
        try {
            const result = await apiFetch(`/channel/${videoData.channelId}/subscribe`, { method: 'POST', auth: true });
            setSubscribed(result.subscribed);
            setSubscriberCount(result.subscribers);
        } catch (err) {
            setMessage(err.message);
        }
    }

    async function handleComment() {
        if (!commentText.trim()) return;
        try {
            const CommentInfo = await apiFetch('/comment', {
                method: "POST",
                auth: true,
                body: {
                    videoid: videoData._id,
                    text: commentText
                }
            });
            setComments(CommentInfo);
            setCommentText('');
        } catch (err) {
            setMessage(err.message);
        }
    }

    async function DeleteComment(id) {
        setLoading(true);
        try {
            const deleted = await apiFetch('/comment/delete', {
                method: "DELETE",
                auth: true,
                body: {
                    commentId: id,
                    videoid: videoData._id
                }
            });
            setComments(deleted);
        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleWatchLater() {
        if (!UserInfo.validuser) {
            setMessage('Sign in to save videos.');
            return;
        }
        try {
            const result = await apiFetch(`/watch-later/${videoData._id}`, { method: 'POST', auth: true });
            setMessage(result.saved ? 'Saved to Watch later.' : 'Removed from Watch later.');
        } catch (err) {
            setMessage(err.message);
        }
    }

    async function handleShare() {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: videoData.title, url });
            } else {
                await navigator.clipboard.writeText(url);
                setMessage('Link copied.');
            }
        } catch {
            setMessage('Unable to share right now.');
        }
    }

    if (errorFound) {
        return <main className="flex w-full pt-14">
            <div className="m-auto items-center gap-2 flex flex-col my-20">
                <img width="250" src="https://cdn.weasyl.com/static/media/8e/dc/29/8edc294ae4385580797f906d4c15f2d1480f364d3997f6b5196285ffcc689a8b.png" alt="Unavailable page" />
                <h1 className="text-xl text-center">This page isn't available. Sorry about that.<br />Please try searching something else.</h1>
                <Link to='/'><button className="my-1 bg-black w-fit px-3 py-1 text-lg text-white rounded-full">Home Page</button></Link>
            </div>
        </main>;
    }

    if (!videoData) {
        return <main className="pt-20 px-6"><div className="aspect-video w-full animate-pulse rounded-xl bg-gray-200" /></main>;
    }

    return (
        <>
            {message ? <div className="fixed right-4 top-16 z-30 rounded-md border border-gray-200 bg-white p-3 text-sm shadow">{message}</div> : null}
            <div className="flex flex-col lg:flex-row w-full pt-14 p-2">
                <div className={`w-full lg:w-5/6 mt-2 px-1 sm:px-3 lg:px-0 lg:ml-6 lg:mr-2 flex flex-col gap-3 ${loading ? 'pointer-events-none opacity-70' : ''}`}>
                    <div className="container">
                        <iframe
                            title={videoData.title}
                            className="rounded-xl responsive-iframe"
                            src={`${youtubeEmbedUrl(videoData.videoUrl)}?autoplay=1`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                    <h1 className="text-lg font-semibold dark:text-white">{videoData.title}</h1>
                    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                        <div className="flex gap-2 items-center sm:gap-4">
                            <img src={channelData.channelProfile} className="rounded-full" height="34" width="34" alt={`${channelData.channelName} avatar`} />
                            <Link to={`/channel/${videoData.channelId}`}>
                                <div className="leading-none">
                                    <span className="font-semibold items-center flex text-xs sm:text-sm gap-1">{channelData.channelName}</span>
                                    <span className="text-xs text-gray-600 font-normal">{compactNumber(subscriberCount)} subscribers</span>
                                </div>
                            </Link>
                            {UserInfo._id === videoData.userId ? (
                                <Link className="flex" to={`/channel/${UserInfo.channelId}`}>
                                    <button className="text-white text-xs sm:text-sm font-medium bg-black p-2 max-h-fit sm:px-4 rounded-3xl">View Channel</button>
                                </Link>
                            ) : (
                                <button onClick={handleSubscribe} className={`text-xs sm:text-sm font-medium p-2 max-h-fit sm:px-4 rounded-3xl ${subscribed ? 'bg-gray-200 text-black hover:bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}>
                                    {subscribed ? 'Subscribed' : 'Subscribe'}
                                </button>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-2 min-w-fit">
                            <div className="flex items-center bg-slate-100 dark:bg-neutral-800 rounded-3xl text-sm font-medium">
                                <button onClick={handleLikes} disabled={!UserInfo.validuser} className="flex rounded-s-3xl border-r border-gray-300 dark:border-neutral-700 px-2 items-center bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white h-full disabled:opacity-50">
                                    <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/thumb-up.png" alt="" />
                                    <span>{compactNumber(likeCount)}</span>
                                </button>
                                <button onClick={handleDislikes} disabled={!UserInfo.validuser} className="flex rounded-e-3xl items-center px-2 bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white h-full disabled:opacity-50">
                                    <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/thumbs-down.png" alt="" />
                                    <span>{compactNumber(dislikeCount)}</span>
                                </button>
                            </div>
                            <button onClick={handleShare} className="sm:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white px-3 rounded-3xl">Share</button>
                            <a href={videoData.videoUrl} target="_blank" rel="noreferrer" className="hidden xl:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white px-3 rounded-3xl">Open</a>
                            <button onClick={handleWatchLater} className="flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white px-3 py-2 rounded-3xl">Watch later</button>
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-100 dark:bg-neutral-800 dark:text-white">
                        <div className="py-2 text-sm px-3">
                            <h2 className="text-sm font-semibold">{compactNumber(videoData.views)} views · {relativeDate(videoData.uploadDate)}</h2>
                            <p>{videoData.description}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-2 items-center">
                            <span className="text-lg mr-5 font-bold dark:text-white">{comments.length} Comments</span>
                            <label className="text-sm font-medium dark:text-white" htmlFor="comment-sort">Sort by</label>
                            <select id="comment-sort" value={sort} onChange={event => setSort(event.target.value)} className="rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white px-2 py-1 text-sm">
                                <option value="newest">Newest</option>
                                <option value="top">Top</option>
                            </select>
                        </div>

                        {UserInfo.validuser ? isChannel ? (
                            <div className="flex my-5">
                                <img className="rounded-full mr-5" width='42' height="42" src={isChannel.channelProfile} alt={`${isChannel.channelName} avatar`} />
                                <div className="w-full comment-section flex flex-col gap-2">
                                    <input onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Add a comment..." value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                                    <div className="flex gap-4 text-sm justify-end font-medium">
                                        <button onClick={() => setCommentText('')}>Cancel</button>
                                        <button onClick={handleComment} disabled={!commentText.trim()} className={`rounded-full px-4 py-2 ${commentText.trim() ? "bg-blue-700 text-white" : 'bg-gray-100'}`}>Comment</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex my-5">
                                <img className="rounded-full mr-5" width='42' height="42" src="https://img.icons8.com/color/32/test-account.png" alt="Default user" />
                                <div className="w-full comment-section flex flex-col gap-2">
                                    <input type="text" placeholder="Add a comment..." readOnly value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                                    <div className="flex gap-4 text-sm justify-end items-center font-medium">
                                        <span className="text-base">Create channel to continue</span>
                                        <Link to="/channel/studio"><button className="rounded-full px-4 py-2 bg-blue-700 text-white">Create Channel</button></Link>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex my-5">
                                <img className="rounded-full mr-5" width='42' height="42" src="https://img.icons8.com/color/32/test-account.png" alt="Default user" />
                                <div className="w-full comment-section flex flex-col gap-2">
                                    <input type="text" placeholder="Add a comment..." readOnly value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                                    <div className="flex gap-4 text-sm justify-end items-center font-medium">
                                        <span className="text-base">Sign in to continue</span>
                                        <Link to='/login'><button className="rounded-full px-4 py-2 bg-blue-700 text-white">Sign in</button></Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {sortedComments.map(x => (
                            <Comment
                                key={x._id}
                                data={x}
                                videoid={videoData._id}
                                fun={DeleteComment}
                                onMessage={setMessage}
                                onRefresh={setComments}
                            />
                        ))}
                    </div>
                </div>

                <aside className="min-w-fit">
                    <div className="overflow-hidden mx-2 px-2 h-12 flex items-center">
                        <ul className="flex gap-2 text-sm">
                            <li className="bg-black text-white font-medium w-max px-2 py-1 rounded-md">All</li>
                            <li className="bg-gray-100 font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md">For you</li>
                        </ul>
                    </div>
                    <div className="mx-2 px-2 flex flex-col gap-3">
                        {sidevideos.map(x => <Microvideo key={x._id} data={x} />)}
                    </div>
                </aside>
            </div>
        </>
    );
}

export default Watchvideo;
