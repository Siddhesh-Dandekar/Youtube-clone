import { createSlice } from "@reduxjs/toolkit";


//This slice is used to store sidebar State
const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        visible: true
    },
    reducers:{
        changeState: (state)=>{
            state.visible = !state.visible;
        }
    }
})

export default sidebarSlice.reducer;

export const {changeState} = sidebarSlice.actions;
