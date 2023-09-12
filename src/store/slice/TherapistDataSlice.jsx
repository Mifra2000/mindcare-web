import { createSlice } from "@reduxjs/toolkit";

let initialState = { value: ["okay"] };

const therapistDataSlice = createSlice({
  name: "therapist-data",
  initialState,
  reducers: {
    addTherapistData: (state, action) => {
      state.value = [...action.payload];
    },
  },
});

console.log(therapistDataSlice.actions);

export default therapistDataSlice.reducer;
export const { addTherapistData } = therapistDataSlice.actions;
