import build from "next/dist/build";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tagTypesList";
import { IMeta } from "@/types";

 const resultApi = baseApi.injectEndpoints({
    endpoints:(build)=>({
        addResult: build.mutation({
            query: (data) => ({
               url: `/student-result`,
               method: 'POST',
               data
            }),
            invalidatesTags: [tagTypes.result],
         }), 
         getMyResults: build.query({
            query: (arg: Record<string, any>) => {
              return {
                url: `/student-result/my-results`,
                method: "GET",
                params: arg
              }
            },
            transformErrorResponse: (response, meta: IMeta) => {
              return {
                results: response,
                meta
              }
            },
            providesTags: [tagTypes.result]
          }),
    })
})

export const {
   useAddResultMutation,
   useGetMyResultsQuery
}= resultApi
export default resultApi