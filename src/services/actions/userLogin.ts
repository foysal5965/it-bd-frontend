// "use server";

import { FieldValues } from 'react-hook-form';
import setAccessToken from './setAccessToken';
import { getNewAccessToken } from '../authService';
import axios from 'axios';
import { setToLocalStorage } from '@/utils/local-storage';
import { authKey } from '@/constants/authkey';

export const userLogin = async (data: FieldValues) => {

   const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data),

      }
   );
   const userInfo = await res.json();


   if (userInfo.data.accessToken) {
      setAccessToken(userInfo.data.accessToken);
      
   }

   return userInfo;
};
