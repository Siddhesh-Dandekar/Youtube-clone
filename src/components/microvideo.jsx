import { Link } from "react-router-dom";
import { compactNumber, relativeDate, videoChannel, formatDuration } from "../utils/format";

function Microvideo({ data }) {
    const { thumbnailUrl, title, views, _id, uploadDate, duration } = data;
    const channel = videoChannel(data);
    const displayTitle = title.length > 55 ? `${title.slice(0, 52)}...` : title;
    const durationLabel = formatDuration(duration);

    return (
        <Link to={`/watch/${_id}`} className="flex w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
            <div className="relative">
                <img className="rounded-lg aspect-video bg-gray-100 dark:bg-neutral-800" width="165" src={thumbnailUrl} alt={`${title} thumbnail`} loading="lazy" />
                {durationLabel ? (
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[0.6rem] font-medium text-white">
                        {durationLabel}
                    </span>
                ) : null}
            </div>
            <div className="pl-3 flex-1 leading-none">
                <h6 className="lg:w-48 font-semibold text-sm leading-normal dark:text-white">{displayTitle}</h6>
                <span className="text-xs text-gray-500 dark:text-neutral-400 mt-1 font-medium flex items-end gap-1">
                    {channel.channelName || 'Unknown channel'}
                    {channel.verified ? <span aria-label="Verified" title="Verified">✓</span> : null}
                </span>
                <span className="text-xs text-gray-500 dark:text-neutral-400 font-medium">
                    {compactNumber(views)} views · {relativeDate(uploadDate)}
                </span>
            </div>
        </Link>
    );
}

export default Microvideo;
