import React from "react";
import PopularMovies from "./PopularMovies";
import NowPlayingMovies from "./NowPlayingMovies";
import TopRatedMovies from "./TopRatedMovies";
import UpcomingMovies from "./UpcomingMovies";
import "../Styles/MoviesMenu.css";
import { UserSettingsStore } from "../store/userSettings";

export function MoviesMenu() {
  const currentView = UserSettingsStore((state) => state?.currentView);
  const switchCurrentView = UserSettingsStore(
    (state) => state?.switchCurrentView
  );
  return (
    <>
      <div className="container">
        <div className="filterMenu">
          <ul className="menuList">
            <li>
              <div
                className={currentView === "Popular" ? "active" : null}
                onClick={() => switchCurrentView("Popular")}
              >
                Popular
              </div>
            </li>
            <li>
              <div
                className={currentView === "Now Playing" ? "active" : null}
                onClick={() => switchCurrentView("Now Playing")}
              >
                Now Playing
              </div>
            </li>
            <li>
              <div
                className={currentView === "Top Rated" ? "active" : null}
                onClick={() => switchCurrentView("Top Rated")}
              >
                Top Rated
              </div>
            </li>
            <li>
              <div
                className={currentView === "Upcoming" ? "active" : null}
                onClick={() => switchCurrentView("Upcoming")}
              >
                Upcoming
              </div>
            </li>
          </ul>
        </div>
      </div>

      {currentView === "Popular" ? (
        <>
          <div className="container card-row">
            <div className="row">
              <PopularMovies />
            </div>
          </div>
        </>
      ) : currentView === "Now Playing" ? (
        <>
          <div className="container card-row">
            <div className="row">
              <NowPlayingMovies />
            </div>
          </div>
        </>
      ) : currentView === "Top Rated" ? (
        <>
          <div className="container card-row">
            <div className="row">
              <TopRatedMovies />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container card-row">
            <div className="row">
              <UpcomingMovies />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MoviesMenu;
