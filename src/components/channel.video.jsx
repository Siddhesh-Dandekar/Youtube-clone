import { Link } from 'react-router-dom';
import { useState } from 'react';

//this component is used to display Videos Related to That Channel
function ChannelVideos(props) {
    const {title, views , thumbnailUrl, _id} = props.data;
    const [videotitle , setVideoTitle] = useState(title);

    //To limit the videoTitle Length so it won't Affect the UI 
    if(videotitle.length > 65){
        const UpdatedTitle = videotitle.slice(0, 60)+'...'
        setVideoTitle(UpdatedTitle)
    }
    return (<>
        <Link to={`/watch/${_id}`}>
        <div className=" flex flex-col gap-2">
            <div className="rounded-lg overflow-hidden">
                <img src={thumbnailUrl} className='aspect-video' alt="" />
            </div>
            <div>
                <h1 className="text-xs sm:text-base font-medium">{videotitle}</h1>
                <span className="text-xs font-medium text-gray-500">{views} views • 2 weeks ago</span>
            </div>
        </div></Link>
    </>)
}

export default ChannelVideos;