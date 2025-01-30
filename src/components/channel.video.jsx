import { Link } from 'react-router-dom';
function ChannelVideos(props) {
    const {title, views , thumbnailUrl, _id} = props.data;
    return (<>
        <Link to={`/watch/${_id}`}>
        <div className=" flex flex-col gap-2">
            <div className="rounded-lg overflow-hidden">
                <img src={thumbnailUrl} alt="" />
            </div>
            <div>
                <h1 className="text-base font-medium">{title}</h1>
                <span className="text-xs font-medium text-gray-500">{views} views • 2 weeks ago</span>
            </div>
        </div></Link>
    </>)
}

export default ChannelVideos;