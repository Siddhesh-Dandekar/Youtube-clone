import { createSlice } from "@reduxjs/toolkit";


//This slice is used to store sidebar State
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        visible: true
    },
    reducers:{
        changeState: (state, action)=>{
            state.visible = !state.visible;
        },
        fetchState: (state, action)=> {
            const result = state.visible.find(x => x);
            return result;
        }
    }
})

export default sidebarSlice.reducer;

export const {changeState, fetchState} = sidebarSlice.actions;