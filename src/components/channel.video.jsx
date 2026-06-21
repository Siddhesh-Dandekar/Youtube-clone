import { Link } from 'react-router-dom';
import { compactNumber, relativeDate } from '../utils/format';

function ChannelVideos({ data }) {
    const { title, views, thumbnailUrl, _id, uploadDate } = data;
    const videotitle = title.length > 65 ? `${title.slice(0, 62)}...` : title;

    return (
        <Link to={`/watch/${_id}`} className="flex flex-col gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
            <div className="rounded-lg overflow-hidden">
                <img src={thumbnailUrl} className="aspect-video bg-gray-100" alt={`${title} thumbnail`} loading="lazy" />
            </div>
            <div>
                <h1 className="text-xs sm:text-base font-medium">{videotitle}</h1>
                <span className="text-xs font-medium text-gray-500">{compactNumber(views)} views - {relativeDate(uploadDate)}</span>
            </div>
        </Link>
    );
}

export default ChannelVideos;
