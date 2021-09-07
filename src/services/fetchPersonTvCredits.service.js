import { axiosInstance } from "../util/axiosInstance";

export const fetchPersonTvCredits = async ({ queryKey }) => {
  const personId = queryKey[1] ? queryKey[1] : 1;

  const moviePerson = await axiosInstance.get(
    `/person/${personId}/tv_credits`,
    {
      params: { api_key: process.env.REACT_APP_API_KEY },
    }
  );

  return moviePerson?.data;
};
