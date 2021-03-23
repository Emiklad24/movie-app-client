import React, { Component } from "react";
import Header from "../Components/Header";
import MovieGallery from "../Components/MovieGallery";
import MoviePageCard from "../Components/MoviePageCard";
import MovieActorList from "../Components/MovieActorList";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import RecommendedMovies from "../Components/RecommendedMovies";
import SimilarMovies from "../Components/SimilarMovies";
import "../Styles/MoviesMenu.css";
import Search from "../Components/Search";
import Error from "./Erro404";
import MovietrailerList from "../Components/MovieTrailerList";

class MoviePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      movie: null,
      error: false,
      isActorsLoading: true,
      actors: null,
      actorsError: false,
      isPosterLoading: false,
      isPosterError: false,
      trailers: [],
      isTrailerLoading: false,
      isTrailerError: false,
      poster: null,
      recommendations: null,
      isRecommendedError: false,
      isRecommendedLoading: false,
      similarMovies: null,
      isErrorSimilarMovies: false,
      isLoadingSimilarMovies: false,
      backgroundImage: "",
    };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.getSinglemovieDetail();
    this.getSingleMovieCast();
    this.getTrailers();
    this.getMovieGallery();
    this.getRecommendedMovies();
    this.getSimilarMovies();
  };

  getSinglemovieDetail = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
      this.setState({ isLoading: true, error: false });
      const movieDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          params: { api_key: process.env.REACT_APP_API_KEY },
        }
      );

      const currentMoviePosterPath =
        movieDetail.data.poster_path || movieDetail.data.backdrop_path;

      this.setState({
        isLoading: false,
        error: false,
        movie: movieDetail.data,
        backgroundImage: currentMoviePosterPath,
      });
    } catch (error) {
      this.setState({ isLoading: false, error: true, actors: null });
      console.log(error);
    }
  };

  getSingleMovieCast = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    try {
      this.setState({ isActorsLoading: true, actorsError: false });
      const movieDetail = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          params: { api_key: process.env.REACT_APP_API_KEY },
        }
      );

      this.setState({
        isActorsLoading: false,
        actorsError: false,
        actors: movieDetail.data.cast,
      });
    } catch (error) {
      this.setState({
        isActorsLoading: false,
        actors: null,
        actorsError: true,
      });
      console.log(error);
    }
  };

  getMovieGallery = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    this.setState({ isPosterLoading: true, isPosterError: false });
    try {
      const moviePosters = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/images`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en-US",
            include_image_language: "en",
          },
        }
      );
      this.setState({
        isPosterLoading: false,
        isPosterError: false,
        posters: moviePosters.data.posters,
      });
    } catch (error) {
      console.log(error);
      this.setState({ isPosterLoading: false, isPosterError: true });
    }
  };

  getRecommendedMovies = async () => {
    const id = new URLSearchParams(window.location.search).get("id");

    try {
      this.setState({ isRecommendedLoading: true, isRecommendedError: false });
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/recommendations`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en",
            page: 1,
          },
        }
      );
      this.setState({
        recommendations: movies.data.results,
        isRecommendedLoading: false,
        isRecommendedError: false,
      });
    } catch (error) {
      this.setState({ isRecommendedLoading: false, isRecommendedError: true });
      console.log(error);
    }
  };
  getSimilarMovies = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    this.setState({
      isLoadingSimilarMovies: true,
      isErrorSimilarMovies: false,
    });

    try {
      const movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en",
            page: 1,
          },
        }
      );
      this.setState({
        similarMovies: movies.data.results,
        isLoadingSimilarMovies: false,
        isErrorSimilarMovies: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        isLoadingSimilarMovies: false,
        isErrorSimilarMovies: true,
      });
    }
  };
  getTrailers = async () => {
    this.setState({ isTrailerLoading: true, isTrailerError: false });

    const id = new URLSearchParams(window.location.search).get("id");
    try {
      const movieTrailers = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            language: "en-US",
            page: 1,
          },
        }
      );
      this.setState({
        trailers: movieTrailers.data.results,
        isTrailerLoading: false,
        isTrailerError: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({ isTrailerLoading: false, isTrailerError: true });
    }
  };

  render() {
    window.scrollTo(0, 0);
    const {
      movie,
      actors,
      posters,
      actorsError,
      isPosterError,
      error,
      recommendations,
      trailers,
      isTrailerError,
      similarMovies,
      isLoading,
    } = this.state;

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || id === "") {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Header />
        {/* <div className="container uk-animation-fade" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${this.state.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', width: '100%' }}> */}
        {movie && movie.length !== 0 ? (
          <MoviePageCard
            movie={movie}
            pathname={this.props.location.pathname.substr(1)}
          />
        ) : isLoading ? (
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
        {actors && actors.length !== 0 ? (
          <MovieActorList actors={actors} />
        ) : null}
        {trailers && trailers.length !== 0 ? (
          <MovietrailerList trailers={trailers} />
        ) : null}

        {posters && posters.length !== 0 ? (
          <MovieGallery posters={posters} />
        ) : null}
        {recommendations && recommendations.length !== 0 ? (
          <div className="container card-row">
            <div className="row">
              <RecommendedMovies recommendations={recommendations} />
            </div>
          </div>
        ) : null}
        {similarMovies && similarMovies.length !== 0 ? (
          <div className="container card-row">
            <div className="row">
              <SimilarMovies similarMovies={similarMovies} />
            </div>
          </div>
        ) : null}
        {isPosterError && actorsError && error && isTrailerError ? (
          <Error
            message={`No Info Available For This Movie`}
            emoji="😔 😔 😔"
          />
        ) : null}

        <Search />
        {/* </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, {})(MoviePage);
