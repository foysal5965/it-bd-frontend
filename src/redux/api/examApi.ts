import { IMeta } from "@/types"
import { tagTypes } from "../tagTypesList"
import { baseApi } from "./baseApi"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getFromLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/authkey";

const EXAM_URL = '/exam'
export const examApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    exams: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/exam`,
          method: "GET",
          params: arg
        }
      },
      transformErrorResponse: (response, meta: IMeta) => {
        return {
          exams: response,
          meta
        }
      },
      providesTags: [tagTypes.exam]
    }),
    getMyExam: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/exam/my-exams`,
          method: "GET",
          params: arg
        }
      },
      transformErrorResponse: (response, meta: IMeta) => {
        return {
          exams: response,
          meta
        }
      },
      providesTags: [tagTypes.exam]
    }),
    addExamWithFormData: build.mutation({
      query: (data) => ({
        url: "/exam/create-exam",
        method: "POST",
        data,
        contentType: "multipart/form-data"
      }),
      invalidatesTags: [tagTypes.exam],
    }),
    getSingleExam: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `/exam/${id}`,
        method: 'GET',
      }),
      providesTags: [tagTypes.exam],
    }),
    updateExam: build.mutation({
    query: ({id,formData}) => ({
        url: `/exam/update/${id}`,    // Update exam endpoint
        method: 'PATCH',
        formData              // Send FormData directly
      }),
      invalidatesTags: [tagTypes.exam],      // Invalidate cached Exam data so the UI can be refreshed
    }),
    updateExamStatus: build.mutation({
    query: (data) => ({
        url: `/exam/update/status/${data.id}`,    // Update exam endpoint
        method: 'PATCH',
        data             // Send FormData directly
      }),
      invalidatesTags: [tagTypes.exam],      // Invalidate cached Exam data so the UI can be refreshed
    }),


  })
})


export const {
  useAddExamWithFormDataMutation,
  useExamsQuery,
  useGetSingleExamQuery,
  // useUpdateExamMutation
  useUpdateExamStatusMutation,
  useGetMyExamQuery
} = examApi


const token = getFromLocalStorage(authKey);  // Get the token from localStorage (or use a selector if Redux)

// Create the API with proper token handling
export const examUpdateApi = createApi({
  reducerPath: 'examApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://itbd-backend-citdwjy8c-foysal5965s-projects.vercel.app/api/v1",   // Base URL of your API
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `${token}`);  // Set the Bearer token in the Authorization header
      }
      return headers;
    }
  }),
  tagTypes: ['exam'],
  endpoints: (build) => ({
    updateExam: build.mutation({
      query: ({ id, formData }) => ({
        url: `/exam/update/${id}`,    // Update exam endpoint
        method: 'PATCH',              // Use PATCH to update
        body:formData,               // Send FormData directly
      }),
      invalidatesTags: ['exam'],      // Invalidate cached Exam data so the UI can be refreshed
    }),
  }),
});

export const { useUpdateExamMutation } = examUpdateApi;
