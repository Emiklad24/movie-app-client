import React, { Component } from "react";
import "../Styles/Search.css";
import ReactDOM from "react-dom";
import axios from "axios";
import Loading from "./Loading";
import MovieCard from "./MovieCard";
import ErrorMovieSearch from "./ErrorMovieSearch";
import SearchOptionTitle from "./SearchOptionTitle";
import SearchResultsPeople from "./SearchResultPeople";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: null,
      isLoading: false,
      error: false,
      searchTerm: "",
      movieType: "movie",
      page: 1,
    };
  }
  showModal = () => {
    try {
      let modal = document.getElementById("search-modal");
      const closeScheduledFAB = document.getElementById("toggle-modal-button");
      if (modal.style.display === "block") {
        modal.style.display = "none";
        closeScheduledFAB.innerHTML = `<i class="fa fa-search uk-animation-fade"></i>`;
      } else {
        modal.style.display = "block";
        closeScheduledFAB.innerHTML = `<i class="fa fa-remove uk-animation-fade"></i>`;
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      searchTerm: "",
      searchResults: null,
      movieType: "movie",
      isLoading: false,
      error: false,
    });
  };

  searchMovies = async (movieName) => {
    this.setState({ searchTerm: movieName });

    if (movieName.length > 0 && this.state.movieType !== "people") {
      setTimeout(async () => {
        try {
          this.setState({ isLoading: true, error: false });

          const movieSearchResults = await axios.get(
            `https://api.themoviedb.org/3/search/${this.state.movieType}`,
            {
              params: {
                api_key: "034af975420c91a0afd14fb5ddee1134",
                language: "en-US",
                query: movieName.toLowerCase(),
                page: this.state.page,
                include_adult: false,
              },
            }
          );

          this.setState({
            isLoading: false,
            error: false,
            searchResults: movieSearchResults.data.results,
          });
          console.log(movieSearchResults.data.results);
        } catch (error) {
          console.log(error);
          this.setState({ isLoading: false, error: true });
        }
      }, 500);
    } else if (movieName.length > 0 && this.state.movieType === "people") {
      setTimeout(async () => {
        try {
          this.setState({ isLoading: true, error: false });

          const movieSearchResults = await axios.get(
            `https://api.themoviedb.org/3/search/person`,
            {
              params: {
                api_key: "034af975420c91a0afd14fb5ddee1134",
                language: "en-US",
                query: movieName.toLowerCase(),
                page: this.state.page,
                include_adult: false,
              },
            }
          );

          this.setState({
            isLoading: false,
            error: false,
            searchResults: movieSearchResults.data.results,
          });
        } catch (error) {
          console.log(error);
          this.setState({ isLoading: false, error: true });
        }
      }, 500);
    } else {
      this.setState({ searchResults: null });
    }
  };
  setMovieType = (movieType) => {
    this.setState({ movieType }, () =>
      this.searchMovies(this.state.searchTerm)
    );
  };
  render() {
    const { isLoading, searchResults, error, searchTerm, movieType } =
      this.state;
    return ReactDOM.createPortal(
      <>
        <div
          className="btn-Modal"
          id="toggle-modal-button"
          onClick={this.showModal}
        >
          <i className="fa fa-search uk-animation-fade"></i>
        </div>

        <div
          className="container uk-animation-slide-right-medium"
          id="search-modal"
        >
          <div className="displaySearchResults">
            <div className="container">
              <div className="searchBar">
                <div className="input-group mb-2">
                  <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                      <i className="fa fa-search"></i>
                    </div>
                    <div style={{ width: "300px" }}>
                      <input
                        type="search"
                        className="form-control"
                        id="searchBtn"
                        placeholder={
                          movieType === "movie"
                            ? "search movies by title"
                            : movieType === "tv"
                            ? "search tv shows by title"
                            : "Search movie actors and directors"
                        }
                        onChange={(e) => this.searchMovies(e.target.value)}
                        value={this.state.searchTerm}
                      />
                    </div>
                  </div>
                  <SearchOptionTitle
                    setMovieType={this.setMovieType}
                    movieType={movieType}
                    searchTerm={searchTerm}
                  />
                </div>
              </div>
            </div>
            {isLoading && !error && movieType !== "people" ? (
              <div className="container card-row">
                <div className="row">
                  <Loading />
                </div>
              </div>
            ) : searchResults &&
              !error &&
              !isLoading &&
              searchResults.length !== 0 &&
              movieType !== "people" ? (
              <div className="container  card-row">
                <div className="row">
                  {searchResults.map((movie) => {
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
                </div>
              </div>
            ) : null}

            {!isLoading &&
            !error &&
            Array.isArray(searchResults) &&
            searchResults.length === 0 &&
            movieType !== "people" ? (
              <ErrorMovieSearch
                searchTerm={searchTerm}
                message={
                  movieType === "movie"
                    ? `Sorry, we couldn't find any movie with the title`
                    : "Sorry, we couldn't find any Tv show with the title"
                }
              />
            ) : !isLoading && error && movieType !== "people" ? (
              <ErrorMovieSearch
                searchTerm={searchTerm}
                message="Sorry, error searching for the title"
                retry={true}
                searchMovies={this.searchMovies}
              />
            ) : null}
            {!isLoading &&
            !error &&
            Array.isArray(searchResults) &&
            searchResults.length === 0 &&
            movieType === "people" ? (
              <ErrorMovieSearch
                searchTerm={searchTerm}
                message={`Sorry, we couldn't find any person with the name`}
              />
            ) : !isLoading && error && movieType === "people" ? (
              <ErrorMovieSearch
                searchTerm={searchTerm}
                message="Sorry, error searching for the name"
                retry={true}
                searchMovies={this.searchMovies}
              />
            ) : null}
          </div>
          {!isLoading &&
          !error &&
          searchResults &&
          searchResults.length !== 0 &&
          movieType === "people" ? (
            <SearchResultsPeople
              isLoading={isLoading}
              error={error}
              searchTerm={searchTerm}
              searchResults={searchResults}
              movieType={movieType}
            />
          ) : null}
        </div>
      </>,
      document.getElementById("searchResults")
    );
  }
}

export default Search;
