import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  newOrdersMsg: any;
}

const initialState: NotificationState = {
    newOrdersMsg: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNewOrderMsg: (state, action: PayloadAction<any>) => {
      state.newOrdersMsg = action.payload;
    },
    removeReadMsg: (state, action: PayloadAction<any>) => {
        state.newOrdersMsg = action.payload;
      },
  },
});

export const { addNewOrderMsg } = notificationSlice.actions;

export default notificationSlice.reducer;
