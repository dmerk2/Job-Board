import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    title: "",
  },
  reducers: {
    setTitle: (state, action) => {
      console.log("action.payload", action.payload);
      state.title = action.payload;
    },
  },
});

export const { setTitle } = jobSlice.actions;
export default jobSlice.reducer;
