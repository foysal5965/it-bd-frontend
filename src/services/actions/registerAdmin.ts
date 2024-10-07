"use server";

export const registerAdmin = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/create-admin`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const adminInfo = await res.json();
  return adminInfo;
};
