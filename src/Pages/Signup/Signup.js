import React from "react";
import "../../Styles/Signup.css";
import { Link, Redirect } from "react-router-dom";
import Search from "../../Components/Search";
import shallow from "zustand/shallow";
import useUserCredentialsStore from "../../store/auth.store";
import { socketURL } from "../../FeathersClient";

const Signup = () => {
  const { isAuthenticated } = useUserCredentialsStore(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
    }),
    shallow
  );

  if (isAuthenticated) {
    return <Redirect to="/watchlist" />;
  }

  return (
    <>
      <div className="container">
        <div className="form mx-auto my-auto">
          <form>
            <div className="form-title" id="form-title">
              Sign up{" "}
            </div>
            <div className="form-row login">
              <a
                href={`${socketURL}/connect/google`}
                className="btn btn-danger btn-lg btn-social mx-auto"
                style={{ borderRadius: 0 }}
              >
                <i className="fa fa-google"></i> Sign up with Google
              </a>

              <p>
                Already have an account <i className="fa fa-arrow-right"></i>
                <Link to="/login"> Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Search />
    </>
  );
};

export default Signup;
