import { configureStore } from "@reduxjs/toolkit";
import CredentialReducer from "./credentialSlice.js"
import visibleReducer from "./sidebarSlice.js"
import searchReducer from "./searchSlice.js"

//Configure Redux Store for centralised Storage Acces
const appStore = new configureStore({
    reducer : {
        credential : CredentialReducer,
        sidebar : visibleReducer,
        search : searchReducer
    }
})

export default appStore;