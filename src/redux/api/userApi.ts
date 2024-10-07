
import { IMeta, User } from '@/types';
import { tagTypes } from '../tagTypesList';
import { baseApi } from './baseApi';
const USER_URL = '/user';

export const authApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      
    user: build.query({
        query: (arg: Record<string, any>) => {
            return {
                url: `${USER_URL}`,
                method: "GET",
                params: arg
            }
        },
        transformErrorResponse: (response: User[], meta: IMeta) => {
            return {
                course: response,
                meta
            }
        },
        providesTags: [tagTypes.course]
    }),
      
      
   }),
});

export const {
   useUserQuery
} = authApi;
