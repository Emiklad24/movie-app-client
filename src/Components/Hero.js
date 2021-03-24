import React from "react";
import pix from "../Assets/Images/bg2.jpg";
import "../Styles/Hero.css";
import { genres } from "../Constant/MovieGenres";
import { PopularMoviesStore } from "../store/popularMovies.store";

const getGenre = (movie) => {
  let genre = "";
  if (movie) {
    genre = movie.map((id) => {
      const item = genres.find((item) => item.id === id);
      return item ? item.name + " | " : null;
    });
  }
  return <span>{genre}</span>;
};

function Hero() {
  const popularMovies = PopularMoviesStore((state) => state?.popularMovies);

  return (
    <>
      <section className="hero uk-animation-fade">
        <div className="hero-slide">
          <div uk-slideshow="autoplay: true; autoplay-interval: 5000; pause-on-hover: true; animation: kenburns;">
            <ul
              className="uk-slideshow-items"
              uk-height-viewport="min-height: 300"
            >
              {popularMovies &&
              Array.isArray(popularMovies) &&
              popularMovies?.length > 0 ? (
                popularMovies?.map?.((movie, index) => (
                  <li key={index} className=" uk-animation-kenburns">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                      uk-cover
                      width="100%"
                      alt={movie?.original_name}
                      loading="lazy"
                    />
                    <div className="hero-overlay"></div>
                    <div className="container">
                      <div className="">
                        <div className="">
                          <div className="movie-features">
                            <h1 className="title">
                              {movie?.title ||
                                movie?.original_title ||
                                movie?.original_name}
                            </h1>
                            <div className="category">
                              {getGenre(movie?.genre_ids)}
                            </div>
                            <div>
                              <dd className="movie-overview">
                                {movie?.overview?.length > 250
                                  ? movie?.overview?.substr?.(0, 250) + "..."
                                  : movie?.overview}
                              </dd>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <img
                      src={pix}
                      className="uk-animation-kenburns"
                      uk-cover
                      width="100%"
                      alt="Placeholder-hero"
                    />
                    <div className="container">
                      <div className="movie-features">
                        <h1 className="title">Welcome to Movie App</h1>
                        <div>
                          <dd className="movie-overview">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Amet, cumque.
                          </dd>
                        </div>
                      </div>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="dark-img"></div>
      </section>
    </>
  );
}

export default Hero;
