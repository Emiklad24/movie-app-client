import React, { Component } from "react";
import "../Styles/Watchlist.css";
import { connect } from "react-redux";
import MovieCard from "../Components/MovieCardRatedMovies";
import NoMovieList from "../Components/NoMovieList";
import Loading from "../Components/Loading";
import { fetchRatedMovies } from "../actions/ratedMoviesAction";
import Search from "../Components/Search";

class RatedMovies extends Component {
  componentDidMount = () => {
    if (!this.props.ratedMovies || this.props.ratedMovies.length === 0) {
      this.props.fetchRatedMovies(this.props.userData._id);
    }
  };
  render() {
    const { ratedMovies, isLoading } = this.props;
    return (
      <>
        {ratedMovies.length > 0 ? (
          <div className="container-fluid card-row">
            <div className="row">
              {ratedMovies.map((movie, index) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  canDelete={true}
                  onWatchList={false}
                />
              ))}
            </div>
          </div>
        ) : isLoading ? (
          <div className="container card-row">
            <div className="row">
              <Loading />
            </div>
          </div>
        ) : (
          <NoMovieList message={"You have no rated movie at the moment."} />
        )}
        <Search />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.user,
  ratedMovies: state.ratedMovies.ratedMovies,
  isLoading: state.ratedMovies.isLoading,
});

export default connect(mapStateToProps, { fetchRatedMovies })(RatedMovies);
