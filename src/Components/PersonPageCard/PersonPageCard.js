import React from "react";
import "../../Styles/MoviePageCard.css";
import noImage from "../../Assets/Images/noimage.png";
import moment from "moment";

function PersonPageCard({ detail }) {
  const currentPersonPosterPath = detail?.poster_path || detail?.profile_path;
  const currentPersonName = detail?.name;
  const personDepartment = detail?.known_for_department;
  const homepage = detail?.homepage;
  const birthPlace = detail?.place_of_birth;
  const biography = detail?.biography;
  const deathday = detail?.deathday;
  const birthday = detail?.birthday;
  const otherNames = detail?.also_known_as;
  return (
    <>
      <div
        className="container uk-animation-fade"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w300${currentPersonPosterPath})`,
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
              currentPersonPosterPath
                ? `https://image.tmdb.org/t/p/w300${currentPersonPosterPath}`
                : noImage
            }
            alt={currentPersonName}
            className="movie-img uk-animation-fade"
            title={currentPersonName}
            width={!currentPersonPosterPath ? "300" : null}
          />

          <div className="movie-info d-flex flex-column justify-content-between p-3 align-items-start uk-animation-fade">
            <a
              href={homepage ? homepage : null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="movie-title">{currentPersonName}</h2>
            </a>
            <h6 className="movie-tagline">{personDepartment}</h6>
            <div className="movie-control">
              <div
                title="Popularity"
                className="movie-rating"
                style={{ color: "#daa520" }}
              >
                {detail?.popularity || "0"}
              </div>
              <div className="modal"></div>
              {deathday && (
                <button
                  type="button"
                  id="watchlist-btn"
                  className="movie-like mr-2 undefined btn btn-secondary uk-animation-fade"
                  title="Deceased"
                >
                  {/* <i className="fa fa-bookmark mr-1" aria-hidden="true"></i> */}
                  Deceased
                </button>
              )}
            </div>
            <p className="movie-overview uk-animation-fade">{biography}</p>
            {otherNames &&
            Array.isArray(otherNames) &&
            otherNames.length !== 0 ? (
              <div>
                <div className="">
                  <span className="mr-2">Other names:</span>
                  {otherNames.map((name, index) => (
                    <span key={index}>{name} | </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="movie-stat d-flex justify-content-between align-items-center">
            <div>
              {birthPlace && (
                <>
                  <i
                    className="fa fa-map-marker movie-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="movie-stats-text"> Birth Place: </span>{" "}
                </>
              )}
              {birthPlace}
            </div>
            <div>
              {birthday && (
                <>
                  <i
                    className="fa fa-birthday-cake movie-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="movie-stats-text"> Birthday: </span>{" "}
                </>
              )}
              {birthday}
            </div>
            <div>
              {birthday && (
                <>
                  <i
                    className="fa fa-birthday-cake movie-icon"
                    aria-hidden="true"
                  ></i>
                  <span className="movie-stats-text"> Age: </span>{" "}
                </>
              )}
              {birthday
                ? moment?.(birthday)?.fromNow?.().replace?.("ago", "")
                : null}
            </div>
          </div>
        </div>
      </div>

      {/* {movie.production_companies &&
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
      ) : null} */}
    </>
  );
}

export default PersonPageCard;
