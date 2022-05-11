import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import accountsSlice from '../features/account/accountsSlice';
import meSlice from '../features/me/meSlice';
import profilesSlice from '../features/profile/profilesSlice';

const persistConfig = {
  key: 'primary',
  storage,
}

const reducers = combineReducers({
  accounts: accountsSlice,
  me: meSlice,
  profiles: profilesSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
