import { configureStore, ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import accountsSlice from '../features/account/accountsSlice';
import meSlice from '../features/me/meSlice';
import profilesSlice from '../features/profile/profilesSlice';

const persistConfig = {
  key: 'primary',
  storage,
  blacklist: ['me']
}

const mePersistConfig = {
  key: 'me',
  storage,
  blacklist: ['error']
}

const reducers = combineReducers({
  accounts: accountsSlice,
  me: persistReducer(mePersistConfig, meSlice),
  profiles: profilesSlice
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
