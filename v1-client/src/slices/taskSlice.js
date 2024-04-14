import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskDetails: (state, action) => {
      const { id, title, description } = action.payload;
      state.tasks.push({
        id,
        title,
        description,
        // Access userInfo from action.payload instead of localStorage
        author: action.payload.userInfo.username,
      });
    },
  },
});

export const { setTaskDetails } = taskSlice.actions;
export default taskSlice.reducer;
