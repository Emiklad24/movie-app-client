import React, { Component } from "react";
import "../Styles/MovieActorList.css";
import noImage from "../Assets/Images/noimage.png";
import { Link } from "react-router-dom";

class MovieActorList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false,
    };
  }
  showAllCastView = (e) => {
    this.setState({ showAll: e.target.checked });
  };

  render() {
    const { actors } = this.props;
    const { showAll } = this.state;
    const firstTwentyCast = actors.slice(0, 12);

    return (
      <div className="container">
        <div className="movie-cast uk-animation-fade delay: 200">
          <div className="d-flex justify-content-between align-align-items-center">
            <h3 className="cast-title mb-4">Cast</h3>
            {actors?.length > 12 ? (
              <div className="custom-control custom-switch pr-5 info">
                <input
                  type="checkbox"
                  className="custom-control-input info"
                  id="show-all"
                  onChange={this.showAllCastView}
                  checked={showAll}
                  // name="actors-toggle"
                />
                <label className="custom-control-label" htmlFor="show-all">
                  Show all {actors.length} casts
                </label>
              </div>
            ) : null}
          </div>
          <div className="movie-cast-list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch">
            {actors && showAll
              ? actors.map((actor, index) => (
                  <Link to={`/${actor?.name}/${actor?.id}`} key={index}>
                    <div className="movie-cast-item uk-animation-fade">
                      <img
                        className="movie-cast-img"
                        alt={actor.name || index}
                        title={actor.name || index}
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : noImage
                        }
                        loading="lazy"
                      />
                      <div className="movie-cast-info">
                        {actor.name || ""} <br />
                        <span className="small">{actor.character || ""}</span>
                      </div>
                    </div>
                  </Link>
                ))
              : actors && !showAll
              ? firstTwentyCast.map((actor, index) => (
                  <Link to={`/${actor?.name}/${actor?.id}`} key={index}>
                    <div className="movie-cast-item uk-animation-fade">
                      <img
                        className="movie-cast-img"
                        alt={actor.name || index}
                        title={actor.name || index}
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : noImage
                        }
                        loading="lazy"
                      />
                      <div className="movie-cast-info">
                        {actor.name || ""} <br />
                        <span className="small">{actor.character || ""}</span>
                      </div>
                    </div>
                  </Link>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default MovieActorList;
