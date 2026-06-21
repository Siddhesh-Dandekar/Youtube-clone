import { NavLink } from 'react-router-dom';

const itemClass = ({ isActive }) =>
  `flex flex-1 flex-col items-center justify-center gap-1 text-[0.625rem] font-medium ${
    isActive ? 'text-black dark:text-white' : 'text-gray-500 dark:text-neutral-400'
  }`;

function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M 12 2 A 1 1 0 0 0 11.289062 2.296875 L 1.203125 11.097656 A 0.5 0.5 0 0 0 1 11.5 A 0.5 0.5 0 0 0 1.5 12 L 4 12 L 4 20 C 4 20.552 4.448 21 5 21 L 9 21 C 9.552 21 10 20.552 10 20 L 10 14 L 14 14 L 14 20 C 14 20.552 14.448 21 15 21 L 19 21 C 19.552 21 20 20.552 20 20 L 20 12 L 22.5 12 A 0.5 0.5 0 0 0 23 11.5 A 0.5 0.5 0 0 0 22.796875 11.097656 L 12.716797 2.3027344 A 1 1 0 0 0 12.710938 2.296875 A 1 1 0 0 0 12 2 z" />
    </svg>
  );
}

function ShortsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M 15.886719 1 C 14.974131 1 14.077693 1.2286385 13.287109 1.65625 L 5.5664062 5.7207031 C 3.7637541 6.6652034 2.6367187 8.5322799 2.6367188 10.566406 C 2.6367188 11.911504 3.2225585 13.082394 4.046875 14.046875 C 3.2161002 15.0216 2.6367187 16.195885 2.6367188 17.521484 C 2.6367188 20.532674 5.1018215 23 8.1132812 23 C 9.0303925 23 9.9287625 22.773103 10.716797 22.341797 L 18.292969 18.353516 C 20.151702 17.459981 21.363281 15.531898 21.363281 13.433594 C 21.363281 12.088496 20.777441 10.917606 19.953125 9.953125 C 20.783897 8.9783946 21.363281 7.8041153 21.363281 6.4785156 C 21.363281 3.4673258 18.898179 1 15.886719 1 z M 10 9 L 10 15 L 15 12 L 10 9 z" />
    </svg>
  );
}

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 flex h-14 border-t border-gray-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 sm:hidden" aria-label="Mobile navigation">
      <NavLink to="/" end className={itemClass}>
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink to="/shorts" className={itemClass}>
        <ShortsIcon />
        <span>Shorts</span>
      </NavLink>
      <NavLink to="/subscriptions" className={itemClass}>
        <img src="https://img.icons8.com/material-outlined/24/video-playlist.png" alt="" width="20" height="20" className="dark:invert" />
        <span>Subscriptions</span>
      </NavLink>
      <NavLink to="/library/history" className={itemClass}>
        <img src="https://img.icons8.com/small/20/user-male-circle.png" alt="" width="20" height="20" className="dark:invert" />
        <span>You</span>
      </NavLink>
    </nav>
  );
}

export default BottomNav;
