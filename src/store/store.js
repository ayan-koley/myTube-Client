import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import videoSlice from './videoSlice.js';
import historySlice from './historySlice.js';
import commentSlice from './commentSlice.js';

const store = configureStore({
    reducer: {
        authSlice,
        videoSlice,
        historySlice,
        commentSlice
    }
})
export default store;