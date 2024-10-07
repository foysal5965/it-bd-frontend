import { ICourseCategory, IMeta } from "@/types"
import { baseApi } from "./baseApi"
import { tagTypes } from "../tagTypesList"

const COURSE_CATEGORY_URL = '/category'
export const courseCategoryApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //get all course category
        courseCategory: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${COURSE_CATEGORY_URL}`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: ICourseCategory[], meta: IMeta) => {
                return {
                    categoris: response,
                    meta
                }
            },
            providesTags: [tagTypes.courseCategory]
        }),
        getCourseCategory: build.query({
            query: (id: string | string[] | undefined) => ({
               url: `/category/${id}`,
               method: 'GET',
            }),
            providesTags: [tagTypes.courseCategory],
         }),
   
    addCourseCategoryWithFormData: build.mutation({
      query: (data) => ({
        url: "/category/create-category",
        method: "POST",
        data,
        contentType:"multipart/form-data"
      }),
      invalidatesTags: [tagTypes.courseCategory],
    }),

    updateCourseCategory: build.mutation({
        query: (data) => {
           return {
              url: '/category/update',
              method: 'PATCH',
              data,
              contentType: 'multipart/form-data',
           };
        },
        invalidatesTags: [tagTypes.courseCategory],
     }),
    })
})


export const {
     useCourseCategoryQuery,
     useAddCourseCategoryWithFormDataMutation,
     useUpdateCourseCategoryMutation,
     useGetCourseCategoryQuery
     } = courseCategoryApi

