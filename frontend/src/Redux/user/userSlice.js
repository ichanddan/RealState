import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
    userLogin:false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.userLogin = true;
            state.error = null;
            },
            signInFailure: (state, action) => {
                state.error = action.payload;
                state.userLogin = false;
            state.loading = false;
        },
        profileUpdateStart:(state)=>{
            state.loading = true;
        },
        profileUpdateSuccess:(state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        profileUpdateFailure:(state, action)=>{
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { signInStart, signInSuccess, signInFailure, profileUpdateFailure, profileUpdateStart, profileUpdateSuccess } = userSlice.actions;

export default userSlice.reducer;