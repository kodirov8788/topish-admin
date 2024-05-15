import { createSlice } from '@reduxjs/toolkit';

// Define the initial state for the UI slice
const initialState = {
  openClose: false,
};

// Create the uiSlice with a toggle reducer
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleOpenClose(state) {
      state.openClose = !state.openClose;
    },
  },
});

// Export the actions and the reducer
export const { toggleOpenClose } = uiSlice.actions;
export default uiSlice.reducer;
