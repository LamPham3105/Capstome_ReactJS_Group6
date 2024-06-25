import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import orderHistoryReducer from "./reducers/orderHistorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    orderHistory: orderHistoryReducer,
  },
});
