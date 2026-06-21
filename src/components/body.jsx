import Content from "./content";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { getVideos } from "../utils/api";

const categories = ['All', 'Music', 'Vlog', 'Food', 'Gaming', 'News'];

function Body({ mode = 'home' }) {
    const visible = useSelector(x => x.sidebar.visible);
    const searchInfo = useSelector(x => x.search.data);
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('query') || '';
    const query = urlQuery || searchInfo || '';
    const [videoData, setVideoData] = useState([]);
    const [category, setCategory] = useState(mode === 'shorts' ? 'shorts' : null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const sentinelRef = useRef(null);

    const title = mode === 'search'
        ? `Search results for "${query}"`
        : mode === 'shorts'
            ? 'Shorts'
            : mode === 'trending'
                ? 'Trending'
                : 'Home';

    useEffect(() => {
        setVideoData([]);
        setPage(1);
        setHasMore(true);
    }, [query, category, mode]);

    useEffect(() => {
        let active = true;
        async function loadVideos() {
            if (!hasMore && page !== 1) return;
            setLoading(true);
            setError('');
            try {
                const response = await getVideos({
                    page,
                    limit: 12,
                    q: query,
                    category: category && category !== 'All' ? category : undefined,
                    sort: mode === 'trending' ? 'trending' : undefined,
                });
                if (!active) return;
                setVideoData(prev => page === 1 ? response.items : [...prev, ...response.items]);
                setHasMore(response.hasMore);
            } catch (err) {
                if (active) setError(err.message || 'Unable to load videos');
            } finally {
                if (active) setLoading(false);
            }
        }
        loadVideos();
        return () => {
            active = false;
        };
    }, [page, query, category, mode, hasMore]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(entries => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore && !loading) {
                setPage(prev => prev + 1);
            }
        }, { rootMargin: '300px' });
        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading]);

    return (
        <main className="flex w-full pt-14">
            <Sidebar />
            <section className={`${visible ? 'w-full mx-2 sm:ml-20 xl:ml-56 overflow-hidden' : 'w-full mx-2 sm:ml-20 overflow-hidden'} pb-20 sm:pb-2`}>
                <div className="overflow-hidden sticky top-14 bg-white dark:bg-neutral-900 w-full h-12 flex items-center z-[2]">
                    <ul className="flex gap-2 text-sm select-none overflow-x-auto no-scrollbar" aria-label="Video categories">
                        {categories.map(item => (
                            <li key={item}>
                                <button
                                    onClick={() => setCategory(item === 'All' ? null : item)}
                                    className={(category === item || (!category && item === 'All'))
                                        ? "bg-black text-white dark:bg-white dark:text-black cursor-pointer font-medium w-max px-3 py-1 rounded-md"
                                        : "bg-gray-100 dark:bg-neutral-800 dark:text-white cursor-pointer font-medium w-max hover:bg-gray-200 dark:hover:bg-neutral-700 px-3 py-1 rounded-md"}
                                >
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 px-2">
                    {mode !== 'home' || query ? <h1 className="text-xl font-semibold mb-3 dark:text-white">{title}</h1> : null}
                    {error ? <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}
                    <div id="maincontent" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
                        {videoData.map(x => <Content key={x._id} data={x} />)}
                    </div>
                    {!loading && !error && videoData.length === 0 ? (
                        <div className="py-20 text-center text-gray-500 dark:text-neutral-400">
                            <h2 className="text-lg font-semibold text-gray-700 dark:text-neutral-200">No videos found</h2>
                            <p className="text-sm">Try a different search or category.</p>
                        </div>
                    ) : null}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-2" aria-label="Loading videos">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="aspect-video rounded-xl bg-gray-200 dark:bg-neutral-800" />
                                    <div className="mt-3 h-4 w-4/5 rounded bg-gray-200 dark:bg-neutral-800" />
                                    <div className="mt-2 h-3 w-2/5 rounded bg-gray-100 dark:bg-neutral-800" />
                                </div>
                            ))}
                        </div>
                    ) : null}
                    <div ref={sentinelRef} className="h-8" />
                </div>
            </section>
        </main>
    );
}

export default Body;
