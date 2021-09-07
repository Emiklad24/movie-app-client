import { axiosInstance } from "../util/axiosInstance";

export const fetchUpcomingMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let upcomingMovies = await axiosInstance.get(`/movie/upcoming`, {
    params: { api_key: "034af975420c91a0afd14fb5ddee1134", page },
  });
  return upcomingMovies?.data;
};
