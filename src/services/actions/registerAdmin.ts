"use server";

import { authKey } from "@/constants/authkey";
import { getFromLocalStorage } from "@/utils/local-storage";

const token = getFromLocalStorage(authKey);
export const registerAdmin = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-admin`,
    {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
      cache: "no-store",
    }
  );

  const adminInfo = await res.json();
  return adminInfo;
};
