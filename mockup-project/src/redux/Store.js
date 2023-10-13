// store.js

import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "../redux/Customers";

const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
});

export default store;
