import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  inventory : any,
  invoiceId : string ,
  quotation : any
}

const initialState: AppState = {
  inventory : null ,
  invoiceId : "",
  quotation :  null
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
    saveQuotation: (state, action: PayloadAction<any>) => {
      state.quotation = action.payload;
    },
  },
});

export const { saveInventory , saveInvoiceId , saveQuotation } =
appSlice.actions;

export default appSlice.reducer;
