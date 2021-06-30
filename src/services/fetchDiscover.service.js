import axios from "axios";
import { apiURL } from "../util/misc";
// import qs from "qs";

export const fetchDiscoverMovies = async ({ queryKey }) => {
  let nowPlaying = await axios.get(`${apiURL}/discover/movie`, {
    params: {
      api_key: process.env.REACT_APP_API_KEY,
      language: "en-US",
      page: 1,
      include_adult: true,
      primary_release_year: undefined,
      year: undefined,
      with_genres: "",
      sort_by: "sort_by=popularity.desc",
      with_watch_monetization_types: undefined,
      include_video: true,
    },
  });

  return nowPlaying?.data;
};

// https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate
