import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedVideos = createAsyncThunk(
  "/videos/fetchedVideo",
  async (query, { getState }) => {
    const state = getState();
    console.log(state);
    if (state?.searchedVideos?.[query]) {
      return state.searchedVideos[query];
    }
    const fetchingData = await axios.get(`/api/v1/video?query=${query}`);
    return { query, videos: fetchingData.data.message };
  }
);

const initialState = {
  searchedVideos: {},
  query: "",
  loading: false,
  error: null,
};

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.query = action.payload.query;
        state.searchedVideos = {};
        state.searchedVideos[action.payload.query] = action.payload.videos;
      })
      .addCase(fetchedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default videoSlice.reducer;
