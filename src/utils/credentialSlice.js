import { createSlice } from "@reduxjs/toolkit";


//Creating a Slice in which user Credentials will be Stored, fetched and Cleared
const CredentialSlice = createSlice({
    name: 'credential',
    initialState: {
        data: [{
            _id: null,
            username: null,
            email: null,
            validuser: false,
            avatar: null,
            channelId: null
        }]
    },
    reducers: {
        adddata: (state, action) => {
            const { _id, username, email, validuser, avatar, channelId} = action.payload.user;
            const updatedata = state.data.find(x => x);
            updatedata._id = _id;
            updatedata.username = username;
            updatedata.email = email;
            updatedata.validuser = validuser;
            updatedata.avatar = avatar;
            updatedata.channelId = channelId;

        },
        fetchdata: (state, action) => {
            const result = state.data.find(x => x);
        },
        cleardata: (state, action)=>{
            const deletedata = state.data.find(x => x);
            for(let key in deletedata){
                deletedata[key] = null
            }
        }
    }
})

export default CredentialSlice.reducer;

export const { adddata, fetchdata , cleardata} = CredentialSlice.actions;

