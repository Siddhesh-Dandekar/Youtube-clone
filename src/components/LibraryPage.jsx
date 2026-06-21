import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Content from './content';
import { apiFetch } from '../utils/api';
import { compactNumber, relativeDate } from '../utils/format';

const titles = {
  history: 'History',
  'watch-later': 'Watch later',
  liked: 'Liked videos',
  playlists: 'Playlists',
  subscriptions: 'Subscriptions',
  clips: 'Your clips',
};

function LibraryPage({ section: forcedSection }) {
  const params = useParams();
  const section = forcedSection || params.section || 'history';
  const visible = useSelector(state => state.sidebar.visible);
  const user = useSelector(state => state.credential.data[0]);
  const [library, setLibrary] = useState(null);
  const [subscriptionFeed, setSubscriptionFeed] = useState(null);
  const [subView, setSubView] = useState('videos');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [playlistTitle, setPlaylistTitle] = useState('');

  const loadLibrary = useCallback(async () => {
    if (!user.validuser) return;
    try {
      setError('');
      const data = await apiFetch('/library', { auth: true });
      setLibrary(data);
    } catch (err) {
      setError(err.message);
    }
  }, [user.validuser]);

  const loadSubscriptionFeed = useCallback(async () => {
    if (!user.validuser) return;
    try {
      const data = await apiFetch('/subscriptions/feed', { auth: true });
      setSubscriptionFeed(data.items || []);
    } catch (err) {
      setError(err.message);
    }
  }, [user.validuser]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary, section]);

  useEffect(() => {
    if (section === 'subscriptions') loadSubscriptionFeed();
  }, [section, loadSubscriptionFeed]);

  const videos = useMemo(() => {
    if (!library) return [];
    if (section === 'history') return library.history.map(item => ({ ...item.video, watchedAt: item.watchedAt }));
    if (section === 'watch-later') return library.watchLater;
    if (section === 'liked') return library.likedVideos;
    return [];
  }, [library, section]);

  async function clearHistory() {
    try {
      await apiFetch('/history', { method: 'DELETE', auth: true });
      setMessage('History cleared.');
      await loadLibrary();
    } catch (err) {
      setError(err.message);
    }
  }

  async function createPlaylist(event) {
    event.preventDefault();
    if (!playlistTitle.trim()) return;
    try {
      await apiFetch('/playlists', { method: 'POST', auth: true, body: { title: playlistTitle } });
      setPlaylistTitle('');
      setMessage('Playlist created.');
      await loadLibrary();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="flex w-full pt-14 pb-20 sm:pb-4">
      <Sidebar />
      <section className={`${visible ? 'w-full mx-4 sm:ml-20 xl:ml-56' : 'w-full mx-4 sm:ml-20'} py-4`}>
        {(message || error) ? <div className={`mb-4 rounded-md border p-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-700' : 'border-green-200 bg-green-50 text-green-700'}`}>{error || message}</div> : null}
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold dark:text-white">{titles[section] || 'Library'}</h1>
          {section === 'history' && videos.length ? <button onClick={clearHistory} className="rounded-full bg-gray-100 dark:bg-neutral-800 dark:text-white px-4 py-2 text-sm font-medium hover:bg-gray-200 dark:hover:bg-neutral-700">Clear history</button> : null}
        </div>
        {section === 'subscriptions' && user.validuser ? (
          <div className="mb-4 flex gap-2 border-b border-gray-200 dark:border-neutral-800" role="tablist">
            <button
              role="tab"
              aria-selected={subView === 'videos'}
              onClick={() => setSubView('videos')}
              className={`pb-2 text-sm font-medium border-b-2 ${subView === 'videos' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-500 dark:text-neutral-400'}`}
            >
              Videos
            </button>
            <button
              role="tab"
              aria-selected={subView === 'channels'}
              onClick={() => setSubView('channels')}
              className={`pb-2 text-sm font-medium border-b-2 ${subView === 'channels' ? 'border-black text-black dark:border-white dark:text-white' : 'border-transparent text-gray-500 dark:text-neutral-400'}`}
            >
              Channels
            </button>
          </div>
        ) : null}

        {!user.validuser ? (
          <div className="py-20 text-center">
            <h2 className="text-lg font-semibold">Sign in to view this page</h2>
            <Link to="/login" className="mt-3 inline-block rounded-full bg-blue-700 px-4 py-2 text-white">Sign in</Link>
          </div>
        ) : null}

        {user.validuser && !library && !error ? <div className="h-40 animate-pulse rounded-xl bg-gray-100" /> : null}

        {user.validuser && ['history', 'watch-later', 'liked'].includes(section) && library ? (
          <>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {videos.map(video => <Content key={`${section}-${video._id}`} data={video} />)}
            </div>
            {!videos.length ? <p className="py-16 text-center text-gray-500">No videos here yet.</p> : null}
          </>
        ) : null}

        {user.validuser && section === 'subscriptions' && subView === 'videos' ? (
          subscriptionFeed === null ? (
            <div className="h-40 animate-pulse rounded-xl bg-gray-100 dark:bg-neutral-800" />
          ) : subscriptionFeed.length ? (
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subscriptionFeed.map(video => <Content key={video._id} data={video} />)}
            </div>
          ) : (
            <p className="py-16 text-center text-gray-500 dark:text-neutral-400">No new videos from your subscriptions yet.</p>
          )
        ) : null}

        {user.validuser && section === 'subscriptions' && subView === 'channels' && library ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {library.subscriptions.map(channel => (
              <Link key={channel._id} to={`/channel/${channel._id}`} className="flex gap-3 rounded-lg border border-gray-100 dark:border-neutral-800 p-4 hover:bg-gray-50 dark:hover:bg-neutral-800/50">
                <img src={channel.channelProfile} alt={`${channel.channelName} avatar`} className="h-14 w-14 rounded-full" />
                <div>
                  <h2 className="font-semibold dark:text-white">{channel.channelName}{channel.verified ? <span className="ml-1 text-xs text-gray-500 dark:text-neutral-400">✓</span> : null}</h2>
                  <p className="text-sm text-gray-500 dark:text-neutral-400">{compactNumber(channel.subscribers)} subscribers</p>
                  <p className="line-clamp-2 text-sm text-gray-600 dark:text-neutral-300">{channel.description}</p>
                </div>
              </Link>
            ))}
            {!library.subscriptions.length ? <p className="py-16 text-center text-gray-500 dark:text-neutral-400">No subscriptions yet.</p> : null}
          </div>
        ) : null}

        {user.validuser && section === 'playlists' && library ? (
          <div className="space-y-4">
            <form onSubmit={createPlaylist} className="flex max-w-lg gap-2">
              <input value={playlistTitle} onChange={event => setPlaylistTitle(event.target.value)} className="flex-1 rounded-md border px-3 py-2" placeholder="New playlist title" />
              <button className="rounded-full bg-black px-4 py-2 text-white">Create</button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {library.playlists.map(playlist => (
                <div key={playlist._id} className="rounded-lg border border-gray-100 p-4">
                  <h2 className="font-semibold">{playlist.title}</h2>
                  <p className="text-sm text-gray-500">{playlist.videos.length} videos - updated {relativeDate(playlist.updatedAt)}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {playlist.videos.slice(0, 4).map(item => item.video ? (
                      <img key={item.videoId} src={item.video.thumbnailUrl} alt={`${item.video.title} thumbnail`} className="aspect-video rounded-md" />
                    ) : null)}
                  </div>
                </div>
              ))}
            </div>
            {!library.playlists.length ? <p className="py-16 text-center text-gray-500">Create your first playlist.</p> : null}
          </div>
        ) : null}

        {user.validuser && section === 'clips' ? (
          <div className="py-20 text-center text-gray-500">
            <h2 className="text-lg font-semibold text-gray-700">No clips yet</h2>
            <p className="text-sm">Clip creation is not available in this clone yet.</p>
          </div>
        ) : null}
      </section>
    </main>
  );
}

export default LibraryPage;
