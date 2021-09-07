import { axiosInstance } from "../util/axiosInstance";

export const fetchPersonTvCredits = async ({ queryKey }) => {
  const personId = queryKey[1] ? queryKey[1] : 1;

  const moviePerson = await axiosInstance.get(
    `/person/${personId}/tv_credits`,
    {
      params: { api_key: "034af975420c91a0afd14fb5ddee1134" },
    }
  );

  return moviePerson?.data;
};
