import React from "react";
import "../Styles/Login.css";
import Search from "../Components/Search";
import { socketURL } from "../FeathersClient";
import { authStore } from "../store/auth.store";
import { Redirect } from "react-router";
function Login() {
  const isAuthenticated = authStore((state) => state?.isAuthenticated);
  if (isAuthenticated === true) {
    return <Redirect to="/watchlist" />;
  }

  return (
    <>
      <div className="container">
        <div className="form mx-auto my-auto">
          <form>
            <div className="form-title" id="form-title">
              Join
            </div>
            <div className="form-row login">
              <a
                href={`${socketURL}/connect/google`}
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
