import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchSingleMovieDetail = async ({ queryKey }) => {
  const id = queryKey[1] ? queryKey[1] : 1;

  const movieDetail = await axios.get(`${apiURL}/movie/${id}`, {
    params: { api_key: process.env.REACT_APP_API_KEY },
  });

  return movieDetail?.data;
};
