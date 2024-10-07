import { combineReducers } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import loadingReducer from './loadinSlice'

// Combine reducers including loading and baseApi
export const reducer = combineReducers({
    loading: loadingReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    // Add other reducers here
  });