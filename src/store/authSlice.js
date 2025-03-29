import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null,
    status: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userData = action.payload;
            state.status = true;
        },
        logOut: (state) => {
            state.userData = null;
            state.status = false;
        }
    }
})

export const {login, logOut} = authSlice.actions;
export default authSlice.reducer;
