import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push(action.payload);
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
    },
    editCustomer: (state, action) => {
      const editedCustomerIndex = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      if (editedCustomerIndex !== -1) {
        state.customers[editedCustomerIndex] = action.payload;
      }
    },
  },
});

export const { addCustomer, deleteCustomer, editCustomer } = customerSlice.actions;

export default customerSlice.reducer;
