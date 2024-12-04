//@ts-nocheck
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

// Importing APIs
import { authApi } from '../features/authApi';
import { analyticsApi } from '../features/analyticsApi';
import { wtcApi } from '../features/wtcfetchApi';
import { wtcAnalyticsApi } from '../features/wtcanalyticsApi';
import { TypeDistributionApi } from '../features/Typedistribution';
import { DepartmentRouteApi } from '../features/DepartmentRouteApi';
import { wtcCardAnalytics } from '../features/wtcCard';
import { modedistributionApi } from '../features/modedistribution';
import { projectCardApi } from '../features/projectcardApi'

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add the API reducers here as slices in the store
    [authApi.reducerPath]: authApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [wtcApi.reducerPath]: wtcApi.reducer,
    [wtcAnalyticsApi.reducerPath]: wtcAnalyticsApi.reducer,
    [TypeDistributionApi.reducerPath]: TypeDistributionApi.reducer,
    [DepartmentRouteApi.reducerPath]: DepartmentRouteApi.reducer,
    [wtcCardAnalytics.reducerPath]: wtcCardAnalytics.reducer,
    [modedistributionApi.reducerPath]: modedistributionApi.reducer,
    [projectCardApi.reducerPath]: projectCardApi.reducer,
  },
  // Adding the API middleware to enable features like caching and refetching
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      analyticsApi.middleware,
      wtcApi.middleware,
      wtcAnalyticsApi.middleware,
      TypeDistributionApi.middleware,
      DepartmentRouteApi.middleware,
      wtcCardAnalytics.middleware,
      modedistributionApi.middleware, 
      projectCardApi.middleware, 
    ),
});

// Setup listeners for refetchOnFocus, refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Optionally, export the type of the store if you need to use it elsewhere
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
