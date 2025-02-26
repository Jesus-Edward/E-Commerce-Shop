import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: '',
    user: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser(state, action) {
            state.user = action.payload
        },
        setIsLoggedInOut(state, action) {
            state.isLoggedIn = action.payload
        },
        setToken(state, action) {
            state.token = action.payload
        },
    }
})


const userReducer = userSlice.reducer;
export const { setCurrentUser, setIsLoggedInOut, setToken } = userSlice.actions;

export default userReducer;
