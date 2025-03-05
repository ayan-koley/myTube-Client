import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import videoSlice from './videoSlice.js';
import historySlice from './historySlice.js';

const store = configureStore({
    reducer: {
        authSlice,
        videoSlice,
        historySlice
    }
})
export default store;