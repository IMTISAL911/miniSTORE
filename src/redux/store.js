// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import productReducer from "./slices/productSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     product: productReducer,
//   },
// });


import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);