import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiFetch } from "../utils/api";
import { compactNumber, relativeDate } from "../utils/format";

function idOf(value) {
    return value?._id || value;
}

function Comment(props) {
    const { text, channelId, _id, timestamp, likes = 0, dislikes = 0, replies = [] } = props.data;
    const DeleteFunction = props.fun;
    const videoid = props.videoid;
    const onMessage = props.onMessage || (() => {});
    const [enableEdit, setEnableEdit] = useState(false);
    const [channeldata, setChannelData] = useState(typeof channelId === 'object' ? channelId : null);
    const [commentText, setCommentText] = useState(text);
    const [editText, setEditText] = useState(text);
    const [menu, setMenu] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);
    const [dislikeCount, setDislikeCount] = useState(dislikes);
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [replyList, setReplyList] = useState(replies);
    const UserInfo = useSelector(item => item.credential.data[0]);

    useEffect(() => {
        let active = true;
        async function fetchChannel() {
            if (typeof channelId === 'object') {
                setChannelData(channelId);
                return;
            }
            try {
                const channelInfo = await apiFetch(`/channel/${channelId}`);
                if (active) setChannelData(channelInfo);
            } catch {
                if (active) setChannelData(null);
            }
        }
        fetchChannel();
        return () => {
            active = false;
        };
    }, [channelId]);

    async function EditComment() {
        try {
            const edit = await apiFetch('/comment/edit', {
                method: "PUT",
                auth: true,
                body: {
                    commentId: _id,
                    videoid,
                    Updatetext: editText
                }
            });
            if (!edit.message) {
                setCommentText(edit.text);
            }
            setEnableEdit(false);
            setMenu(false);
        } catch (err) {
            onMessage(err.message);
        }
    }

    async function reactToComment(reaction) {
        try {
            const result = await apiFetch(`/comment/${videoid}/${_id}/${reaction}`, { method: 'POST', auth: true });
            setLikeCount(result.likes);
            setDislikeCount(result.dislikes);
        } catch (err) {
            onMessage(err.message);
        }
    }

    async function submitReply() {
        if (!replyText.trim()) return;
        try {
            const result = await apiFetch('/comment/reply', {
                method: 'POST',
                auth: true,
                body: {
                    commentId: _id,
                    videoid,
                    text: replyText
                }
            });
            setReplyList(result);
            setReplyText('');
            setReplyOpen(false);
        } catch (err) {
            onMessage(err.message);
        }
    }

    const isOwner = UserInfo.channelId && idOf(channelId)?.toString() === UserInfo.channelId?.toString();
    const avatar = channeldata?.channelProfile || "https://img.icons8.com/color/32/test-account.png";
    const name = channeldata?.channelName || 'Channel';

    if (enableEdit) {
        return (
            <div className="flex my-5">
                <img className="rounded-full mr-5" width='42' height="42" src={avatar} alt={`${name} avatar`} />
                <div className="w-full comment-section flex flex-col gap-2">
                    <input onChange={(e) => setEditText(e.target.value)} type="text" placeholder="Edit comment" value={editText} className="border-b pb-1 border-gray-600 min-w-full" />
                    <div className="flex gap-4 text-sm justify-end font-medium">
                        <button onClick={() => { setEnableEdit(false); setEditText(commentText); setMenu(false); }}>Cancel</button>
                        <button onClick={EditComment} disabled={!editText || editText === commentText} className={`rounded-full px-4 py-2 ${editText && editText !== commentText ? "bg-blue-700 text-white" : 'bg-gray-100'}`}>Save</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex my-5">
            <img className="rounded-full mr-5" width='42' height="42" src={avatar} alt={`${name} avatar`} />
            <div className="w-full comment-section flex flex-col gap-1">
                <span className="text-sm font-medium">{name} <span className="text-xs text-gray-500">{relativeDate(timestamp)}</span></span>
                <span className="text-[0.950rem]">{commentText}</span>
                <div className="flex mt-1 items-center gap-2">
                    <button onClick={() => reactToComment('like')} disabled={!UserInfo.validuser} className="flex items-center disabled:opacity-50">
                        <img width="24" height="24" src="https://img.icons8.com/windows/24/thumb-up.png" alt="" />
                        <span className="text-xs ml-1">{compactNumber(likeCount)}</span>
                    </button>
                    <button onClick={() => reactToComment('dislike')} disabled={!UserInfo.validuser} className="flex items-center disabled:opacity-50">
                        <img width="24" height="24" src="https://img.icons8.com/windows/24/thumbs-down.png" alt="" />
                        <span className="sr-only">{compactNumber(dislikeCount)} dislikes</span>
                    </button>
                    <button onClick={() => setReplyOpen(!replyOpen)} className="text-xs font-medium">Reply</button>
                </div>
                {replyOpen ? (
                    <div className="mt-2 flex gap-2">
                        <input value={replyText} onChange={event => setReplyText(event.target.value)} className="flex-1 border-b border-gray-500 text-sm" placeholder="Add a reply" />
                        <button onClick={submitReply} className="rounded-full bg-blue-700 px-3 py-1 text-sm text-white">Reply</button>
                    </div>
                ) : null}
                {replyList.length ? (
                    <div className="mt-2 border-l-2 border-gray-100 pl-3 text-sm">
                        {replyList.map(reply => (
                            <div key={reply._id || `${reply.text}-${reply.timestamp}`} className="mb-2">
                                <span>{reply.text}</span>
                                <span className="ml-2 text-xs text-gray-500">{relativeDate(reply.timestamp)}</span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
            {isOwner ? (
                <div className="flex relative text-sm items-start">
                    <button onClick={() => setMenu(!menu)} className="rounded-full hover:bg-gray-100" aria-label="Comment menu">
                        <img width="22" height="22" src="https://img.icons8.com/windows/22/menu-2.png" alt="" />
                    </button>
                    {menu ? (
                        <div className="absolute right-0 py-1 shadow-lg bg-white w-max rounded-lg border-gray-200 border top-7">
                            <button onClick={() => setEnableEdit(true)} className="flex p-1 px-2 hover:bg-gray-200 h-fit gap-1 items-center w-full">
                                Edit
                            </button>
                            <button onClick={() => DeleteFunction(_id)} className="flex gap-1 p-1 px-2 hover:bg-gray-200 h-fit items-center w-full">
                                Delete
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}

export default Comment;
