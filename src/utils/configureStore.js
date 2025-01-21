import { configureStore } from "@reduxjs/toolkit";
import CredentialReducer from "./credentialSlice.js"
import visibleReducer from "./sidebarSlice.js"

const appStore = new configureStore({
    reducer : {
        credential : CredentialReducer,
        sidebar : visibleReducer
    }
})

export default appStore;