import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  inventory : any,
  invoiceId : string
  
}

const initialState: AppState = {
  inventory : null ,
  invoiceId : ""
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    saveInventory: (state, action: PayloadAction<any>) => {
      state.inventory = action.payload;
    },
    saveInvoiceId: (state, action: PayloadAction<string>) => {
      state.invoiceId = action.payload;
    },
  },
});

export const { saveInventory , saveInvoiceId } =
appSlice.actions;

export default appSlice.reducer;
