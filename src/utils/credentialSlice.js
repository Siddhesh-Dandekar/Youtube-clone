import { createSlice } from "@reduxjs/toolkit";

const emptyUser = {
    _id: null,
    username: null,
    email: null,
    validuser: false,
    avatar: null,
    channelId: null,
    emailVerified: false,
    subscribedChannels: [],
    likedVideos: [],
    watchLater: []
};

//Creating a Slice in which user Credentials will be Stored, fetched and Cleared
const CredentialSlice = createSlice({
    name: 'credential',
    initialState: {
        data: [{ ...emptyUser }]
    },
    reducers: {
        adddata: (state, action) => {
            const { _id, username, email, validuser, avatar, channelId, emailVerified, subscribedChannels, likedVideos, watchLater } = action.payload.user;
            const updatedata = state.data.find(x => x);
            updatedata._id = _id;
            updatedata.username = username;
            updatedata.email = email;
            updatedata.validuser = validuser;
            updatedata.avatar = avatar;
            updatedata.channelId = channelId;
            updatedata.emailVerified = Boolean(emailVerified);
            updatedata.subscribedChannels = subscribedChannels || [];
            updatedata.likedVideos = likedVideos || [];
            updatedata.watchLater = watchLater || [];

        },
        cleardata: (state)=>{
            state.data[0] = { ...emptyUser };
        }
    }
})

export default CredentialSlice.reducer;

export const { adddata, cleardata} = CredentialSlice.actions;

