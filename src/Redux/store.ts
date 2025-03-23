import { configureStore } from '@reduxjs/toolkit';
import { restcountries } from './api';

export const store = configureStore({
  reducer: {
    [restcountries.reducerPath]: restcountries.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(restcountries.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
