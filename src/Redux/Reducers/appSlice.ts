import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  inventory : any
}

const initialState: AppState = {
  inventory : {}
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveInventory: (state, action: PayloadAction<any>) => {
      state.inventory = action.payload;
    },
   
  },
});

export const { saveInventory } =
appSlice.actions;

export default appSlice.reducer;
