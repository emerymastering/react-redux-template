import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  profile: null,
  space: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // data is stored in redux
    loginSuccess: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      state.token = action.payload.token;
      state.profile = action.payload.user;
      state.space = action.payload.user.space;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.profile = null;
    },
    tokenStillValid: (state, action) => {
      console.log("action space", action);
      state.profile = action.payload.user;
      state.space = action.payload.user.space;
    },
    storyDeleteSuccess: (state, action) => {
      const storyId = action.payload;
      state.space.stories = state.space.stories.filter((s) => s.id !== storyId);
    },
  },
});

export const { loginSuccess, logOut, tokenStillValid, storyDeleteSuccess } =
  userSlice.actions;

export default userSlice.reducer;
