import Microvideo from "./microvideo";
function Watchvideo() {
    return (
        <>
            <div className="flex flex-col lg:flex-row w-full pt-14 p-2">
                <div className="w-full lg:w-5/6 mt-2 px-3 lg:px-0 lg:ml-6 lg:mr-2 flex flex-col gap-3">
                    <div className="container">
                        <iframe className="rounded-xl responsive-iframe" src="https://www.youtube.com/embed/7Mw528WHvN8" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                    <h1 className="text-lg font-semibold">WORLD IS CONGRATULATING INDIA | 4TH NATION TO DOCK IN SPACE | India is Master of Docking Technology</h1>
                    <div className="flex justify-between">
                        <div className="flex gap-4">
                            <img src="https://yt3.ggpht.com/4nBwSsqsHYO0rfcbBNBiCsMcSI2FE3k1kstEiBKVrZcIPLdlXXoX4dzqCCsu2L39vhkviCxDvw=s88-c-k-c0x00ffffff-no-rj" className="rounded-full" height="34" width="34" alt="" />
                            <div className="leading-none">
                                <span className="font-semibold flex text-sm gap-1">Carrer247 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="14" height="14" viewBox="0 0 24 24">
                                    <path d="M 12 2 C 6.4889941 2 2 6.4889982 2 12 C 2 17.511002 6.4889941 22 12 22 C 17.511006 22 22 17.511002 22 12 C 22 6.4889982 17.511006 2 12 2 z M 16 9 C 16.25575 9 16.511531 9.0974687 16.707031 9.2929688 C 17.098031 9.6839688 17.098031 10.316031 16.707031 10.707031 L 11.707031 15.707031 C 11.512031 15.902031 11.256 16 11 16 C 10.744 16 10.487969 15.902031 10.292969 15.707031 L 7.2929688 12.707031 C 6.9019687 12.316031 6.9019688 11.683969 7.2929688 11.292969 C 7.6839688 10.901969 8.3160313 10.901969 8.7070312 11.292969 L 11 13.585938 L 15.292969 9.2929688 C 15.488469 9.0974688 15.74425 9 16 9 z"></path>
                                </svg></span>
                                <span className="text-xs text-gray-600  font-normal">674K subscribers</span>
                            </div>
                            <button className="text-white text-sm font-medium bg-black px-4 rounded-3xl">Subscribe</button>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex items-center bg-slate-100 rounded-3xl text-sm font-medium">
                                <button className="flex rounded-s-3xl px-1 pl-2 items-center bg-gray-100 hover:bg-gray-200 h-full">
                                    <img width="20" height="20" className="mr-1" src="https://img.icons8.com/fluency-systems-regular/20/facebook-like.png" alt="facebook-like" />
                                    <span>20K</span>
                                </button>
                                <span className="font-xs font-thin">|</span>
                                <button className="flex rounded-e-3xl items-center px-1 pr-2 bg-gray-100 hover:bg-gray-200 h-full">
                                    <img width="20" height="20" src="https://img.icons8.com/windows/20/thumbs-down.png" alt="thumbs-down" />
                                    <span>5K</span>
                                </button>
                            </div>

                            <div className="flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                                <img width="24" height="24" className="mr-1" src="https://img.icons8.com/ios/24/forward-arrow.png" alt="forward-arrow" />
                                <span>Share</span>
                            </div>
                            <div className="hidden xl:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                                <img width="20" height="20" className="mr-1" src="https://img.icons8.com/windows/20/download--v1.png" alt="download--v1" />
                                <span>Download</span>
                            </div>
                            <div className="hidden xl:flex items-center text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 rounded-3xl">
                                <img width="20" height="20" className="mr-1" src="https://img.icons8.com/forma-light-filled/20/cut.png" alt="cut" />
                                <span>Clip</span>
                            </div>
                            <div className="flex items-center bg-gray-100 hover:bg-gray-200 px-2 rounded-full">
                                <span>⦁⦁⦁</span>
                            </div>

                        </div>
                    </div>
                    <div className=" rounded-xl bg-gray-100">
                        <div className="py-5 text-sm px-3">
                            <p>
                                Provided to YouTube by Ditto Music

                                Piya Tose · Shouweick Dey

                                Piya Tose

                                ℗ Melodywala

                                Released on: 2020-09-20

                                Auto-generated by YouTube.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="min-w-fit">
                    <div className="overflow-hidden mx-2 px-2 h-12 flex items-center">
                        <ul className="flex gap-2 text-sm">
                            <li className="bg-black text-white font-medium w-max px-2 py-1 rounded-md">All</li>
                            <li className="bg-gray-100 font-medium w-max hover:bg-gray-200 px-2 py-1 rounded-md">For you</li>
                        </ul>
                    </div>
                    <div className="mx-2 px-2 flex flex-col gap-3">
                        <Microvideo />
                        <Microvideo />
                        <Microvideo />
                        <Microvideo />
                        <Microvideo />
                    </div>
                </div>


            </div>
        </>
    )
}
export default Watchvideo;