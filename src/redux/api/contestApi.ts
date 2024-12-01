import { IContest, IMeta } from "@/types";
import { tagTypes } from "../tagTypesList";
import { baseApi } from "./baseApi";

export const contestApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        contests:build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: `/contest`,
                    method: "GET",
                    params: arg
                }
            },
            transformErrorResponse: (response: IContest[], meta: IMeta) => {
                return {
                    contest: response,
                    meta
                }
            },
            providesTags: [tagTypes.contest]
        }),
        addContest: build.mutation({
            query: (data) => ({
                url: "/contest",
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.contest],
        })
    })
})

export const { useAddContestMutation,useContestsQuery } = contestApi