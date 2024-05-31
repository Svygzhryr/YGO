import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setIsActive(state, { payload }: PayloadAction<boolean>) {
      state.isActive = payload;
    },
  },
});

export default notificationSlice.reducer;
