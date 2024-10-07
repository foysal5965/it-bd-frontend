import { IAdmin, ICourse, ICourseCategory, IMeta } from "@/types"
import { baseApi } from "./baseApi"
import { tagTypes } from "../tagTypesList"

const ADMIN_URL = '/admin'
export const adminApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //get all course 
        admin: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${ADMIN_URL}`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response:IAdmin[], meta: IMeta) => {
                return {
                    admin: response,
                    meta
                }
            },
            providesTags: [tagTypes.admin]
        }),
        deleteadmin: build.mutation({
            query: (id) => ({
               url: `/admin/${id}`,
               method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.admin],
         }),
        // updateAdmin: build.mutation({
        //     query: (id) => ({
        //        url: `/admin/${id}`,
        //        method: 'PATCH',
        //     }),
        //     invalidatesTags: [tagTypes.admin],
        //  }),
    // addCourseWithFormData: build.mutation({
    //   query: (data) => ({
    //     url: "/course/create-course",
    //     method: "POST",
    //     data,
    //     contentType:"multipart/form-data"
    //   }),
    //   invalidatesTags: [tagTypes.course],
    // }),
    })
})


export const {
     useAdminQuery,
     useDeleteadminMutation,
    //  useUpdateAdminMutation
     } = adminApi

