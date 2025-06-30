"use client";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
const persistConfig = {
	key: "root",
	storage: storage,
	whitelist: [],
	blacklist: [],
	transforms: [],
};

const reducers = combineReducers({});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
