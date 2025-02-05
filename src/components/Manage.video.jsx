import { useState } from 'react';
import { Link } from 'react-router-dom';

function ManageVideos(props) {
    const { title, views, thumbnailUrl, _id, description } = props.data;
    const deletefunction = props.del;
    const editfunction = props.edit;

    //This Component is Used to manage our Videos EDIT/DELETE
    const [editModel, setEditModel] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editThumbnailUrl , setEditThumbnailUrl] = useState(thumbnailUrl);

    return (<>

        <div className=" flex flex-col h-full justify-between gap-2">
            <Link to={`/watch/${_id}`}>
                <div className="rounded-lg overflow-hidden">
                    <img className='w-full aspect-video' src={thumbnailUrl} alt="" />
                </div>
            </Link>
            <div className='flex flex-col gap-1 '>
                <h1 className="text-sm sm:text-base font-medium">{title}</h1>
                <span className="text-xs font-medium text-gray-500">{views} views • 2 weeks ago</span>
            </div>
            <div className='flex justify-around font-medium gap-1'>
                <div onClick={() => setEditModel(true)} className='bg-gray-100 cursor-pointer flex border border-gray-200 items-center justify-center gap-2 hover:bg-gray-200 w-full py-1 rounded-sm'>
                    <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/20/pencil--v1.png" alt="pencil--v1" />
                    <button >Edit</button>
                </div>
                <div onClick={() => deletefunction(_id)} className='bg-gray-100 cursor-pointer flex border border-gray-2000 items-center justify-center gap-2 hover:bg-gray-200 w-full py-1 rounded-sm'>
                    <img width="20" height="20" src="https://img.icons8.com/fluency-systems-regular/20/trash--v1.png" alt="trash--v1" />
                    <button >Delete</button>
                </div>

            </div>

        </div>

        {editModel ? <div className="w-full z-[19] bg-transparent p-3 lg:px-10 fixed top-12 bottom-9 left-0 right-0 ">
            <div className="bg-white flex justify-between flex-col w-full no-scrollbar overflow-scroll px-2 md:px-10 py-2 lg:py-5 rounded-2xl shadow-lg  border border-gray-300">
                <div className="text-2xl md:text-3xl px-3 font-bold">
                    <h1>Edit Your Video</h1>
                </div>
                <div className="mx-auto my-5 w-11/12 lg:w-8/12 text-sm md:text-base">
                    <img width="350" className="mx-auto mb-2 rounded-md aspect-video" src={thumbnailUrl} alt="" />
                    <form action="#" method="POST" onSubmit={(e)=> {setEditModel(false); editfunction(e,{_id,editTitle, editThumbnailUrl, editDescription})}}>
                        <label htmlFor="Profile">Title</label>
                        <br />
                        <input required value={editTitle} onChange={(e)=> setEditTitle(e.target.value)} className="border mb-2 w-full rounded-sm p-1 border-gray-500" type="text" name="title" />
                        <br />
                        <label htmlFor="channelName">ThumbnailUrl</label>
                        <br />
                        <input value={editThumbnailUrl} onChange={(e)=> setEditThumbnailUrl(e.target.value)} className="border mb-2 w-full rounded-sm p-1 border-gray-500" type="url" required name="channelName" />
                        <br />
                        <label htmlFor="username">Description</label>
                        <br />
                        <textarea value={editDescription} rows='4' className="border w-full rounded-sm p-1 border-gray-500" onChange={(e) => setEditDescription(e.target.value)} ></textarea>

                        <div className="flex gap-4 text-base md:text-xl justify-end ">
                            <button onClick={() => {setEditModel(false); setEditTitle(title); setEditDescription(description); setEditThumbnailUrl(thumbnailUrl)}}>Cancel</button>
                            <button type='submit' className="text-blue-600 font-semibold">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div> : ''}

    </>)
}

export default ManageVideos;