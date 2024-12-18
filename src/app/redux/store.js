import { configureStore } from '@reduxjs/toolkit';
import {  propertiesService } from './services/propertiesService';

export const store = configureStore({
  reducer: {


    [propertiesService.reducerPath]: propertiesService.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(propertiesService.middleware),
});