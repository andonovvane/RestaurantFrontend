import { createSlice } from '@reduxjs/toolkit'

const getUserDetails = () => {
    try {
        const details = localStorage.getItem("userDetails");
        return details ? JSON.parse(details) : null;
    } catch {
        return null;
    }
};

const getAccessToken = () => {
    const token = localStorage.getItem("accessToken");
    return token && token !== "undefined" && token !== "null" ? token : null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        accessToken: getAccessToken(),
        details: getUserDetails(),
    },
    reducers: {
        login: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.details = action.payload.details;
        },
        logout: (state) => {
            state.accessToken = null;
            state.details = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userDetails");
        },
    },
});

export const { login, logout } = userSlice.actions;
export const selectDetails = (state) => state.user.details;
export const selectAccessToken = (state) => state.user.accessToken;

export default userSlice.reducer;