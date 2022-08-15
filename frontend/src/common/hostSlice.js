import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    host: false,
  }
}

export const hostStatusSlice = createSlice({
  name: 'hostStatusUpdater',
  initialState,
  reducers: {
    changeStatus: (state, status) => {
      state.value.host = status.payload;
    }
  }
})

export const { changeStatus } = hostStatusSlice.actions;

export default hostStatusSlice.reducer;