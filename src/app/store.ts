import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "@/features/auth/slice";
import lqsReducer from "@/features/ws/store/slices/lqs";
import modReducer from "@/features/ws/store/slices/mod";
import lobbyReducer from "@/features/lobby/store/slice";
import wsMiddleware from "@/features/ws/store/middleware";
import WS from "@/features/ws/utils/ws";

const persistConfig = {
  timeout: 500,
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authReducer,
    lqs: lqsReducer,
    lobby: lobbyReducer,
    mod: modReducer,
  })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk, wsMiddleware(new WS())),
});

export const persistor = persistStore(store);
