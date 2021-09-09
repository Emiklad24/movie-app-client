import { axiosInstanceAlternate } from "../util/axiosInstance";

export const authCallback = async (token) => {
  const res = await axiosInstanceAlternate({
    method: "get",
    url: `/auth/google/callback${token}`,
    headers: undefined,
  });

  return res?.data;
};
