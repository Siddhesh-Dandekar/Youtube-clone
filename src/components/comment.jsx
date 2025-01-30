import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Comment(props) {
    const {text , channelId , _id} = props.data;
    const DeleteFunction = props.fun;
    const UserInfo = useSelector(item => item.credential.data[0]);
    const [channeldata, setChannelData] = useState('')
        useEffect(() => {
            const fetchChannel = async () => {
                const channelInfo = await fetch(`http://localhost:5100/channel/${channelId}`).then(data => data.json());
                setChannelData(channelInfo);
            }
            fetchChannel();
    
        }, [])


    return (
        <>
            <div className="flex my-5">
                <img className="rounded-full mr-5" width='42' height="42" src={channeldata.channelProfile} alt="" />
                <div className="w-full comment-section flex flex-col gap-1">
                    <span className="text-sm font-medium">{channeldata.channelName}</span>
                    <span className="text-[0.950rem]">{text}</span>
                    <div className="flex mt-1 items-center gap-2">
                        <img width="24" height="24" className="" src="https://img.icons8.com/windows/24/thumb-up.png" alt="facebook-like" />
                        <img width="24" height="24" className="mr-2" src="https://img.icons8.com/windows/24/thumbs-down.png" alt="thumbs-down" />
                        <span className="text-xs font-medium">Reply</span>
                    </div>

                </div>
                {UserInfo.channelId == channelId ? <div className="flex text-sm min-w-fit items-center">
                    <div className="flex mr-1 p-1 rounded-md hover:bg-gray-200 h-fit gap-1 items-center">
                        <img width="16" height="16" src="https://img.icons8.com/fluency-systems-regular/20/edit--v1.png" alt="edit--v1" />
                        <button>Edit</button>
                    </div>

                    <div className="flex gap-1 p-1 rounded-md hover:bg-gray-200 h-fit items-center">
                        <img width="16" height="16" src="https://img.icons8.com/fluency-systems-regular/20/delete.png" alt="delete" />
                        <button onClick={() => DeleteFunction(_id)}>Delete</button>
                    </div>
                </div> : '' }
                
            </div>
        </>
    )
}

export default Comment;