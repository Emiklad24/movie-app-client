import React, { Component } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authAction";

export class Header extends Component {
  render() {
    const { isAuthenticated, logout } = this.props;

    return (
      <header className="header uk-animation-fade">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <Link className="navbar-brand" to="/">
                Movie App
              </Link>
            </div>
            <div className="navbar-items">
              <Link className="item active" to="/">
                <span className="nav-icon">
                  <i className="fa fa-home"></i>
                </span>
                <span className="menu-text">Home</span>
              </Link>
              {isAuthenticated ? (
                <>
                  <Link className="item" to="/watchlist">
                    <span className="nav-icon">
                      <i className="fa fa-bookmark"></i>
                    </span>
                    <span className="menu-text">Watchlist</span>
                  </Link>
                  <Link className="item" to="/rated">
                    <span className="nav-icon">
                      <i className="fa fa-star"></i>
                    </span>
                    <span className="menu-text">Rated Movies</span>
                  </Link>

                  <Link className="item" to="#" onClick={() => logout()}>
                    <span className="nav-icon">
                      <i className="fa fa-sign-out"></i>
                    </span>
                    <span className="menu-text">Log Out</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link className="item" to="/login">
                    <span className="nav-icon">
                      <i className="fa fa-user"></i>
                    </span>
                    <span className="menu-text">Login</span>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  isLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Header);
