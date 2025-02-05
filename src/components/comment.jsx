import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Comment(props) {
    const { text, channelId, _id } = props.data;
    const DeleteFunction = props.fun;
    const videoid = props.videoid

    const [enableEdit, setEnableEdit] = useState(false);
    const [channeldata, setChannelData] = useState('')

    const [commentText, setCommentText] = useState(text);
    const [editText, setEditText] = useState(commentText);
    const [menu, setMenu] = useState(false);
    const [RandomLikes, setRandomLikes] = useState(0)


    //Retreive User Details
    const UserInfo = useSelector(item => item.credential.data[0]);

    //Fetching Channel info for displaying Comment assosiated to which Channel
    useEffect(() => {
        const fetchChannel = async () => {
            const channelInfo = await fetch(`http://localhost:5100/channel/${channelId}`).then(data => data.json());
            setChannelData(channelInfo);
        }
        fetchChannel();
        const RandomNumber = (Math.random() * 2000).toFixed(0);
        setRandomLikes(RandomNumber);

    }, [])

    //This function is allows user to edit his comment
    async function EditComment() {
        const accessToken = localStorage.getItem('key')
        try {
            if (accessToken && accessToken !== undefined) {
                const Edit = await fetch('http://localhost:5100/comment/edit', {
                    method: "PUT",
                    headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `JWT ${accessToken}`
                    },
                    body: JSON.stringify({
                        commentId: _id,
                        videoid: videoid,
                        Updatetext: editText
                    })
                }).then(data => data.json());
                if (Edit.message) {
                    setCommentText(text);
                    setEditText(text);
                    setEnableEdit(false);
                    setMenu(false);
                }
                else{
                    setCommentText(Edit.text);
                    setEnableEdit(false);
                    setMenu(false);
                }
            }
        } catch (err) {
            console.log(err.message)
        }

    }


    return (
        <> {enableEdit ? <div className="flex my-5">
            <img className="rounded-full mr-5" width='42' height="42" src={channeldata.channelProfile} alt="" />
            <div className="w-full comment-section flex flex-col gap-2">
                <input onChange={(e) => setEditText(e.target.value)} type="text" placeholder="Add a comment..." value={editText} className="border-b pb-1 border-gray-600 min-w-full" />
                <div className="flex gap-4 text-sm justify-end font-medium ">
                    <button onClick={() => { setEnableEdit(false); setEditText(commentText); setMenu(false) }}>Cancel</button>
                    <button onClick={EditComment} disabled={editText && editText !== commentText ? false : true} className={`rounded-full px-4  py-2 ${editText && editText !== commentText ? "bg-blue-700 text-white" : 'bg-gray-100'}`}>Save</button>
                </div>
            </div>
        </div> : <div className="flex my-5">
            <img className="rounded-full mr-5" width='42' height="42" src={channeldata.channelProfile} alt="" />
            <div className="w-full comment-section flex flex-col gap-1">
                <span className="text-sm font-medium">{channeldata.channelName}</span>
                <span className="text-[0.950rem]">{commentText}</span>
                <div className="flex mt-1 items-center gap-2">
                    <div className="flex items-center ">
                        <img width="24" height="24" className="" src="https://img.icons8.com/windows/24/thumb-up.png" alt="facebook-like" />
                        <span className="text-xs ml-1">{RandomLikes > 1000 ? `${RandomLikes[0]}.${RandomLikes[1]}K` : RandomLikes}</span>
                    </div>

                    <img width="24" height="24" className="mr-2" src="https://img.icons8.com/windows/24/thumbs-down.png" alt="thumbs-down" />
                    <span className="text-xs font-medium">Reply</span>
                </div>

            </div>
            {UserInfo.channelId == channelId ? <div className="flex relative text-sm items-start">
                <img width="22" onClick={() => setMenu(!menu)} height="22" className="rounded-full hover:bg-gray-100" src="https://img.icons8.com/windows/22/menu-2.png" alt="menu-2" />
                {menu ? <div className="absolute right-0 py-1 shadow-lg bg-white w-max rounded-lg border-gray-200 border top-7">
                    <div onClick={() => setEnableEdit(true)} className="flex p-1 px-2 hover:bg-gray-200 h-fit gap-1 items-center">
                        <img width="16" height="16" src="https://img.icons8.com/fluency-systems-regular/20/edit--v1.png" alt="edit--v1" />
                        <button >Edit</button>
                    </div>

                    <div className="flex gap-1 p-1 px-2 hover:bg-gray-200 h-fit items-center">
                        <img width="16" height="16" src="https://img.icons8.com/fluency-systems-regular/20/delete.png" alt="delete" />
                        <button onClick={() => DeleteFunction(_id)}>Delete</button>
                    </div>
                </div> : ''}

            </div> : ""
            }

        </div>}

        </>
    )
}

export default Comment;