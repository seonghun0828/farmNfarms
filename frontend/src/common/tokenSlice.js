import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        isLogin: false,
        phone: '',
        accessToken: ''
    }
}

export const tokenSlice = createSlice({
    name: 'tokenUpdater',
    initialState,
    reducers: {
        save: (state, token) => {
            state.value = token.payload;
        }
    }
})

export const { save } = tokenSlice.actions;

export default tokenSlice.reducer;