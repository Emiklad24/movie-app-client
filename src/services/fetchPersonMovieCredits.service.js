import { axiosInstance } from "../util/axiosInstance";

export const fetchPersonMovieCredits = async ({ queryKey }) => {
  const personId = queryKey[1] ? queryKey[1] : 1;

  const moviePerson = await axiosInstance.get(
    `/person/${personId}/movie_credits`,
    {
      params: { api_key: process.env.REACT_APP_API_KEY },
    }
  );

  return moviePerson?.data;
};
