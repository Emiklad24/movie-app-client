import React from "react";
import { useQuery } from "react-query";
import { fetchTopRatedMovies } from "../services/fetchTopRatedMovies.service";
import { TopRatedMoviesStore } from "../store/topRatedMovies.store";
import { fetchTopRatedMoviesKey } from "../util/appCacheKeys";
import AddToWatchList from "./AddToWatchList/AddToWatchList";
import FetchMore from "./FetchMore";
import MovieCard from "./MovieCard/MovieCard";
import Overview from "./Overview/Overview";

function TopRated() {
  const [runQuery, setRunQuery] = React.useState(false);

  const topRatedMovies = TopRatedMoviesStore((state) => state?.topRatedMovies);

  const updateCurrentPage = TopRatedMoviesStore(
    (state) => state?.updateCurrentPage
  );

  const updateTopRatedMovies = TopRatedMoviesStore(
    (state) => state?.updateTopRatedMovies
  );

  const currentPage = TopRatedMoviesStore((state) => state?.currentPage);

  const { isLoading } = useQuery(
    [fetchTopRatedMoviesKey, currentPage],
    fetchTopRatedMovies,
    {
      onSuccess: (result) => {
        setRunQuery(false);
        updateCurrentPage(result, currentPage + 1);
        updateTopRatedMovies(result);
      },
      enabled: runQuery,
    }
  );

  return (
    <>
      {topRatedMovies.map((movie) => {
        return (
          <MovieCard
            movie={movie}
            key={movie?.id}
            RightButton={AddToWatchList}
            LeftButton={Overview}
          />
        );
      })}
      <FetchMore
        fetchMore={setRunQuery}
        isLoading={isLoading}
        // prefetchMore={prefetchMore}
      />
    </>
  );
}

export default TopRated;
