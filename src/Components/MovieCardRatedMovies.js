import React, { Component } from "react";
import "../Styles/MovieCard.css";
import { genres } from "../Constant/MovieGenres";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import swal from "sweetalert";
import client from "../FeathersClient";
import StarRatings from "react-star-ratings";
import { removeRatedMovies } from "../actions/ratedMoviesAction";
import noImage from "../Assets/Images/noimage.png";

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

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

  promptDelete = async (movie) => {
    const { isAuthenticated, removeRatedMovies } = this.props;
    if (!isAuthenticated) {
      swal("you have to log in to delete a watchlist");
    } else {
      const movieName =
        movie.title || movie.original_name || movie.original_title;

      swal({
        title: `Delete ${movieName} ?`,
        text: `You are about to remove ${movieName} from your rated movies`,
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
        await client.service("ratedmovies").remove(movie._id);
        removeRatedMovies(movie._id);
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

  someMethod = () => {
    const { forceUpdate, movie } = this.props;
    const currentMovieId = movie.id || movie.movieId;
    const currentMovieName =
      movie.title || movie.original_name || movie.original_title;
    if (forceUpdate === true) {
      window.location.href = `/${currentMovieName}?id=${currentMovieId}`;
    }
    return;
  };

  render() {
    const { movie } = this.props;
    const { isLoading } = this.state;
    const currentMovieName =
      movie.title || movie.original_name || movie.original_title;
    const currentMovieId = movie.id || movie.movieId;
    const pixPath = movie.poster_path || movie.backdrop_path;

    return (
      <>
        <div
          className="col mt-5 uk-animation-fade-meduim"
          uk-scrollspy="cls: uk-animation-fade; target: .card; delay: 300; repeat: true"
        >
          <div className="card">
            <Link
              to={`/${currentMovieName}?id=${currentMovieId}`}
              onClick={this.someMethod}
            >
              <div className="card-img">
                <img
                  src={
                    pixPath
                      ? `https://image.tmdb.org/t/p/w185/${pixPath}`
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
                <StarRatings
                  rating={movie.rating / 2}
                  starRatedColor="#daa520"
                  starHoverColor="#daa520"
                  changeRating={this.changeRating}
                  numberOfStars={5}
                  name={currentMovieName}
                  starDimension="15px"
                  starSpacing="5px"
                />
                <div className="movie-action-buttons">
                  <div
                    className="watchlist-btn peep-view"
                    title="View Info"
                    onClick={() => this.viewMore(movie)}
                  >
                    <i className="fa fa-eye"></i>
                  </div>

                  {isLoading ? (
                    <Link className="watchlist-btn">
                      <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                    </Link>
                  ) : (
                    <Link
                      className="watchlist-btn"
                      onClick={() => this.promptDelete(movie)}
                    >
                      <i
                        className="fa fa-trash"
                        title={`Remove ${currentMovieName} from rated movies`}
                      ></i>
                    </Link>
                  )}
                  <Link
                    className="movie-title"
                    to={`/${currentMovieName}?id=${currentMovieId}`}
                    onClick={this.someMethod}
                  >
                    <div>{currentMovieName || "Movie App"}</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, { removeRatedMovies })(MovieCard);
