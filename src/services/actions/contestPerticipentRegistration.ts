"use server";

export const registerContestPerticipent = async (formData: FormData) => {
  const res = await fetch(
    `https://itbd-backend.vercel.app/api/v1/manage-contest/registration`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const perticipentInfo = await res.json();
  return perticipentInfo;
};
