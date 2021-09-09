import React, { Component } from "react";
import "../Styles/MovieActorList.css";
import noImage from "../Assets/Images/noimage.png";
import { Link } from "react-router-dom";

class MovieCrewList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: false,
    };
  }
  showAllCrewView = (e) => {
    this.setState({ showAll: e.target.checked });
  };

  render() {
    const { crew } = this.props;
    const { showAll } = this.state;
    const firstTwentyCast = crew.slice(0, 12);

    return (
      <div className="container">
        <div className="movie-cast uk-animation-fade delay: 200">
          <div className="d-flex justify-content-between align-align-items-center">
            <h3 className="cast-title mb-4">Crew</h3>
            {crew.length > 12 ? (
              <div className="custom-control custom-switch pr-5 info">
                <input
                  type="checkbox"
                  className="custom-control-input info"
                  id="show-all-crew"
                  onChange={this.showAllCrewView}
                  checked={showAll}
                  name="crew-togglehkjkk"
                />
                <label className="custom-control-label" htmlFor="show-all-crew">
                  Show all {crew.length} crews
                </label>
              </div>
            ) : null}
          </div>
          <div className="movie-cast-list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch">
            {crew && showAll
              ? crew?.map((actor, index) => (
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
                        {actor.name || ""}
                        <div>
                          <span className="small">
                            {actor.department || ""}
                          </span>
                        </div>
                        <span className="small">{actor.job || ""}</span>
                      </div>
                    </div>
                  </Link>
                ))
              : crew && !showAll
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
                        <div>
                          <span className="small">
                            {actor.department || ""}
                          </span>{" "}
                        </div>
                        <span className="small">{actor.job || ""}</span>
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

export default MovieCrewList;
