import { configureStore, combineReducers } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import authSlice from "./slices/authSlice";
import productSlice from "./slices/productSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
  product: productSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store)

export default store;
