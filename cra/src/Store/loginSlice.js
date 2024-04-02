import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
};

const loginSlice = createSlice({
  name: "LOGIN",
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.name = actions.payload.name;
    },
  },
});

export const login = loginSlice.actions;
export default loginSlice;
