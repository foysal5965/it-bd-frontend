import { ICourse, ICourseCategory, IMeta, IStudent } from "@/types"
import { baseApi } from "./baseApi"
import { tagTypes } from "../tagTypesList"

const STUDENT_URL = '/student'
export const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //get all course 
        student: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${STUDENT_URL}`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: IStudent[], meta: IMeta) => {
                return {
                    course: response,
                    meta
                }
            },
            providesTags: [tagTypes.student]
        }),
        
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


export const{useStudentQuery}= studentApi
