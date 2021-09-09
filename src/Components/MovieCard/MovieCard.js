import React from "react";
import { Link } from "react-router-dom";
import {
  getGenre,
  prefetchAllRelatedQueries,
} from "../../hooks/useAddMovieToWatchList";
import noImage from "../../Assets/Images/noimage.png";

export default function Moviecard({ movie, LeftButton, RightButton }) {
  const currentMovieName =
    movie?.title || movie?.original_name || movie?.original_title;
  const currentMovieId = movie?.movieId || movie?.id;
  const pixPath = movie?.poster_path || movie?.backdrop_path;
  const urlPath = `/${currentMovieName}?id=${currentMovieId}`.replace("%", "");

  return (
    <div
      className="col mt-5 uk-animation-fade-meduim"
      uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 300; repeat: true"
      onMouseEnter={() => prefetchAllRelatedQueries(currentMovieId)}
    >
      <div className="card">
        <Link
          to={urlPath}
          onClick={() =>
            (window.location.href =
              `/${currentMovieName}?id=${currentMovieId}`.replace("%", ""))
          }
        >
          <div className="card-img" title={currentMovieName}>
            <img
              className="uk-animation-fade"
              src={
                pixPath ? `https://image.tmdb.org/t/p/w185${pixPath}` : noImage
              }
              alt={currentMovieName}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="card-content">
          <span className="card-rating">{movie?.vote_average}</span>
          <div className="movie-content">
            <div className="movie-action-buttons">
              <LeftButton movie={movie} />
              <RightButton movie={movie} />
            </div>
            <Link
              className="movie-title"
              to={urlPath}
              onClick={() =>
                (window.location.href =
                  `/${currentMovieName}?id=${currentMovieId}`.replace("%", ""))
              }
            >
              <div>{currentMovieName || "Movie App"}</div>
            </Link>
            <p> {getGenre?.(movie?.genre_ids)} </p>
            <p> {movie?.character && `Character: ${movie?.character} `} </p>
            {movie?.release_date ? (
              <p>Release Date: {movie?.release_date}</p>
            ) : movie?.first_air_date ? (
              <p>First Air Date: {movie?.first_air_date}</p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
