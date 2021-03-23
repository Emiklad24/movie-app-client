import React, { Component } from "react";
import { connect } from "react-redux";
import FetchMore from "./FetchMore";
import { fetchMoreTopRatedMovies } from "../actions/topRatedMoviesAction";

import MovieCard from "./MovieCard";

class TopRated extends Component {
  render() {
    const { movies, fetchMoreTopRatedMovies } = this.props;

    return (
      <>
        {movies.map((movie) => {
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
        <FetchMore fetchMore={fetchMoreTopRatedMovies} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isInitialLoading: state.topRatedMovies.isInitialLoading,
  error: state.topRatedMovies.error,
  movies: state.topRatedMovies.movies,
});

export default connect(mapStateToProps, { fetchMoreTopRatedMovies })(TopRated);
