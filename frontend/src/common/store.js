import { configureStore } from "@reduxjs/toolkit";
import hostSlice from "./hostSlice";
import tokenSlice from "./tokenSlice";

export const store = configureStore({
    reducer: {
        token: tokenSlice,
        hostStatus: hostSlice,
    },
})