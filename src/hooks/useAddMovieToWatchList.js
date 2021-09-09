import { useMutation } from "react-query";
import { postWatchlist } from "../services/postWatchlist.service";
import {
  addWatchListskey,
  fetchSingleMovieDetailKey,
  fetchSingleMovieTrailersKey,
  fetchSingleMovieCastKey,
  fetchRecommendedMoviesKey,
  fetchSimilarMoviesKey,
  fetchMovieGalleryKey,
} from "../util/appCacheKeys";
import swal from "sweetalert";
import { toast } from "react-toastify";
import useUserCredentialsStore from "../store/auth.store";
import shallow from "zustand/shallow";
import { genres } from "../Constant/MovieGenres";
import { queryClient } from "../util/misc";
import { fetchSingleMovieDetail } from "../services/fetchSingleMovieDetail.service";
import { fetchSingleMovieTrailers } from "../services/fetchSingleMovieTrailers.service";
import { fetchSingleMovieCast } from "../services/fetchSingleMovieCast.service";
import { fetchSingleRecommendedMovies } from "../services/fetchSingleRecommendedMovies.service";
import { fetchSingleSimilarMovies } from "../services/fetchSingleSimilarMovies.service";
import { fetchSingleMovieGallery } from "../services/fetchSingleMovieGallery.service";
import { loginPopupHandler } from "../util/loginPopupHandler";
import useGetWatchlistsIds from "./useGetWatchlistsIds";

export default function useAddMovieToWatchList(movie) {
  const { ids } = useGetWatchlistsIds();
  const { isAuthenticated, userDetails } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state?.isAuthenticated,
      userDetails: state?.userDetails,
    }),
    shallow
  );

  const { isError, isLoading, data, mutate, reset } = useMutation({
    mutationFn: postWatchlist,
    mutationKey: addWatchListskey,
    onSuccess: () => {
      const addedWatchlistName =
        movie?.title ||
        movie?.original_name ||
        movie?.original_title ||
        "Movie";

      toast.success(
        `${addedWatchlistName} has been added to your watchlist successfully`
      );
      queryClient.refetchQueries();
    },

    onError: (error) => {
      toast.error(error?.message);
    },
  });

  const addWatchlistsHandler = () => {
    const movieWatchlist =
      movie?.title || movie?.original_name || movie?.original_title;
    console.log(movie?.id);
    //reject if user isnot logged in
    if (!isAuthenticated) {
      swal({
        title: ` Sorry 😔 😔 😔`,
        text: `You have to join to add "${movieWatchlist}" to your watchlist`,
        buttons: ["OK", "Join"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) {
          loginPopupHandler();
        }
      });
      return;
    }
    if (ids?.includes?.(movie?.id?.toString())) {
      swal({
        title: ` Sorry 😔 😔 😔`,
        text: `You already have "${movieWatchlist}" movie in your watchlist`,
      });
      return;
    }

    const uniqueMovieId = userDetails?.id + movie?.id?.toString();
    const currentMovieName =
      movie?.title || movie?.original_name || movie?.original_title;
    mutate({
      ...movie,
      movieId: movie?.id?.toString(),
      userId: userDetails?.id,
      archived: false,
      uniqueMovieId,
      title: currentMovieName,
      users_permissions_user: userDetails?.id,
    });
    return;
  };

  return {
    isError,
    isLoading,
    data,
    mutate,
    reset,
    addWatchlistsHandler,
  };
}

export const viewMore = (movie) => {
  const currentMovieId = movie.id || movie.movieId;
  const movieName = movie.title || movie.original_name || movie.original_title;
  swal({
    title: `${movieName}`,
    text: `${movie.overview}`,
    buttons: ["OK", "View more"],
    dangerMode: true,
  }).then((willView) => {
    if (willView) {
      window.location.href = `/${movieName}?id=${currentMovieId}`;
    }
  });
};

export const getGenre = (movie) => {
  let genre = "";
  if (movie) {
    genre = movie.map((id) => {
      const item = genres.find((item) => item.id === id);
      return item ? `${item.name} | ` : null;
    });
  }
  return genre;
};

export const prefetchAllRelatedQueries = (currentMovieId) => {
  const staleTime = 30000;
  const cacheTime = 30000;
  queryClient.prefetchQuery(
    [fetchSingleMovieDetailKey, currentMovieId],
    fetchSingleMovieDetail,
    {
      staleTime,
      cacheTime,
    }
  );
  queryClient.prefetchQuery(
    [fetchSingleMovieTrailersKey, currentMovieId],
    fetchSingleMovieTrailers,
    {
      staleTime,
      cacheTime,
    }
  );
  queryClient.prefetchQuery(
    [fetchSingleMovieCastKey, currentMovieId],
    fetchSingleMovieCast,
    {
      staleTime,
      cacheTime,
    }
  );
  queryClient.prefetchQuery(
    [fetchRecommendedMoviesKey, currentMovieId],
    fetchSingleRecommendedMovies,
    {
      staleTime,
      cacheTime,
    }
  );
  queryClient.prefetchQuery(
    [fetchSimilarMoviesKey, currentMovieId],
    fetchSingleSimilarMovies,
    {
      staleTime,
      cacheTime,
    }
  );
  queryClient.prefetchQuery(
    [fetchMovieGalleryKey, currentMovieId],
    fetchSingleMovieGallery,
    {
      staleTime,
      cacheTime,
    }
  );
};
