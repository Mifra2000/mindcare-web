import { createSlice } from "@reduxjs/toolkit";

let initialState = { value: ["okay"] };

const postTagsSlice = createSlice({
  name: "post-tags",
  initialState,
  reducers: {
    addPostTags: (state, action) => {
      state.value = [...action.payload];
    },
    removePostTags(state, action) {},
  },
});

console.log(postTagsSlice.actions);

export default postTagsSlice.reducer;
export const { addPostTags } = postTagsSlice.actions;
