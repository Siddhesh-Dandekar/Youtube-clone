import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name : 'search',
    initialState : {
        data : null
    },
    reducers : {
        searchinfo : (state, action)=>{
            state.data = action.payload;
        },
        clearinfo : (state, action) => {
            state.data = action.payload;
        }
    }

})

export default searchSlice.reducer;

export const {searchinfo , clearinfo} = searchSlice.actions;