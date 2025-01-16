import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faUser, faMicrophone, faPlus, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

function Header() {
    return <>
        <header className="w-full h-14">
            <nav className="px-4 gap-2 flex justify-between h-full items-center">
                <div className="flex items-center flex-grow">
                    <FontAwesomeIcon className="h-4 w-4 rounded-full  hover:bg-gray-200 p-3" icon={faBars}></FontAwesomeIcon>
                    <img src="/src/assets/youtube.webp" alt="" width="122" height="56" />
                </div>
                <div className="flex justify-center items-center flex-grow-[3] gap-2 h-full">
                    <div className="flex w-5/6 h-2/3">
                        <input type="text" className="border-gray-300 rounded-s-full px-4 border w-full" placeholder="Search" />
                        <button className="border-gray-300 border px-3 rounded-e-full hover:bg-gray-200 " ><FontAwesomeIcon className=" rounded-full  p-2" icon={faMagnifyingGlass} /></button>
                    </div>
                    <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faMicrophone}></FontAwesomeIcon>
                </div>
                <div className="justify-end text-sm items-center gap-2 flex-grow h-full flex">
                    <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faVideo}></FontAwesomeIcon>
                    <FontAwesomeIcon className="h-4 w-4 rounded-full bg-gray-100 hover:bg-gray-200 p-3" icon={faBell}></FontAwesomeIcon>
                    <img src="https://yt3.ggpht.com/RAnCvom2Cnxn5g5xe1Vz5T4S9167TWv18cz2MTUu1hXv_tNZ-h2b34RoWPQqtAhvwXdgDijE=s108-c-k-c0x00ffffff-no-rj" className="rounded-full" height="34" width="34" alt="" />
                </div>
            </nav>
        </header>
    </>
}
export default Header;