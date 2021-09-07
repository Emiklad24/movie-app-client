import { axiosInstance } from "../util/axiosInstance";

export const fetchPersonImages = async ({ queryKey }) => {
  const personId = queryKey[1] ? queryKey[1] : 1;

  const moviePerson = await axiosInstance.get(`/person/${personId}/images`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134" },
  });

  return moviePerson?.data;
};
