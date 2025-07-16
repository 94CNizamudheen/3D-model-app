import { configureStore } from '@reduxjs/toolkit';
import modelReducer from '../features/models/modelSlice';

export const store = configureStore({
  reducer: {
    models: modelReducer,
  },
});
