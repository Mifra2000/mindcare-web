import { configureStore } from "@reduxjs/toolkit";
import postTagsSlice from "./slice/TagsSlice";
import therapistDataSlice from "./slice/TherapistDataSlice";

const store = configureStore({
  reducer: {
    postTags: postTagsSlice,
    therapistData: therapistDataSlice,
  },

  //   devTools: process.env.NODE_ENV !== "production",
});

export default store;
