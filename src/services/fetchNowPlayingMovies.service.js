import axios from "axios";
import { apiURL } from "../util/misc";

export const fetchNowPlaying = async ({ queryKey }) => {
  const page = queryKey[1] ? queryKey[1] : 1;

  let nowPlaying = await axios.get(`${apiURL}/movie/now_playing`, {
    params: { api_key: process.env.REACT_APP_API_KEY, page, language: "en-US" },
  });

  return nowPlaying?.data;
};
