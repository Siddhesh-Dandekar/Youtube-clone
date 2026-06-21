import { Link } from 'react-router-dom';
import { compactNumber, relativeDate, formatDuration } from '../utils/format';

function ChannelVideos({ data }) {
    const { title, views, thumbnailUrl, _id, uploadDate, duration } = data;
    const videotitle = title.length > 65 ? `${title.slice(0, 62)}...` : title;
    const durationLabel = formatDuration(duration);

    return (
        <Link to={`/watch/${_id}`} className="flex flex-col gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
            <div className="relative rounded-lg overflow-hidden">
                <img src={thumbnailUrl} className="aspect-video bg-gray-100 dark:bg-neutral-800" alt={`${title} thumbnail`} loading="lazy" />
                {durationLabel ? (
                    <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-[0.65rem] font-medium text-white">
                        {durationLabel}
                    </span>
                ) : null}
            </div>
            <div>
                <h1 className="text-xs sm:text-base font-medium dark:text-white">{videotitle}</h1>
                <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">{compactNumber(views)} views · {relativeDate(uploadDate)}</span>
            </div>
        </Link>
    );
}

export default ChannelVideos;
