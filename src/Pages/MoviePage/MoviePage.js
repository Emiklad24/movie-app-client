import React, { useState } from "react";
import MovieGallery from "../../Components/MovieGallery";
import MoviePageCard from "../../Components/MoviePageCard/MoviePageCard";
import MovieActorList from "../../Components/MovieActorList";
import { Redirect, useLocation } from "react-router-dom";
import RecommendedMovies from "../../Components/RecommendedMovies";
import SimilarMovies from "../../Components/SimilarMovies/SimilarMovies";
import "../../Styles/MoviesMenu.css";
import Search from "../../Components/Search";
import Error from "../Erro404";
import MovietrailerList from "../../Components/MovieTrailerList";
import { useQuery } from "react-query";
import {
  fetchSingleMovieTrailersKey,
  fetchSingleMovieDetailKey,
  fetchSingleMovieCastKey,
  fetchRecommendedMoviesKey,
  fetchSimilarMoviesKey,
  fetchMovieGalleryKey,
} from "../../util/appCacheKeys";
import { fetchSingleSimilarMovies } from "../../services/fetchSingleSimilarMovies.service";
import { fetchSingleRecommendedMovies } from "../../services/fetchSingleRecommendedMovies.service";
import { fetchSingleMovieGallery } from "../../services/fetchSingleMovieGallery.service";
import { fetchSingleMovieDetail } from "../../services/fetchSingleMovieDetail.service";
import { fetchSingleMovieCast } from "../../services/fetchSingleMovieCast.service";
import { fetchSingleMovieTrailers } from "../../services/fetchSingleMovieTrailers.service";
import MovieCrewList from "../../Components/MovieCrewList";
function MoviePage() {
  const { pathname, search } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  const [id] = useState(search.substring(4));

  const movieDetail = useQuery(
    [fetchSingleMovieDetailKey, id],
    fetchSingleMovieDetail
  );
  const movieCast = useQuery(
    [fetchSingleMovieCastKey, id],
    fetchSingleMovieCast
  );
  const movieTrailers = useQuery(
    [fetchSingleMovieTrailersKey, id],
    fetchSingleMovieTrailers
  );
  const movieGallery = useQuery(
    [fetchMovieGalleryKey, id],
    fetchSingleMovieGallery
  );

  const moviesRecommended = useQuery(
    [fetchRecommendedMoviesKey, id],
    fetchSingleRecommendedMovies
  );
  const moviesSimilar = useQuery(
    [fetchSimilarMoviesKey, id],
    fetchSingleSimilarMovies
  );

  if (!id || id === "") {
    return <Redirect to="/" />;
  }

  return (
    <>
      {movieDetail && movieDetail?.data ? (
        <MoviePageCard
          movie={movieDetail?.data}
          pathname={pathname?.substr?.(1)}
        />
      ) : movieDetail?.isLoading ? (
        <div
          className="container uk-animation-fade mt-5"
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="loading-icon">
            <i className="fa fa-spinner fa-2x fa-pulse fa-fw"></i>
          </div>
        </div>
      ) : null}

      {movieTrailers &&
        movieTrailers?.data &&
        Array.isArray(movieTrailers?.data) &&
        movieTrailers?.data?.length !== 0 && (
          <MovietrailerList trailers={movieTrailers?.data} />
        )}

      {movieCast && movieCast?.data && movieCast?.data?.length !== 0 && (
        <MovieActorList actors={movieCast?.data?.cast} />
      )}
      {movieCast && movieCast?.data && movieCast?.data?.length !== 0 && (
        <MovieCrewList crew={movieCast?.data?.crew} />
      )}

      {movieGallery &&
        movieGallery?.data &&
        movieGallery?.data?.length !== 0 && (
          <MovieGallery posters={movieGallery?.data} />
        )}
      {moviesRecommended &&
        moviesRecommended?.data &&
        Array.isArray(moviesRecommended?.data) &&
        moviesRecommended?.data?.length !== 0 && (
          <div className="container card-row">
            <div className="row">
              <RecommendedMovies recommendations={moviesRecommended?.data} />
            </div>
          </div>
        )}
      {moviesSimilar &&
        moviesSimilar?.data &&
        Array.isArray(moviesSimilar?.data) &&
        moviesSimilar?.data?.length !== 0 && (
          <div className="container card-row">
            <div className="row">
              <SimilarMovies similarMovies={moviesSimilar?.data} />
            </div>
          </div>
        )}
      {movieGallery?.isError &&
      movieDetail?.isError &&
      movieTrailers?.isError &&
      moviesRecommended?.isError &&
      movieCast?.isError &&
      moviesSimilar?.isError ? (
        <Error message={`No Info Available For This Movie`} emoji="😔 😔 😔" />
      ) : null}

      <Search />
    </>
  );
}

export default MoviePage;
