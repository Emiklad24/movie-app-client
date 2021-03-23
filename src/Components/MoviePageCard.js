import React, { Component } from "react";
import "../Styles/MoviePageCard.css";
// import { genres } from '../Constant/MovieGenres';
import { addWatchlist } from "../actions/watchlistAction";
import { addRatedMovies } from "../actions/ratedMoviesAction";
import { connect } from "react-redux";
import swal from "sweetalert";
import { toast } from "react-toastify";
import client from "../FeathersClient";
import StarRatings from "react-star-ratings";
import noImage from "../Assets/Images/noimage.png";
import noLogo from "../Assets/Images/nologo.png";

class MoviePageCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    const { movie, pathname } = this.props;

    const movieWatchlist =
      movie.title || movie.original_name || movie.original_title;
    if (movieWatchlist !== pathname) {
      swal({
        title: `Not "${pathname}" ? 😔`,
        text: `This doesn't seem to be the details for "${pathname}" . This is due to some data inconsistency problems. We are working to correct this soon👍 `,
      });
    }
  };

  changeRating = (newRating, name) => {
    this.setState({ rating: newRating });

    swal({
      title: `Rate ${name} ?`,
      text: `Would you like to send your rating ?`,
      buttons: [
        "I'll rate later",
        `Give ${name} ${newRating} ${newRating > 1 ? "stars" : "star"}`,
      ],
      dangerMode: true,
    }).then((willStart) => {
      if (willStart) {
        this.SendRating(this.props.movie, newRating * 2);
      }
    });
  };
  SendRating = async (movie, rating) => {
    const { isAuthenticated, userData, addRatedMovies } = this.props;
    const movieWatchlist =
      movie.title || movie.original_name || movie.original_title;

    if (!isAuthenticated) {
      swal(`You have to log in to rate "${movieWatchlist}"`);
      return;
    }
    const uniqueMovieId = userData._id + movie.id;
    const newRatedMovie = {
      ...movie,
      movieId: movie.id,
      uniqueMovieId,
      userId: userData._id,
      rating,
      movieName: movieWatchlist,
    };
    try {
      await client.authenticate();
      const ratedMovie = await client
        .service("ratedmovies")
        .create(newRatedMovie);
      toast.success(`${ratedMovie.movieName} has been rated successfully`);
      addRatedMovies(ratedMovie);
    } catch (error) {
      if (error.message === "uniqueMovieId: value already exists.") {
        toast.error(`${movieWatchlist} has been rated already`);
      } else {
        toast.error("Operation Failed!");
      }
      console.log(error);
    }
  };
  addMovieToWatchList = async (movie) => {
    const { isAuthenticated, userData, addWatchlist } = this.props;

    const movieWatchlist =
      movie.title || movie.original_name || movie.original_title || "Movie";

    if (!isAuthenticated) {
      swal({
        title: ` Sorry 😔 😔 😔`,
        text: `You have to log in to add "${movieWatchlist}" to your watchlist`,
        buttons: ["OK", "Login"],
        dangerMode: true,
      }).then((willLogin) => {
        if (willLogin) {
          window.location.href = "/login";
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
        addedWatchlist.original_title;

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

  getDurationStr = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? "0" + m : m;
    return `${h} h ${m} m`;
  };
  getReleaseDateStr = (str) => {
    const date = new Date(str);
    return (
      date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear()
    );
  };
  render() {
    const { movie } = this.props;
    const { isLoading } = this.state;
    const currentMovieName =
      movie.title || movie.original_name || movie.original_title;
    const currentMovieTagline = movie.tagline || "No tagline";
    const currentMoviePosterPath = movie.poster_path || movie.backdrop_path;

    return (
      <>
        <div
          className="container uk-animation-fade"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${currentMoviePosterPath})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            width: "100%",
          }}
        >
          <div className="movie uk-animation-fade">
            <img
              src={
                currentMoviePosterPath
                  ? `https://image.tmdb.org/t/p/w300${currentMoviePosterPath}`
                  : noImage
              }
              alt={currentMovieName}
              className="movie-img"
              title={currentMovieName}
              width={!currentMoviePosterPath ? "300" : null}
            />

            <div className="movie-info d-flex flex-column justify-content-between p-3 align-items-start">
              <a
                href={movie.homepage ? movie.homepage : null}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2 className="movie-title">{currentMovieName}</h2>
              </a>
              <h6 className="movie-tagline">{currentMovieTagline}</h6>
              <div className="movie-control">
                <div title="Rating" className="movie-rating">
                  {movie.vote_average || "0.0"}
                </div>
                <div className="modal"></div>
                <button
                  type="button"
                  id="watchlist-btn"
                  className="movie-like mr-2 undefined btn btn-secondary"
                  title="Add to my watchlist"
                  onClick={() => this.addMovieToWatchList(movie)}
                >
                  {isLoading ? (
                    <i
                      className="fa fa-spinner fa-spin fa-1x fa-fw mr-1"
                      aria-hidden="true"
                    ></i>
                  ) : (
                    <i className="fa fa-bookmark mr-1" aria-hidden="true"></i>
                  )}
                  Add to my WatchList
                </button>

                <StarRatings
                  rating={this.state.rating}
                  starRatedColor="#daa520"
                  starHoverColor="#daa520"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name={currentMovieName}
                  starDimension="15px"
                  starSpacing="5px"
                />
              </div>
              <p className="movie-overview">
                {movie.overview || "No Overview for this movie"}
              </p>
              {movie.genres &&
              Array.isArray(movie.genres) &&
              movie.genres.length !== 0 ? (
                <div>
                  <div className="">
                    <span className="mr-2">Genres:</span>
                    {movie.genres.map((genre, index) => (
                      <span key={index}>{genre.name} | </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            <div className="movie-stat d-flex justify-content-between align-items-center">
              <div>
                <i className="fa fa-clock-o movie-icon" aria-hidden="true"></i>
                <span className="movie-stats-text"> Release date: </span>{" "}
                {movie.release_date
                  ? this.getReleaseDateStr(movie.release_date)
                  : "Movie release date unavailable"}
              </div>
              <div>
                <i className="fa fa-history movie-icon" aria-hidden="true"></i>
                <span className="movie-stats-text"> Duration: </span>{" "}
                {movie.duration
                  ? this.getDurationStr(movie.duration)
                  : "Movie duration unavailable"}
              </div>
              <div>
                <i className="fa fa-money movie-icon" aria-hidden="true"></i>
                <span className="movie-stats-text"> Budget: </span> $
                {movie.budget.toLocaleString() || "Movie budget unavailable"}
              </div>
            </div>
          </div>
        </div>

        {movie.production_companies &&
        Array.isArray(movie.production_companies) &&
        movie.production_companies.length !== 0 ? (
          <div className="container">
            <div className="row">
              <div>
                <h3
                  className="cast-title mb-4 prod-comp"
                  style={{ color: "#867c7c" }}
                >
                  Production Companies
                </h3>
              </div>
            </div>
            <div className="row">
              {movie.production_companies.map((company, index) => (
                <div className="col" key={index}>
                  <div>
                    <div className="mb-2">
                      <img
                        src={
                          company.logo_path
                            ? `https://image.tmdb.org/t/p/original/${company.logo_path}`
                            : noLogo
                        }
                        alt={company.name}
                        className="movie-img"
                        title={company.name}
                        width={!company.logo_path ? 200 : 100}
                      />
                    </div>
                    <div className="mt-1">
                      <span style={{ color: "#DAA520" }}>{company.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, { addWatchlist, addRatedMovies })(
  MoviePageCard
);
