import { IContest, IMeta } from "@/types";
import { tagTypes } from "../tagTypesList";
import { baseApi } from "./baseApi";

export const contestPercipentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // contests:build.query({
        //     query: (arg: Record<string, any>) => {
        //         return {
        //             url: `/contest`,
        //             method: "GET",
        //             params: arg
        //         }
        //     },
        //     transformErrorResponse: (response: IContest[], meta: IMeta) => {
        //         return {
        //             contest: response,
        //             meta
        //         }
        //     },
        //     providesTags: [tagTypes.contest]
        // }),
        registerPerticipent: build.mutation({
            query: (data) => ({
                url: "/manage-contest/registration",
                method: "POST",
                data,
                contentType: "multipart/form-data"
            }),
            invalidatesTags: [tagTypes.contest],
        })
    })
})

export const { useRegisterPerticipentMutation } = contestPercipentApi