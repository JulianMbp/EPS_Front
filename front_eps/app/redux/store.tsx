

import { configureStore } from '@reduxjs/toolkit';

import citasReducer from './slice/citasslice';


const store = configureStore({
  reducer: {
    citas: citasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
