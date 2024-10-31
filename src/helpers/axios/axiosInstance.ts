import { authKey } from '@/constants/authkey';
import setAccessToken from '@/services/actions/setAccessToken';
import { getNewAccessToken, storeUserInfo } from '@/services/authService';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Request interceptor to add Authorization header
instance.interceptors.request.use(
   async function (config) {
      const accessToken = getFromLocalStorage(authKey);
      if (accessToken) {
         config.headers.Authorization = accessToken;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);

// Response interceptor for handling token expiration and refresh logic
instance.interceptors.response.use(
   function (response: AxiosResponse) {
      const responseObject: ResponseSuccessType = {
         data: response.data.data,
         meta: response.data.meta,
      };
      return {
         ...response,
         data: responseObject,
      } as AxiosResponse<ResponseSuccessType>;
   },
   async function (error) {
      const config = error.config;

      if (error?.response?.status === 500 && !config.sent) {
         config.sent = true;
         try {
            const response = await getNewAccessToken();
            const accessToken = response?.data?.data?.accessToken;
            config.headers['Authorization'] = accessToken;
            setToLocalStorage(authKey, accessToken);
            setAccessToken(accessToken);
            return instance(config);
         } catch (refreshError) {
            // Handle refresh token errors (e.g., refresh token expired, user needs to log in again)
            console.error('Failed to refresh access token', refreshError);
            return Promise.reject(refreshError);
         }
      }
      const responseObject: IGenericErrorResponse = {
         statusCode: error?.response?.data?.statusCode || 500,
         message:
            error?.response?.data?.message || 'Something went wrong!!!',
         errorMessages: error?.response?.data?.message,
      };
      // return Promise.reject(error);
      return Promise.reject(responseObject);
   }
);

export { instance };
