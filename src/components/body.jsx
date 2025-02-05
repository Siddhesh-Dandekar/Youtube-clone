import Content from "./content";
import { useSelector } from "react-redux";
import { useState, useEffect} from 'react'

function Body() {
    const visiblestatus = useSelector(x => x.sidebar);
    const [videoData, setVideoData] = useState([]);
    const [filteredData , setFilteredData] = useState([]);
    const [category, setCategory] = useState(null);
    const searchInfo = useSelector(x => x.search.data);

    //Used to Fetch Videos At Page Reloading
    useEffect(() => {
        const fetchVideos = async () => {
            const videosInfo = await fetch('http://localhost:5100/videos').then(data => data.json());
            if(videosInfo){
                setVideoData(videosInfo);
                setFilteredData(videosInfo);
            }
        }
        fetchVideos();
    },[]);

    //To show user Searched Results
    useEffect(() => {
        if (searchInfo) {
            const filtered = videoData.filter(x => x.title.toLowerCase().includes(searchInfo.toLowerCase()));
            setFilteredData(filtered);
        } else {
            setFilteredData(videoData);
        }
    }, [searchInfo, videoData]);

    //To show user filtered Results
    useEffect(() => {
        if (category) {
            const filtered = videoData.filter(x => x.title.toLowerCase().includes(category.toLowerCase()) || x.description.toLowerCase().includes(category.toLowerCase()));
            setFilteredData(filtered);
            console.log(filtered);
        } else {
            setFilteredData(videoData);
        }
    }, [category, videoData]);
    
    

    return (
        <>
            <main className="flex w-full pt-14 ">
                {visiblestatus.visible ? <div className="w-56 fixed bg-white h-screen z-10  flex text-[0.8rem] flex-col px-4 pt-2 list-none">
                    <div className="h-10 px-2 flex items-center rounded-lg bg-gray-100 hover:bg-gray-200">
                        <svg className="mr-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                        </svg>
                        <h2 className=" font-medium flex-grow">Home</h2>
                    </div>
                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <svg className="mr-5" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M 15.886719 1 C 14.974131 1 14.077693 1.2286385 13.287109 1.65625 L 5.5664062 5.7207031 L 5.5664062 5.71875 C 3.7637541 6.6652034 2.6367187 8.5322799 2.6367188 10.566406 C 2.6367188 11.911504 3.2225585 13.082394 4.046875 14.046875 C 3.2161002 15.0216 2.6367187 16.195885 2.6367188 17.521484 C 2.6367188 20.532674 5.1018215 23 8.1132812 23 C 9.0303925 23 9.9287625 22.773103 10.716797 22.341797 L 18.292969 18.353516 L 18.259766 18.369141 C 20.151702 17.459981 21.363281 15.531898 21.363281 13.433594 C 21.363281 12.088496 20.777441 10.917606 19.953125 9.953125 C 20.783897 8.9783946 21.363281 7.8041153 21.363281 6.4785156 C 21.363281 3.4673258 18.898179 1 15.886719 1 z M 15.886719 3 C 17.813259 3 19.363281 4.5517054 19.363281 6.4785156 C 19.363281 7.5499776 18.888956 8.5222239 18.080078 9.1777344 L 17.121094 9.9550781 L 18.080078 10.732422 C 18.871608 11.373406 19.363281 12.344494 19.363281 13.433594 C 19.363281 14.75529 18.584642 15.993566 17.392578 16.566406 L 17.376953 16.574219 L 9.7636719 20.583984 L 9.7578125 20.587891 C 9.2778524 20.850605 8.6961702 21 8.1132812 21 C 6.1867412 21 4.6367188 19.448295 4.6367188 17.521484 C 4.6367188 16.450022 5.1110438 15.477776 5.9199219 14.822266 L 6.8789062 14.044922 L 5.9199219 13.267578 C 5.1283915 12.626594 4.6367188 11.655506 4.6367188 10.566406 C 4.6367188 9.266533 5.3427459 8.095781 6.4960938 7.4902344 L 6.4980469 7.4902344 L 14.232422 3.4179688 L 14.238281 3.4140625 C 14.729251 3.1482632 15.309951 3 15.886719 3 z M 10 9 L 10 15 L 15 12 L 10 9 z"></path>
                        </svg>
                        <h2 className=" font-medium flex-grow">Shorts</h2>
                    </div>
                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/video-playlist.png" className="mr-5" alt="video-playlist" />
                        <h2 className=" font-medium flex-grow">Subscriptions</h2>
                    </div>

                    <div className="w-full my-2 border-t-2 border-gray-200 border-solid"></div>


                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-200">
                        <h2 className="text-base font-medium mr-2">You</h2>
                        <img width="16" height="16" src="https://img.icons8.com/small/16/forward.png" alt="forward" />
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" src="https://img.icons8.com/material-sharp/24/time-machine.png" className="mr-5" alt="time-machine" />
                        <h2 className=" font-medium flex-grow">History</h2>
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" className="mr-5" src="https://img.icons8.com/material/24/playlist.png" alt="playlist" />
                        <h2 className=" font-medium flex-grow">Playlists</h2>
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" className="mr-5" src="https://img.icons8.com/material-outlined/24/video.png" alt="youtube-play" />
                        <h2 className=" font-medium flex-grow">Your videos</h2>
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" className="mr-5" src="https://img.icons8.com/material-outlined/24/clock--v1.png" alt="clock--v1" />
                        <h2 className=" font-medium flex-grow">Watch later</h2>
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" className="mr-5" src="https://img.icons8.com/external-tal-revivo-regular-tal-revivo/24/external-like-thumbs-up-button-from-popular-social-media-logo-regular-tal-revivo.png" alt="thumb-up" />
                        <h2 className=" font-medium flex-grow">Liked videos</h2>
                    </div>

                    <div className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" className="mr-5" src="https://img.icons8.com/forma-light-filled/24/cut.png" alt="cut" />
                        <h2 className=" font-medium flex-grow">Your clips</h2>
                    </div>

                    <div className="w-full my-2 border-t-2 border-gray-200 border-solid"></div>
                </div> : <div className="w-20 gap-5 fixed bg-white flex text-[0.6rem] flex-col items-center pt-2 list-none">
                    <div className=" px-2 gap-1 flex flex-col items-center rounded-lg ">
                        <svg className="" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z"></path>
                        </svg>
                        <h2 className=" font-medium">Home</h2>
                    </div>
                    
                    <div className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M 15.886719 1 C 14.974131 1 14.077693 1.2286385 13.287109 1.65625 L 5.5664062 5.7207031 L 5.5664062 5.71875 C 3.7637541 6.6652034 2.6367187 8.5322799 2.6367188 10.566406 C 2.6367188 11.911504 3.2225585 13.082394 4.046875 14.046875 C 3.2161002 15.0216 2.6367187 16.195885 2.6367188 17.521484 C 2.6367188 20.532674 5.1018215 23 8.1132812 23 C 9.0303925 23 9.9287625 22.773103 10.716797 22.341797 L 18.292969 18.353516 L 18.259766 18.369141 C 20.151702 17.459981 21.363281 15.531898 21.363281 13.433594 C 21.363281 12.088496 20.777441 10.917606 19.953125 9.953125 C 20.783897 8.9783946 21.363281 7.8041153 21.363281 6.4785156 C 21.363281 3.4673258 18.898179 1 15.886719 1 z M 15.886719 3 C 17.813259 3 19.363281 4.5517054 19.363281 6.4785156 C 19.363281 7.5499776 18.888956 8.5222239 18.080078 9.1777344 L 17.121094 9.9550781 L 18.080078 10.732422 C 18.871608 11.373406 19.363281 12.344494 19.363281 13.433594 C 19.363281 14.75529 18.584642 15.993566 17.392578 16.566406 L 17.376953 16.574219 L 9.7636719 20.583984 L 9.7578125 20.587891 C 9.2778524 20.850605 8.6961702 21 8.1132812 21 C 6.1867412 21 4.6367188 19.448295 4.6367188 17.521484 C 4.6367188 16.450022 5.1110438 15.477776 5.9199219 14.822266 L 6.8789062 14.044922 L 5.9199219 13.267578 C 5.1283915 12.626594 4.6367188 11.655506 4.6367188 10.566406 C 4.6367188 9.266533 5.3427459 8.095781 6.4960938 7.4902344 L 6.4980469 7.4902344 L 14.232422 3.4179688 L 14.238281 3.4140625 C 14.729251 3.1482632 15.309951 3 15.886719 3 z M 10 9 L 10 15 L 15 12 L 10 9 z"></path>
                        </svg>
                        <h2 className=" font-medium flex-grow">Shorts</h2>
                    </div>
                    <div className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-100">
                        <img width="20" height="20" src="https://img.icons8.com/material-outlined/24/video-playlist.png" alt="video-playlist" />
                        <h2 className=" font-medium flex-grow">Subscriptions</h2>
                    </div>

                    <div className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-200">
                    <img width="20" height="20" src="https://img.icons8.com/small/20/user-male-circle.png" alt="user-male-circle"/>
                        <h2 className="font-medium flex-grow">You</h2>
                    </div>
                </div>}


                <div  className={`${visiblestatus.visible ? 'w-full mx-2 ml-20 xl:ml-56 overflow-hidden' : 'w-full mx-2 ml-20 overflow-hidden'}`}>
                    <div className="overflow-hidden fixed bg-white w-screen mx-2 h-12 flex items-center z-[2]">
                        <ul className="flex gap-2 text-sm select-none">
                            <li onClick={() => setCategory(null)} className={category == null ? "bg-black text-white cursor-pointer font-medium w-max px-2 py-1 rounded-md" : "bg-gray-100 cursor-pointer font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md"}>All</li>
                            <li onClick={() => setCategory("Music")} className={category == "Music" ? "bg-black text-white cursor-pointer font-medium w-max px-2 py-1 rounded-md" : "bg-gray-100 cursor-pointer font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md"}>Music</li>
                            <li onClick={() => setCategory("Vlog")} className={category == "Vlog" ? "bg-black text-white cursor-pointer font-medium w-max px-2 py-1 rounded-md" : "bg-gray-100 cursor-pointer font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md"}>Vlog</li>
                            <li onClick={() => setCategory("recipe")} className={category == "Food" ? "bg-black text-white cursor-pointer font-medium w-max px-2 py-1 rounded-md" : "bg-gray-100 cursor-pointer font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md"}>Food</li>

                        </ul>
                    </div>
                    <div className="mt-12" >
                        <div id='maincontent' className={`${visiblestatus.visible ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 blureffect' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`} >
                            {filteredData.map(x => <Content key={x._id} data={x} /> )}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
export default Body;