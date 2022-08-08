import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice,
    },
})