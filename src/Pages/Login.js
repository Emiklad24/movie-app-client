import React, { Component } from "react";
import "../Styles/Login.css";
import Header from "../Components/Header";
import { Link, Redirect } from "react-router-dom";
import Search from "../Components/Search";
import { socketURL } from "../FeathersClient";
import { authStore } from "../store/auth.store";

function Login() {
  const isAuthenticated = authStore((state) => state?.isAuthenticated);
  if (isAuthenticated === true) {
    return <Redirect to="/watchlist" />;
  }

  return (
    <>
      <Header />
      <div className="container">
        <div className="form mx-auto my-auto">
          <form>
            <div className="form-title" id="form-title">
              Join
            </div>
            <div className="form-row login">
              <a
                href={`${socketURL}/oauth/google`}
                className="btn btn-danger btn-lg btn-social mx-auto"
                style={{ borderRadius: 0 }}
              >
                <i className="fa fa-google"></i> Join with Google
              </a>
            </div>
          </form>
        </div>
      </div>
      <Search />
    </>
  );
}

export default Login;
