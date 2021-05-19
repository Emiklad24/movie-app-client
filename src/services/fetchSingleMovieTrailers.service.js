import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchSingleMovieTrailers = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieTrailers = await axios.get(`${apiURL}/movie/${id}/videos`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      page: 1,
    },
  });
  return movieTrailers?.data?.results;
};
