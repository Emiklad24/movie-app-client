import React from "react";
import MovieCard from "./MovieCard/MovieCard";
import FetchMore from "./FetchMore";
import { useQuery } from "react-query";
import { fetchUpcomingMoviesKey } from "../util/appCacheKeys";
import { fetchUpcomingMovies } from "../services/fetchUpcomingMovies.service";
import { upcomingMoviesStore } from "../store/upcomingMovies.store";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

function UpcomingMovies() {
  const [runQuery, setRunQuery] = React.useState(false);

  const upcomingMovies = upcomingMoviesStore((state) => state?.upcomingMovies);

  const updateCurrentPage = upcomingMoviesStore(
    (state) => state?.updateCurrentPage
  );
  const updateUpcomingMovies = upcomingMoviesStore(
    (state) => state?.updateUpcomingMovies
  );
  const currentPage = upcomingMoviesStore((state) => state?.currentPage);

  const { isLoading } = useQuery(
    [fetchUpcomingMoviesKey, currentPage],
    fetchUpcomingMovies,
    {
      onSuccess: (result) => {
        setRunQuery(false);
        updateCurrentPage(result, currentPage + 1);
        updateUpcomingMovies(result);
      },
      enabled: runQuery,
    }
  );

  return (
    <>
      {upcomingMovies.map((movie) => {
        return (
          <MovieCard
            movie={movie}
            key={movie?.id}
            RightButton={AddToWatchList}
            LeftButton={Overview}
          />
        );
      })}
      <FetchMore fetchMore={setRunQuery} isLoading={isLoading} />
    </>
  );
}

export default UpcomingMovies;
