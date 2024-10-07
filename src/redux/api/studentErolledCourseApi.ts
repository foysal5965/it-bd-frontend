import { ICourseCategory, IMeta } from "@/types"
import { baseApi } from "./baseApi"
import { tagTypes } from "../tagTypesList"

const STUDENT_ENROLLED_COURSE_URL = '/student-enrolled-course'
export const studentEnrolledCourseApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        //get all course category
        studentEnrolledCourse: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${STUDENT_ENROLLED_COURSE_URL}`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response, meta: IMeta) => {
                return {
                    studentEnrolledCourse: response,
                    meta
                }
            },
            providesTags: [tagTypes.studentEnrolledCourse]
        }),
        myCourse: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `${STUDENT_ENROLLED_COURSE_URL}/my-courses`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response, meta: IMeta) => {
                return {
                    myCourse: response,
                    meta
                }
            },
            providesTags: [tagTypes.studentEnrolledCourse]
        }),


        addStudentEnrolledCourse: build.mutation({
            query: (data) => ({
                url: `${STUDENT_ENROLLED_COURSE_URL}`,
                method: "POST",
                data,
                contentType: 'application/json'
            }),
            invalidatesTags: [tagTypes.studentEnrolledCourse],
        }),
    })
})


export const {
    useStudentEnrolledCourseQuery,
     useAddStudentEnrolledCourseMutation,
     useMyCourseQuery
} = studentEnrolledCourseApi

