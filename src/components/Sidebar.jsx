import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const navClass = ({ isActive }) =>
  `h-10 px-2 flex items-center rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : 'font-medium'}`;

function Sidebar() {
  const visible = useSelector(state => state.sidebar.visible);

  if (!visible) {
    return (
      <aside className="w-20 gap-5 fixed bg-white flex text-[0.65rem] flex-col items-center pt-2 list-none">
        <NavLink to="/" className="px-2 gap-1 flex flex-col items-center rounded-lg">
          <span aria-hidden="true">H</span>
          <span>Home</span>
        </NavLink>
        <NavLink to="/shorts" className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-100">
          <span aria-hidden="true">S</span>
          <span>Shorts</span>
        </NavLink>
        <NavLink to="/subscriptions" className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-100">
          <span aria-hidden="true">Sub</span>
          <span>Subs</span>
        </NavLink>
        <NavLink to="/library/history" className="h-10 px-2 gap-1 flex flex-col items-center rounded-lg hover:bg-gray-100">
          <span aria-hidden="true">You</span>
          <span>You</span>
        </NavLink>
      </aside>
    );
  }

  return (
    <aside className="w-56 fixed bg-white h-screen z-10 flex text-[0.8rem] flex-col px-4 pt-2 list-none">
      <NavLink to="/" className={navClass}>
        <span className="mr-5" aria-hidden="true">H</span>
        <span>Home</span>
      </NavLink>
      <NavLink to="/shorts" className={navClass}>
        <span className="mr-5" aria-hidden="true">S</span>
        <span>Shorts</span>
      </NavLink>
      <NavLink to="/subscriptions" className={navClass}>
        <span className="mr-5" aria-hidden="true">Sub</span>
        <span>Subscriptions</span>
      </NavLink>
      <div className="w-full my-2 border-t-2 border-gray-200 border-solid" />
      <Link to="/library/history" className="h-10 px-2 flex items-center rounded-lg hover:bg-gray-200">
        <span className="text-base font-medium mr-2">You</span>
        <span aria-hidden="true">&gt;</span>
      </Link>
      <NavLink to="/library/history" className={navClass}>
        <span className="mr-5" aria-hidden="true">Hist</span>
        <span>History</span>
      </NavLink>
      <NavLink to="/library/playlists" className={navClass}>
        <span className="mr-5" aria-hidden="true">List</span>
        <span>Playlists</span>
      </NavLink>
      <NavLink to="/channel/studio" className={navClass}>
        <span className="mr-5" aria-hidden="true">Vid</span>
        <span>Your videos</span>
      </NavLink>
      <NavLink to="/library/watch-later" className={navClass}>
        <span className="mr-5" aria-hidden="true">WL</span>
        <span>Watch later</span>
      </NavLink>
      <NavLink to="/library/liked" className={navClass}>
        <span className="mr-5" aria-hidden="true">Like</span>
        <span>Liked videos</span>
      </NavLink>
      <NavLink to="/library/clips" className={navClass}>
        <span className="mr-5" aria-hidden="true">Clip</span>
        <span>Your clips</span>
      </NavLink>
      <div className="w-full my-2 border-t-2 border-gray-200 border-solid" />
    </aside>
  );
}

export default Sidebar;
