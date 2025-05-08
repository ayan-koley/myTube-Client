import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedVideos = createAsyncThunk(
  "/videos/fetchedVideo",
  async ({query, page = 1}, { getState }) => {
    const state = getState();
    if (state?.searchedVideos?.[query]) {
      return state.searchedVideos[query];
    }
    const fetchingData = await axios.get(`/api/v1/video?query=${query}&page=${page}`);
    return { query, videos: fetchingData.data.data };
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
  reducers: {
    addVideo: (state, action) => {
      state.searchedVideos[state.query].push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchedVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchedVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.query = action.payload.query;
        state.searchedVideos = {};
        state.searchedVideos[state.query] = action.payload.videos;
      })
      .addCase(fetchedVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {addVideo} = videoSlice.actions;
export default videoSlice.reducer;
