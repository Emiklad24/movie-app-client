import { axiosInstanceAlternate } from "../util/axiosInstance";

/**
 * @desc gets fresh user details..
 * @returns {Object}
 */
export const refreshUserDetails = async () => {
  const user = await axiosInstanceAlternate.get(`/users/me`);
  return user?.data;
};
