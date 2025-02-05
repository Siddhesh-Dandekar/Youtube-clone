import { createSlice } from "@reduxjs/toolkit";


//This slice is used to Store the search Value and to be able to access in main components
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