import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        phone: '',
        accessToken: '',
        auctionResultId: '',
        isSalesHistory: false,
    }
}

export const tokenSlice = createSlice({
    name: 'tokenUpdater',
    initialState,
    reducers: {
        save: (state, token) => {
            state.value = {
                ...state.value,
                ...token.payload
            }
        }
    }
})

export const { save } = tokenSlice.actions;

export default tokenSlice.reducer;