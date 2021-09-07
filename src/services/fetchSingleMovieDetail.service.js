import { axiosInstance } from "../util/axiosInstance";

export const fetchSingleMovieDetail = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieDetail = await axiosInstance.get(`/movie/${id}`, {
    params: { api_key: process.env.REACT_APP_API_KEY },
  });

  return movieDetail?.data;
};
