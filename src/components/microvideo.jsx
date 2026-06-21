import { Link } from "react-router-dom";
import { compactNumber, relativeDate, videoChannel } from "../utils/format";

function Microvideo({ data }) {
    const { thumbnailUrl, title, views, _id, uploadDate } = data;
    const channel = videoChannel(data);
    const displayTitle = title.length > 55 ? `${title.slice(0, 52)}...` : title;

    return (
        <Link to={`/watch/${_id}`} className="flex w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
            <div>
                <img className="rounded-lg aspect-video bg-gray-100" width="165" src={thumbnailUrl} alt={`${title} thumbnail`} loading="lazy" />
            </div>
            <div className="pl-3 flex-1 leading-none">
                <h6 className="lg:w-48 font-semibold text-sm leading-normal">{displayTitle}</h6>
                <span className="text-xs text-gray-500 mt-1 font-medium flex items-end gap-1">
                    {channel.channelName || 'Unknown channel'}
                    <span aria-hidden="true">✓</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">
                    {compactNumber(views)} views - {relativeDate(uploadDate)}
                </span>
            </div>
        </Link>
    );
}

export default Microvideo;
