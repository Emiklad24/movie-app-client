import React from "react";
import "../../Styles/Header.css";
import { Link } from "react-router-dom";
import useUserCredentialsStore from "../../store/auth.store";
import shallow from "zustand/shallow";
import { useLogoutUser } from "../../hooks/useLogoutUser.service";
import { loginPopupHandler } from "../../util/loginPopupHandler";

const Header = () => {
  const { isAuthenticated } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );
  const { logoutHandler } = useLogoutUser();

  return (
    <header className="header uk-animation-fade">
      <div className="container">
        <nav className="nav">
          <div className="logo">
            <Link className="navbar-brand uk-animation-fade" to="/">
              Movie App
            </Link>
          </div>
          <div className="navbar-items">
            <Link className="item active  uk-animation-fade" to="/">
              <span className="nav-icon">
                <i className="fa fa-home"></i>
              </span>
              <span className="menu-text">Home</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link className="item  uk-animation-fade" to="/watchlist">
                  <span className="nav-icon">
                    <i className="fa fa-bookmark"></i>
                  </span>
                  <span className="menu-text">Watchlist</span>
                </Link>
                <Link className="item  uk-animation-fade" to="/rated">
                  <span className="nav-icon">
                    <i className="fa fa-star"></i>
                  </span>
                  <span className="menu-text">Rated Movies</span>
                </Link>

                <Link
                  className="item  uk-animation-fade"
                  to="#"
                  onClick={logoutHandler}
                >
                  <span className="nav-icon">
                    <i className="fa fa-sign-out"></i>
                  </span>
                  <span className="menu-text">Leave</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="item  uk-animation-fade"
                  onClick={loginPopupHandler}
                >
                  <span className="nav-icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span className="menu-text">Join</span>
                </Link>

                <Link className="item  uk-animation-fade" to="/discover">
                  <span className="nav-icon">
                    <i className="fa fa-star"></i>
                  </span>
                  <span className="menu-text">Discover</span>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
