// "use server";

import { FieldValues } from 'react-hook-form';
import setAccessToken from './setAccessToken';

export const userLogin = async (data: FieldValues) => {

   const res = await fetch(
      `http://localhost:3000/api/v1/auth/login`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),
         credentials: 'include',
      }
   );

   const userInfo = await res.json()
   

   if (userInfo?.data?.accessToken) {
      setAccessToken(userInfo.data.accessToken, {
         redirect: '/dashboard',
      });
   } else {
      return userInfo
   }

   return userInfo
};
