import React, { Component } from "react";
import Hero from "../Components/Hero";
import MoviesMenu from "../Components/MoviesMenu";
import Search from "../Components/Search";
import { connect } from "react-redux";
import { fetchWatchlists } from "../actions/watchlistAction";
import { fetchRatedMovies } from "../actions/ratedMoviesAction";

class Movies extends Component {
  componentDidMount = () => {
    const {
      isAuthenticated,
      userData,
      fetchWatchlists,
      fetchRatedMovies,
    } = this.props;
    if (isAuthenticated) {
      fetchWatchlists(userData._id);
      fetchRatedMovies(userData._id);
    }
  };

  render() {
    return (
      <>
        <Hero />
        <MoviesMenu />
        <Search />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, { fetchWatchlists, fetchRatedMovies })(
  Movies
);
