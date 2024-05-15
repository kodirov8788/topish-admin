import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/AuthApi';
import authSlice from './auth/AuthSlice';
import uiReducer from './features/apiSlice'; // make sure the path is correct

const store = configureStore({
  reducer: {
    // Add the API reducers to the store
    [authApi.reducerPath]: authApi.reducer,
    // Add the auth and UI reducers
    auth: authSlice,
    ui: uiReducer, // Add the UI slice reducer here
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
