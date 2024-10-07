import { tagTypes } from '../tagTypesList';
import { baseApi } from './baseApi';

export const PAYMENT = '/payment';

const paymentApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      initialPayment: build.mutation({
         query: (id: string) => ({
            url: `/payment/init/${id}`,
            method: 'POST',
         }),
         invalidatesTags: [tagTypes.payment],
      }),
   }),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;
