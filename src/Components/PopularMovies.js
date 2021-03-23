import React, { Component } from "react";
import { connect } from "react-redux";
import MovieCard from "./MovieCard";
import FetchMore from "./FetchMore";
import { fetchMorePopularMovies } from "../actions/popularMoviesAction";

class PopularMovies extends Component {
  render() {
    const { movies, fetchMorePopularMovies } = this.props;

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
        <FetchMore fetchMore={fetchMorePopularMovies} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isInitialLoading: state.popularMovies.isInitialLoading,
  error: state.popularMovies.error,
  movies: state.popularMovies.movies,
});

export default connect(mapStateToProps, { fetchMorePopularMovies })(
  PopularMovies
);
