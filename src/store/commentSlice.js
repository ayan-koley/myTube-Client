import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedComment = createAsyncThunk("/comment/fetchedComment",async(id) => {
    const response = await axios.get(`/api/v1/comment/${id}`);
    return {comments: response.data.data[0].data};
})

const initialState = {
    comment: [],
    loading: false,
    error: null
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment: (state, action) => {
            console.log(action);
            state.comment.push(action.payload.message);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchedComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = [];
                state.comment = action.payload.comments;
            })
            .addCase(fetchedComment.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
    }
})

export const {addComment} = commentSlice.actions
export default commentSlice.reducer;