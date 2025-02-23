import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js';
import videoSlice from './videoSlice.js';

const store = configureStore({
    reducer: {
        authSlice,
        videoSlice
    }
})
export default store;