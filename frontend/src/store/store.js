import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist';
import subscriberSlice from "./subscriberSlice";


const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, subscriberSlice)
export const store = configureStore({
    reducer:{
        auth:authSlice,
        subscribe:persistedReducer,

    },
    // reducer: {subscribe: subscriberSlice}
})

export const persistor = persistStore(store)