import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchSingleRecommendedMovies = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movies = await axios.get(`${apiURL}/movie/${id}/recommendations`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      language: "en",
      page: 1,
    },
  });
  return movies?.data?.results;
};
