import { authKey } from '@/constants/authkey';
import setAccessToken from '@/services/actions/setAccessToken';
import { getNewAccessToken } from '@/services/authService';
import { IGenericErrorResponse, ResponseSuccessType } from '@/types';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
   async function (config) {
      const accessToken = getFromLocalStorage(authKey);
      if (accessToken) {
         config.headers.Authorization = accessToken;
      }
      return config;
   },
   function (error) {
      // Handle request error
      return Promise.reject(error);
   }
);

// Add a response interceptor
instance.interceptors.response.use(
   function (response: AxiosResponse) {
      // Create a response object based on the expected format
      const responseObject: ResponseSuccessType = {
         data: response.data.data,
         meta: response.data.meta,
      };
      // Return the original response along with your custom object
      return {
         ...response,
         data: responseObject, // Replace the data with your custom response
      } as AxiosResponse<ResponseSuccessType>; // Type assertion
   },
   async function (error) {
      const config = error.config;

      // Handle server errors and token refresh logic
      if (error?.response?.status === 401 && !config.sent) {
         config.sent = true; // Prevent repeated token refresh attempts

         try {
            const refreshResponse = await getNewAccessToken();
            const accessToken = refreshResponse?.data?.accessToken;

            if (accessToken) {
               // Set the new access token in headers
               config.headers['Authorization'] = accessToken;
               setToLocalStorage(authKey, accessToken);
               setAccessToken(accessToken);

               // Retry the original request with the new access token
               return instance(config);
            }
         } catch (refreshError) {
            // Handle token refresh errors
            return Promise.reject(refreshError);
         }
      }

      // Handle other errors
      const responseObject: IGenericErrorResponse = {
         statusCode: error?.response?.data?.statusCode || 500,
         message: error?.response?.data?.message || 'Something went wrong!',
         errorMessages: error?.response?.data?.errorMessages || [],
      };

      return Promise.reject(responseObject);
   }
);

export { instance };
