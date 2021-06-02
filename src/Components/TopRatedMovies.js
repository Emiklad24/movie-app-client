import React from "react";
import { useQuery } from "react-query";
import { fetchTopRatedMovies } from "../services/fetchTopRatedMovies.service";
import { TopRatedMoviesStore } from "../store/topRatedMovies.store";
import { fetchTopRatedMoviesKey } from "../util/appCacheKeys";
// import { queryClient } from "../util/misc";
import FetchMore from "./FetchMore";
import MovieCard from "./MovieCard";

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

  // const prefetchMore = () => {
  //   queryClient.prefetchQuery(
  //     [fetchTopRatedMoviesKey, currentPage],
  //     fetchTopRatedMovies
  //   );
  // };

  return (
    <>
      {topRatedMovies.map((movie) => {
        if (movie.id === 582885) {
          return null;
        }
        return (
          <MovieCard
            movie={movie}
            key={movie.id}
            canDelete={false}
            onWatchlist={false}
            forceUpdate={true}
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
