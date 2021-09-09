import React, { Component } from "react";
import "../Styles/MovieCard.css";
import { genres } from "../Constant/MovieGenres";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import client from "../FeathersClient";
import { toast } from "react-toastify";
import { addWatchlist, removeWatchlist } from "../actions/watchlistAction";
import noImage from "../Assets/Images/noimage.png";
import { queryClient } from "../util/misc";
import {
  fetchSingleMovieDetailKey,
  fetchSingleMovieTrailersKey,
  fetchSingleMovieCastKey,
  fetchRecommendedMoviesKey,
  fetchSimilarMoviesKey,
  fetchMovieGalleryKey,
} from "../util/appCacheKeys";
import { fetchSingleSimilarMovies } from "../services/fetchSingleSimilarMovies.service";
import { fetchSingleRecommendedMovies } from "../services/fetchSingleRecommendedMovies.service";
import { fetchSingleMovieGallery } from "../services/fetchSingleMovieGallery.service";
import { fetchSingleMovieDetail } from "../services/fetchSingleMovieDetail.service";
import { fetchSingleMovieCast } from "../services/fetchSingleMovieCast.service";
import { fetchSingleMovieTrailers } from "../services/fetchSingleMovieTrailers.service";

class MovieCardLegacy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  prefetchAllRelatedQueries = (currentMovieId) => {
    const staleTime = 1000 * 60 * 60 * 24;
    queryClient.prefetchQuery(
      [fetchSingleMovieDetailKey, currentMovieId],
      fetchSingleMovieDetail,
      {
        staleTime,
      }
    );
    queryClient.prefetchQuery(
      [fetchSingleMovieTrailersKey, currentMovieId],
      fetchSingleMovieTrailers,
      {
        staleTime,
      }
    );
    queryClient.prefetchQuery(
      [fetchSingleMovieCastKey, currentMovieId],
      fetchSingleMovieCast,
      {
        staleTime,
      }
    );
    queryClient.prefetchQuery(
      [fetchRecommendedMoviesKey, currentMovieId],
      fetchSingleRecommendedMovies,
      {
        staleTime,
      }
    );
    queryClient.prefetchQuery(
      [fetchSimilarMoviesKey, currentMovieId],
      fetchSingleSimilarMovies,
      {
        staleTime,
      }
    );
    queryClient.prefetchQuery(
      [fetchMovieGalleryKey, currentMovieId],
      fetchSingleMovieGallery,
      {
        staleTime,
      }
    );
  };

  getGenre = (movie) => {
    let genre = "";
    if (movie) {
      genre = movie.map((id) => {
        const item = genres.find((item) => item.id === id);
        return item ? `${item.name} | ` : null;
      });
    }
    return genre;
  };

  deleteWatchlist = async (movie) => {
    const { removeWatchlist, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      swal("you have to log in to delete a watchlist");
    } else {
      const movieName =
        movie.title || movie.original_name || movie.original_title;
      swal({
        title: `Delete ${movieName} ?`,
        text: `You are about to remove ${movieName} from your watchlist`,
        buttons: ["Cancel", ` Delete ${movieName} `],
        dangerMode: true,
      }).then((willRemove) => {
        if (willRemove) {
          deleteMovie();
        }
      });
    }

    const deleteMovie = async () => {
      try {
        this.setState({ isLoading: true });
        await client.authenticate();
        await client.service("watchlists").remove(movie._id);
        removeWatchlist(movie._id);
        this.setState({ isLoading: false });
      } catch (error) {
        swal(`Delete failed, please try again`);
        console.log(error);
        this.setState({ isLoading: false });
      }
    };
  };

  viewMore = (movie) => {
    const currentMovieId = movie.id || movie.movieId;
    const movieName =
      movie.title || movie.original_name || movie.original_title;
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

  addMovieToWatchList = async (movie) => {
    const { isAuthenticated, userData, addWatchlist } = this.props;

    const movieWatchlist =
      movie.title || movie.original_name || movie.original_title;

    if (!isAuthenticated) {
      swal({
        title: ` Sorry 😔 😔 😔`,
        text: `You have to join to add "${movieWatchlist}" to your watchlist`,
        buttons: ["OK", "Join"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) {
          window.location.href = "/join";
        }
      });
      return;
    }
    const uniqueMovieId = userData._id + movie.id;
    const watchlistData = {
      ...movie,
      movieId: movie.id,
      userId: userData._id,
      archived: false,
      uniqueMovieId,
    };
    try {
      this.setState({ isLoading: true });
      await client.authenticate();
      const addedWatchlist = await client
        .service("watchlists")
        .create(watchlistData);

      const addedWatchlistName =
        addedWatchlist.title ||
        addedWatchlist.original_name ||
        addedWatchlist.original_title ||
        "Movie";

      toast.success(
        `${addedWatchlistName} has been added to your watchlist successfully`
      );
      addWatchlist(addedWatchlist);
      this.setState({ isLoading: false });
    } catch (error) {
      if (error.message === "uniqueMovieId: value already exists.") {
        toast.error(`${movieWatchlist} has been added already`);
      } else {
        toast.error("Operation Failed!");
      }
      console.log(error);
      this.setState({ isLoading: false });
    }
    return;
  };

  someMethod = () => {
    const { forceUpdate, movie } = this.props;
    const currentMovieId = movie.id || movie.movieId;
    const currentMovieName =
      movie.title || movie.original_name || movie.original_title;
    if (forceUpdate === true) {
      window.location.href =
        `/${currentMovieName}?id=${currentMovieId}`.replace("%", "");
    }
    return;
  };

  render() {
    const { movie, onWatchList, canDelete } = this.props;
    const { isLoading } = this.state;
    const currentMovieName =
      movie.title || movie.original_name || movie.original_title;
    const currentMovieId = movie.id || movie.movieId;
    const pixPath = movie.poster_path || movie.backdrop_path;
    const urlPath = `/${currentMovieName}?id=${currentMovieId}`.replace(
      "%",
      ""
    );
    return (
      <div
        className="col mt-5 uk-animation-fade-meduim"
        uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 300; repeat: true"
        // onMouseEnter={() => this.prefetchAllRelatedQueries(currentMovieId)}
      >
        <div className="card">
          <Link to={urlPath} onClick={this.someMethod}>
            <div className="card-img" title={currentMovieName}>
              <img
                className="uk-animation-fade"
                src={
                  pixPath
                    ? `https://image.tmdb.org/t/p/w185${pixPath}`
                    : noImage
                }
                alt={currentMovieName}
                loading="lazy"
              />
            </div>
          </Link>
          <div className="card-content">
            <span className="card-rating">{movie.vote_average}</span>
            <div className="movie-content">
              <div className="movie-action-buttons">
                {movie.overview ? (
                  <div
                    className="watchlist-btn peep-view"
                    title={`View more Info about "${currentMovieName}"`}
                    onClick={() => this.viewMore(movie)}
                  >
                    <i className="fa fa-eye"></i>
                  </div>
                ) : null}

                {onWatchList !== false && isLoading === false ? (
                  <>
                    <div
                      className="watchlist-btn"
                      onClick={() => this.addMovieToWatchList(movie)}
                      title={`Add "${currentMovieName}" to your watchlist`}
                    >
                      <i className="fa fa-bookmark"></i>
                    </div>
                  </>
                ) : null}
                {canDelete === true && isLoading === false ? (
                  <Link
                    className="watchlist-btn"
                    onClick={() => this.deleteWatchlist(movie)}
                  >
                    <i className="fa fa-trash"></i>
                  </Link>
                ) : null}
                {isLoading ? (
                  <Link className="watchlist-btn">
                    <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                  </Link>
                ) : null}
              </div>
              <Link
                className="movie-title"
                to={urlPath}
                onClick={this.someMethod}
              >
                <div>{currentMovieName || "Movie App"}</div>
              </Link>
              <p> {this.getGenre(movie.genre_ids)} </p>
              <p> {movie?.character && `Character: ${movie?.character} `} </p>
              {movie.release_date ? (
                <p>Release Date: {movie.release_date}</p>
              ) : movie.first_air_date ? (
                <p>First Air Date: {movie.first_air_date}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
  movieWatchlists: state.watchlists.watchlists,
});

export default connect(mapStateToProps, { addWatchlist, removeWatchlist })(
  MovieCardLegacy
);
