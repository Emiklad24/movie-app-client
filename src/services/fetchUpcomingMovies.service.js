import { axiosInstance } from "../util/axiosInstance";

export const fetchUpcomingMovies = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let upcomingMovies = await axiosInstance.get(`/movie/upcoming`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page },
  });
  return upcomingMovies?.data;
};
