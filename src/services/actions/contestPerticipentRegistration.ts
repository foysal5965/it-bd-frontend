"use server";

export const registerContestPerticipent = async (formData: FormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/manage-contest/registration`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const perticipentInfo = await res.json();
  return perticipentInfo;
};
