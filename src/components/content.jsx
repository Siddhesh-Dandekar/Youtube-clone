import { Link } from "react-router-dom";
import { compactNumber, relativeDate, videoChannel } from "../utils/format";

function Content({ data }) {
    const { thumbnailUrl, title, views, _id, uploadDate } = data;
    const channel = videoChannel(data);

    return (
        <Link to={`/watch/${_id}`} className="block p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
            <div className="w-full">
                <img className="rounded-xl w-full aspect-video bg-gray-100" src={thumbnailUrl} alt={`${title} thumbnail`} loading="lazy" />
            </div>
            <div className="flex my-2">
                <div className="min-w-fit">
                    <img
                        src={channel.channelProfile || "https://img.icons8.com/color/32/test-account.png"}
                        className="rounded-full"
                        height="34"
                        width="34"
                        alt={`${channel.channelName || 'Channel'} avatar`}
                        loading="lazy"
                    />
                </div>
                <div className="pl-3 flex-1 leading-none">
                    <h6 className="font-semibold text-xs sm:text-sm leading-normal line-clamp-2">{title}</h6>
                    <span className="text-xs text-gray-500 mt-1 font-medium flex items-end gap-1">
                        {channel.channelName || 'Unknown channel'}
                        <span aria-hidden="true">✓</span>
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                        {compactNumber(views)} views - {relativeDate(uploadDate)}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default Content;
