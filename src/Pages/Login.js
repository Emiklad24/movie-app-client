import React, { Component } from "react";
import "../Styles/Login.css";
import Header from "../Components/Header";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authAction";
import FallbackSuspense from "../Components/FallbackSuspense";
import Search from "../Components/Search";
import { socketURL } from "../FeathersClient";

class Login extends Component {
  render() {
    const { isAuthLoading, isAuthenticated } = this.props;
    if (isAuthLoading === true && isAuthenticated === null) {
      return <FallbackSuspense />;
    } else if (isAuthLoading === false && isAuthenticated === true) {
      return <Redirect to="/watchlist" />;
    }

    return (
      <>
        <Header />
        <div className="container">
          <div className="form mx-auto my-auto">
            <form>
              <div className="form-title" id="form-title">
                Login
              </div>
              <div className="form-row login">
                <a
                  href={`${socketURL}/oauth/google`}
                  className="btn btn-danger btn-lg btn-social mx-auto"
                  style={{ borderRadius: 0 }}
                >
                  <i className="fa fa-google"></i> Sign in with Google
                </a>
                <p className="mt-3">
                  Don't have an account <i className="fa fa-arrow-right"></i>
                  <Link to="/signup"> Create account</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
        <Search />
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  isLoading: state.auth.isLoading,
  userData: state.auth.user,
});
export default connect(mapStateToProps, { login })(Login);
