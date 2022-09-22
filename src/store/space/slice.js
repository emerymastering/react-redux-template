import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: true,
  allSpaces: [],
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    startLoadingSpace: (state) => {
      state.loading = true;
    },
    spaceFullyFetched: (state, action) => {
      //   console.log("action:", action);
      //   console.log("action", action.payload.space);
      state.allSpaces = action.payload.space;
    },
    doneLoadingSpace: (state) => {
      state.loading = false;
    },
  },
});

export const { startLoadingSpace, spaceFullyFetched, doneLoadingSpace } =
  spaceSlice.actions;

export default spaceSlice.reducer;
