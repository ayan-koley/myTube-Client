import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchedHistory = createAsyncThunk("/user/watch-history",
    async() => {
        const response = await axios.get("/api/v1/user/watch-history");
        return {videos: response.data?.message};
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
            console.log(action.payload);
            state.watchVideos.push(action.payload.video);
            state.loading = false;
        },
        removeVideo: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedHistory.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchedHistory.fulfilled, (state, action) => {
                state.loading = false,
                state.watchVideos.push(action.payload.videos);
            })
            .addCase(fetchedHistory.rejected, (state, action) => {
                state.loading = false,
                state.error = action.error.message
            })
    }
})
export const {addVideo} = historySlice.actions
export default historySlice.reducer;