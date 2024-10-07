
import { createApi } from '@reduxjs/toolkit/query/react'

import { tagTypesList } from '../tagTypesList'
import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { getBaseUrl } from '@/helpers/axios/config/envConfig'


// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
    endpoints: () => ({}),
  tagTypes: tagTypesList
})
