import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchedHistory = createAsyncThunk("/user/watch-history",
    async() => {
        const response = await axios.get("/api/v1/user/watch-history");
        return {videos: response.data?.data};
    }
)
const initialState = {
    watchVideos: [],
    loading: false,
    error: null
}

const historySlice = createSlice({
    name: "watch-history",
    initialState,
    reducers: {
        addVideo: (state, action) => {
            state.loading = true;
            state.watchVideos = action.payload.video;
            state.loading = false;
        },
        removeVideo: (state, action) => {
           state.watchVideos = state.watchVideos.filter((video) => video._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchedHistory.fulfilled, (state, action) => {
                state.loading = false,
                state.watchVideos = [];
                state.watchVideos = action.payload.videos;
            })
            .addCase(fetchedHistory.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
    }
})
export const {addVideo, removeVideo} = historySlice.actions
export default historySlice.reducer;