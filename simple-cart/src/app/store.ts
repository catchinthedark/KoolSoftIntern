import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import ProductsReducer from '../features/products/productsSlice'
import CartReducer from '../features/cart/cartSlice'

const persistConfig = {
  key: 'primary',
  storage,
}

const reducers = combineReducers({
    products: ProductsReducer,
    cart: CartReducer
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
