import { configureStore } from "@reduxjs/toolkit";
import postTagsSlice from "./slice/TagsSlice";

const store = configureStore({
  reducer: {
    postTags: postTagsSlice,
  },
  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
