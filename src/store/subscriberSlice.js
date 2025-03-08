import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchedSubscriber = createAsyncThunk("/user/subscriber", async(_id) => {
    const subscriber = await axios.get(`/api/v1/subscription/subscribed-channel/${_id}`);
    return {subscriber: subscriber.data?.message};
})

const initialState = {
    subscribers: new Map(),
    loading: false,
    error: null
};

const subscriberSlice = createSlice({
    name: "subscribers",
    initialState,
    reducers: {
        addSubscriber: (state, action) => {
            console.log(action);
            // state.subscribers.set()
        },
        removeSubscriber: (state, action) => {}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedSubscriber.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchedSubscriber.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload.subscriber);
            })
            .addCase(fetchedSubscriber.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            } )
    }
})

export const {addSubscriber, removeSubscriber} = subscriberSlice.actions
export default subscriberSlice.reducer;