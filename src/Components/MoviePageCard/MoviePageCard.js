import React from "react";
import noImage from "../../Assets/Images/noimage.png";
// import StarRatings from "react-star-ratings";
import noLogo from "../../Assets/Images/nologo.png";
import swal from "sweetalert";
import useAddMovieToWatchList from "../../hooks/useAddMovieToWatchList";

export default function MoviePageCard({ movie, pathname }) {
  const { isLoading, addWatchlistsHandler } = useAddMovieToWatchList(movie);
  const currentMovieName =
    movie?.title || movie?.original_name || movie?.original_title;
  const currentMovieTagline = movie?.tagline || "";
  const currentMoviePosterPath = movie?.poster_path || movie?.backdrop_path;

  React.useEffect(() => {
    if (currentMovieName !== pathname) {
      swal({
        title: `Not "${pathname}" ? 😔`,
        text: `This doesn't seem to be the details for "${pathname}" . This is due to some data inconsistency problems. We are working to correct this soon👍 `,
      });
    }
  }, [currentMovieName, pathname]);

  const getDurationStr = (mins) => {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    m = m < 10 ? "0" + m : m;
    return `${h} h ${m} m`;
  };
  const getReleaseDateStr = (str) => {
    const date = new Date(str);
    return (
      date?.getDate?.() +
      "." +
      (date?.getMonth?.() + 1) +
      "." +
      date?.getFullYear?.()
    );
  };
  return (
    <>
      <div
        className="container uk-animation-fade"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w300${currentMoviePosterPath})`,
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
              currentMoviePosterPath
                ? `https://image.tmdb.org/t/p/w300${currentMoviePosterPath}`
                : noImage
            }
            alt={currentMovieName}
            className="movie-img uk-animation-fade"
            title={currentMovieName}
            width={!currentMoviePosterPath ? "300" : null}
          />

          <div className="movie-info d-flex flex-column justify-content-between p-3 align-items-start uk-animation-fade">
            <a
              href={movie?.homepage || null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className="movie-title">{currentMovieName}</h2>
            </a>
            <h6 className="movie-tagline">{currentMovieTagline}</h6>
            <div className="movie-control">
              <div title="Rating" className="movie-rating">
                {movie?.vote_average || "0.0"}
              </div>
              <div className="modal"></div>
              <button
                type="button"
                id="watchlist-btn"
                className="movie-like mr-2 undefined btn btn-secondary uk-animation-fade"
                title="Add to my watchlist"
                onClick={addWatchlistsHandler}
              >
                {isLoading ? (
                  <i
                    className="fa fa-spinner fa-spin fa-1x fa-fw mr-1 uk-animation-fade"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i className="fa fa-bookmark mr-1" aria-hidden="true"></i>
                )}
                Add to my WatchList
              </button>

              {/* <StarRatings
                rating={this.state.rating}
                starRatedColor="#daa520"
                starHoverColor="#daa520"
                changeRating={this.changeRating}
                numberOfStars={5}
                name={currentMovieName}
                starDimension="15px"
                starSpacing="5px"
              /> */}
            </div>
            <p className="movie-overview uk-animation-fade">
              {movie?.overview || ""}
            </p>
            {movie.genres &&
            Array.isArray(movie?.genres) &&
            movie?.genres?.length !== 0 ? (
              <div>
                <div className="">
                  <span className="mr-2">Genres:</span>
                  {movie?.genres.map((genre, index) => (
                    <span key={genre?.name}>{genre?.name} | </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="movie-stat d-flex justify-content-between align-items-center">
            <div>
              <i className="fa fa-clock-o movie-icon" aria-hidden="true"></i>
              <span className="movie-stats-text"> Release date: </span>{" "}
              {movie?.release_date
                ? getReleaseDateStr(movie?.release_date)
                : ""}
            </div>
            <div>
              <i className="fa fa-history movie-icon" aria-hidden="true"></i>
              <span className="movie-stats-text"> Duration: </span>{" "}
              {movie?.duration ? getDurationStr(movie?.duration) : ""}
            </div>
            <div>
              <i className="fa fa-money movie-icon" aria-hidden="true"></i>
              <span className="movie-stats-text"> Budget: </span> $
              {movie?.budget?.toLocaleString?.() || ""}
            </div>
          </div>
        </div>
      </div>

      {movie?.production_companies &&
      Array.isArray(movie?.production_companies) &&
      movie?.production_companies?.length !== 0 ? (
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
            {movie?.production_companies?.map?.((company, index) => (
              <div className="col" key={index}>
                <div>
                  <div className="mb-2">
                    <img
                      src={
                        company?.logo_path
                          ? `https://image.tmdb.org/t/p/original/${company?.logo_path}`
                          : noLogo
                      }
                      alt={company.name}
                      className="movie-img"
                      title={company?.name}
                      width={!company?.logo_path ? 200 : 100}
                    />
                  </div>
                  <div className="mt-1">
                    <span style={{ color: "#DAA520" }}>{company?.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}
