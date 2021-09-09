import React from "react";
import FetchMore from "./FetchMore";
import { PopularMoviesStore } from "../store/popularMovies.store";
import { useQuery } from "react-query";
import { fetchPopularMovies } from "../services/fetchPopularMovies.service";
import { fetchPopularMoviesKey } from "../util/appCacheKeys";
import MovieCard from "./MovieCard/MovieCard";
import Overview from "./Overview/Overview";
import AddToWatchList from "./AddToWatchList/AddToWatchList";

function PopularMovies() {
  const [runQuery, setRunQuery] = React.useState(false);

  const popularMovies = PopularMoviesStore((state) => state?.popularMovies);

  const updateCurrentPage = PopularMoviesStore(
    (state) => state?.updateCurrentPage
  );

  const updatePopularMovies = PopularMoviesStore(
    (state) => state?.updatePopularMovies
  );

  const currentPage = PopularMoviesStore((state) => state?.currentPage);

  const { isLoading } = useQuery(
    [fetchPopularMoviesKey, currentPage],
    fetchPopularMovies,
    {
      onSuccess: (result) => {
        setRunQuery(false);
        updateCurrentPage(result, currentPage + 1);
        updatePopularMovies(result);
      },
      enabled: runQuery,
    }
  );

  return (
    <>
      {popularMovies &&
      Array.isArray(popularMovies) &&
      popularMovies?.length !== 0
        ? popularMovies?.map?.((movie) => {
            return (
              <MovieCard
                movie={movie}
                key={movie?.id}
                RightButton={AddToWatchList}
                LeftButton={Overview}
              />
            );
          })
        : null}
      <FetchMore
        fetchMore={setRunQuery}
        isLoading={isLoading}
        // prefetchMore={prefetchMore}
      />
    </>
  );
}

export default PopularMovies;
