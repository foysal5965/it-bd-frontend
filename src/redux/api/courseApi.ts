import { ICourse, ICourseCategory, IMeta } from "@/types"
import { baseApi } from "./baseApi"
import { tagTypes } from "../tagTypesList"

const COURSE_URL = '/course'
export const courseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //get all course 
        course: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${COURSE_URL}`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: ICourse[], meta: IMeta) => {
                return {
                    course: response,
                    meta
                }
            },
            providesTags: [tagTypes.course]
        }),
        getSingleCourse: build.query({
            query: (id: string | string[] | undefined) => ({
               url: `/course/${id}`,
               method: 'GET',
            }),
            providesTags: [tagTypes.course],
         }),
    addCourseWithFormData: build.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        data,
        contentType:"multipart/form-data"
      }),
      invalidatesTags: [tagTypes.course],
    }),
    })
})


export const {
     
     useAddCourseWithFormDataMutation,
     useCourseQuery,
     useGetSingleCourseQuery
     } = courseApi

