import { configureStore, ReducerType } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../features/authApi';
import { analyticsApi } from '../features/analyticsApi';
import { wtcApi } from '../features/wtcfetchApi';
import { wtcAnalyticsApi } from '../features/wtcanalyticsApi';
import { TypeDistributionApi } from '../features/Typedistribution';
import {DepartmentRouteApi} from '../features/DepartmentRouteApi'
export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [wtcApi.reducerPath]: wtcApi.reducer,
    [wtcAnalyticsApi.reducerPath]: wtcAnalyticsApi.reducer,
    [TypeDistributionApi.reducerPath]: TypeDistributionApi.reducer,
    [DepartmentRouteApi.reducerPath]: DepartmentRouteApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      analyticsApi.middleware,
      wtcApi.middleware,
      wtcAnalyticsApi.middleware,
      TypeDistributionApi.middleware,
      DepartmentRouteApi.middleware,
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
