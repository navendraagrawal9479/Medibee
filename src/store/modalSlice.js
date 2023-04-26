import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setOpen: (state, {payload}) => {
      state.open = payload.open
    }
  }
});

export const {setOpen} = modalSlice.actions;

export default modalSlice.reducer;