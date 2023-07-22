import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  inventory : any,
  invoiceId : string ,
  quotation : any,
  customerId : string,
  notificationId :  string
}

const initialState: AppState = {
  inventory : null ,
  invoiceId : "",
  quotation :  null,
  customerId : "",
  notificationId : ""
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
    saveCustomerId: (state, action: PayloadAction<string>) => {
      state.customerId = action.payload;
    },
    saveNotificationId: (state, action: PayloadAction<string>) => {
      state.notificationId = action.payload;
    },
  },
});

export const { saveInventory , saveInvoiceId , saveQuotation , saveCustomerId , saveNotificationId } =
appSlice.actions;

export default appSlice.reducer;
