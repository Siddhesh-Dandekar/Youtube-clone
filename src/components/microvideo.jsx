import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Microvideo(props) {
    const { thumbnailUrl, title, views, channelId, _id } = props.data;
    const [channeldata, setChannelData] = useState('')
    const [videotitle , setVideoTitle] = useState(title);

    //This Component is displayed while watching video in side there are Small Recommened Videos 
    //To Reduce the Title and make sure it doesn't effect the UI
    
    if(videotitle.length > 55){
        const UpdatedTitle = videotitle.slice(0, 50)+'...'
        setVideoTitle(UpdatedTitle)
    }
    useEffect(() => {
        const fetchChannel = async () => {
            const channelInfo = await fetch(`https://youtube-clone-api-j322.onrender.com/channel/${channelId}`).then(data => data.json());
            setChannelData(channelInfo);
        }
        fetchChannel();

    }, [])
    return (
        <>
            <Link to={`/watch/${_id}`}><div className="flex w-full">
                <div >
                    <img className="rounded-lg aspect-video" width="165" src={thumbnailUrl} alt="" />
                </div>
                <div className="pl-3 flex-1 leading-none">
                    <h6 className="lg:w-48 font-semibold text-sm leading-normal">{videotitle}</h6>
                    <span className="text-xs text-gray-500 mt-1 font-medium flex items-end gap-1">{channeldata.channelName} <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                        <path d="M 12 2 C 6.4889941 2 2 6.4889982 2 12 C 2 17.511002 6.4889941 22 12 22 C 17.511006 22 22 17.511002 22 12 C 22 6.4889982 17.511006 2 12 2 z M 16 9 C 16.25575 9 16.511531 9.0974687 16.707031 9.2929688 C 17.098031 9.6839688 17.098031 10.316031 16.707031 10.707031 L 11.707031 15.707031 C 11.512031 15.902031 11.256 16 11 16 C 10.744 16 10.487969 15.902031 10.292969 15.707031 L 7.2929688 12.707031 C 6.9019687 12.316031 6.9019688 11.683969 7.2929688 11.292969 C 7.6839688 10.901969 8.3160313 10.901969 8.7070312 11.292969 L 11 13.585938 L 15.292969 9.2929688 C 15.488469 9.0974688 15.74425 9 16 9 z"></path>
                    </svg></span>
                    <span className="text-xs text-gray-500  font-medium">{views > 1000 ? `${views.toString()[0]}.${views.toString()[1]}K` : views} views • 2 hour ago</span>
                </div>
            </div></Link>
        </>
    )
}
export default Microvideo;