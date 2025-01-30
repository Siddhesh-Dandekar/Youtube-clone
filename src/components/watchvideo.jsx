import Microvideo from "./microvideo";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Comment from "./comment";

function Watchvideo() {
    const params = useParams();
    const [videoData, setVideoData] = useState('');
    const [channelData, setChannelData] = useState('');
    const UserInfo = useSelector(item => item.credential.data[0]);
    const [sidevideos, setSideVideos] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [isChannel, setIsChannel] = useState(null);
    const [loading, setLoading] = useState(false);

    const [comments , setComments] = useState([]);
    const [commentText , setCommentText] = useState('');

    useEffect(() => {
        if(UserInfo && UserInfo.channelId){
            const fetchChannel = async () => {
                const channelInfo = await fetch(`http://localhost:5100/channel/${UserInfo.channelId}`).then(data => data.json());
                setIsChannel(channelInfo);
            }
            fetchChannel();
        }
    }, [UserInfo])

    useEffect(() => {
        const fetchVideos = async () => {
            const videosInfo = await fetch(`http://localhost:5100/video/${params.id}`).then(data => data.json());
            if (videosInfo) {
                setTimeout(() => {
                    fetch(`http://localhost:5100/views/${videosInfo._id}`)
                }, 2000)
                setVideoData(videosInfo);
                setLikeCount(videosInfo.likes);
                setDislikeCount(videosInfo.dislikes);
                setComments(videosInfo.comments);
            }
            const channelInfo = await fetch(`http://localhost:5100/channel/${videosInfo.channelId}`).then(data => data.json());
            if (channelInfo) {
                setChannelData(channelInfo);
            }
        }

        fetchVideos();
    }, [params,loading]);

    useEffect(() => {
        const fetchVideos = async () => {
            const videosInfo = await fetch(`http://localhost:5100/videos`).then(data => data.json());
            const filteredArr = videosInfo.filter(x => x._id !== videoData._id);
            setSideVideos(filteredArr);
        }

        fetchVideos();
    }, [channelData])

    async function handleLikes() {
        const accessToken = localStorage.getItem('key');
        if (accessToken && accessToken !== undefined) {
            const liked = await fetch(`http://localhost:5100/likes/${videoData._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${accessToken}`,
                }
            }).then(data => data.json());
            setLikeCount(liked.likes);
            setDislikeCount(liked.dislikes);
        }
    }
    async function handleDislikes() {
        const accessToken = localStorage.getItem('key');
        if (accessToken && accessToken !== undefined) {
            const liked = await fetch(`http://localhost:5100/dislikes/${videoData._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${accessToken}`,
                }
            }).then(data => data.json());
            setLikeCount(liked.likes);
            setDislikeCount(liked.dislikes);
        }
    }

    async function handleComment(){
        const accessToken = localStorage.getItem('key');
        if (accessToken && accessToken !== undefined) {
            const CommentInfo = await fetch(`http://localhost:5100/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${accessToken}`,
                },
                body: JSON.stringify({
                    videoid : videoData._id,
                    text : commentText
                })
            }).then(data => data.json());
            setComments(CommentInfo);
        }
        setCommentText('')
    }

    async function DeleteComment(id){
        setLoading(true);
        const accessToken = localStorage.getItem('key')
        try{
            const Deleted = await fetch('http://localhost:5100/comment/delete',{
                method: "DELETE",
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization" : `JWT ${accessToken}`
                },
                body: JSON.stringify({
                    commentId : id,
                    videoid : videoData._id
                })
            }).then(data => data.json())
            setLoading(false)
            
        }catch(err){
            console.log(err.message)
            setLoading(false)
        }
        
    }

    return (
        <>{videoData ? <div className="flex flex-col lg:flex-row w-full pt-14 p-2">
            <div className="w-full lg:w-5/6 mt-2 px-3 lg:px-0 lg:ml-6 lg:mr-2 flex flex-col gap-3">
                <div className="container">
                    <iframe className="rounded-xl responsive-iframe" src={`https://www.youtube.com/embed/${videoData.videoUrl.split('/')[3]}`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                </div>
                <h1 className="text-lg font-semibold">{videoData.title}</h1>
                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <img src={channelData.channelProfile} className="rounded-full" height="34" width="34" alt="" />
                        <Link to={`/channel/${videoData.channelId}`}><div className="leading-none">
                            <span className="font-semibold flex items-center text-sm gap-1">{channelData.channelName} <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                                <path d="M 12 2 C 6.4889941 2 2 6.4889982 2 12 C 2 17.511002 6.4889941 22 12 22 C 17.511006 22 22 17.511002 22 12 C 22 6.4889982 17.511006 2 12 2 z M 16 9 C 16.25575 9 16.511531 9.0974687 16.707031 9.2929688 C 17.098031 9.6839688 17.098031 10.316031 16.707031 10.707031 L 11.707031 15.707031 C 11.512031 15.902031 11.256 16 11 16 C 10.744 16 10.487969 15.902031 10.292969 15.707031 L 7.2929688 12.707031 C 6.9019687 12.316031 6.9019688 11.683969 7.2929688 11.292969 C 7.6839688 10.901969 8.3160313 10.901969 8.7070312 11.292969 L 11 13.585938 L 15.292969 9.2929688 C 15.488469 9.0974688 15.74425 9 16 9 z"></path>
                            </svg></span>
                            <span className="text-xs text-gray-600  font-normal">{channelData.subscribers} subscribers</span>
                        </div></Link>
                        {UserInfo._id == videoData.userId ? <Link className="flex" to={`/channel/${UserInfo.channelId}`}><button className="text-white text-sm font-medium bg-black px-4 rounded-3xl">View Channel</button></Link> : <button className="text-white text-sm font-medium bg-black px-4 rounded-3xl">Subscribe</button>}

                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center bg-slate-100 rounded-3xl text-sm font-medium">

                            <button onClick={handleLikes} className="flex rounded-s-3xl border-r px-1 pl-2 items-center bg-gray-100 hover:bg-gray-200 h-full">
                                <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/thumb-up.png" alt="facebook-like" />
                                <span>{likeCount}</span>
                            </button>

                            <button onClick={handleDislikes} className="flex rounded-e-3xl items-center px-1 pr-2 bg-gray-100 hover:bg-gray-200 h-full">
                                <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/thumbs-down.png" alt="thumbs-down" />
                                <span>{dislikeCount}</span>
                            </button>
                        </div>

                        <div className="flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                            <img width="24" height="24" className="mr-1" src="https://img.icons8.com/ios/24/forward-arrow.png" alt="forward-arrow" />
                            <span>Share</span>
                        </div>
                        <div className="hidden xl:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                            <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/download--v1.png" alt="download--v1" />
                            <span>Download</span>
                        </div>
                        <div className="hidden xl:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                            <img width="20" height="20" className="mr-1" src="https://img.icons8.com/forma-light-filled/20/cut.png" alt="cut" />
                            <span>Clip</span>
                        </div>
                        <div className="flex items-center bg-gray-100 hover:bg-gray-200 px-2 rounded-full">
                            <span>⦁⦁⦁</span>
                        </div>

                    </div>
                </div>
                <div className=" rounded-xl bg-gray-100">
                    <div className="py-2 text-sm px-3">
                        <h1 className="text-sm font-semibold">{videoData.views} views</h1>
                        <p> {videoData.description}
                            <br />
                            <br />
                            Provided to YouTube by Ditto Music

                            Piya Tose · Shouweick Dey

                            Piya Tose

                            ℗ Melodywala

                            Released on: 2020-09-20

                            Auto-generated by YouTube.
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex gap-2 items-center">
                        <span className="text-lg mr-5 font-bold">2,156 Comments</span>
                        <img width="20" height="20" src="https://img.icons8.com/metro/20/sorting-answers.png" alt="sorting-answers" />
                        <span className="font-medium">Sort by</span>
                    </div>

                    
                    {UserInfo.validuser ? isChannel ? <div className="flex my-5">
                        <img className="rounded-full mr-5" width='42' height="42" src={isChannel.channelProfile} alt="" />
                        <div className="w-full comment-section flex flex-col gap-2">
                            <input onChange={(e) => setCommentText(e.target.value)} type="text" placeholder="Add a comment..." value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                            <div className="flex gap-4 text-sm justify-end font-medium ">
                                <button>Cancel</button>
                                <button onClick={handleComment} disabled={commentText ? false : true} className={`rounded-full px-4  py-2 ${commentText ? "bg-blue-700 text-white" : 'bg-gray-100'}`}>Comment</button>
                            </div>
                        </div>
                    </div> : <div className="flex my-5">
                    <img className="rounded-full mr-5" width='42' height="42" src="https://img.icons8.com/color/32/test-account.png" alt="" />
                    <div className="w-full comment-section flex flex-col gap-2">
                        <input type="text" placeholder="Add a comment..." readOnly  value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                        <div className="flex gap-4 text-sm justify-end items-center font-medium ">
                            <span className="text-base">Create channel to continue ➞</span>
                            <Link><button  className="rounded-full px-4  py-2 bg-blue-700 text-white" >Create Channel</button></Link>
                        </div>
                    </div>
                </div> : <div className="flex my-5">
                    <img className="rounded-full mr-5" width='42' height="42" src="https://img.icons8.com/color/32/test-account.png" alt="" />
                    <div className="w-full comment-section flex flex-col gap-2">
                        <input type="text" placeholder="Add a comment..." readOnly  value={commentText} className="border-b pb-1 border-gray-600 min-w-full" />
                        <div className="flex gap-4 text-sm justify-end items-center font-medium ">
                            <span className="text-base">Sign in to continue ➞</span>
                            <Link to='/login'><button  className="rounded-full px-4  py-2 bg-blue-700 text-white" >Sign in</button></Link>
                        </div>
                    </div>
                </div> }
                    
                    {comments.map(x => <Comment key={x._id} data={x} fun={DeleteComment}/> )}
                </div> 
                
            </div>

            <div className="min-w-fit">
                <div className="overflow-hidden mx-2 px-2 h-12 flex items-center">
                    <ul className="flex gap-2 text-sm">
                        <li className="bg-black text-white font-medium w-max px-2 py-1 rounded-md">All</li>
                        <li className="bg-gray-100 font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md">For you</li>
                    </ul>
                </div>
                <div className="mx-2 px-2 flex flex-col gap-3">
                    {sidevideos.map(x => <Microvideo key={x._id} data={x} />)}
                </div>
            </div>
        </div> : ""}

        </>
    )
}
export default Watchvideo;