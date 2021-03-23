import React, { Component } from "react";
import "../Styles/Login.css";
import Header from "../Components/Header";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/authAction";
import FallbackSuspense from "../Components/FallbackSuspense";
import Search from "../Components/Search";
import swal from "sweetalert";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  loginUser = (e) => {
    e.preventDefault();
    try {
      const { email, password } = this.state;
      const user = { email, password };
      this.setState({ email: "", password: "" });
      this.props.login(user);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { isAuthLoading, isAuthenticated } = this.props;
    // const { email, password } = this.state;
    const appUrl =
      window.location.hostname === "localhost"
        ? "http://localhost:3030"
        : "https://movie-app-serve.herokuapp.com";

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
              {/* <div className="form-row"> */}
              {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fa fa-user"></i>
                                        </div>
                                    </div>
                                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" value={email} onChange={this.onChangeHandler} required />
                                </div>*/}
              {/* </div> */}
              <div className="form-row login">
                {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <i className="fa fa-lock"></i>
                                        </div>
                                    </div>
                                    <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={this.onChangeHandler} required />
                                </div> */}
                <a
                  href={`${appUrl}/oauth/google`}
                  className="btn btn-danger btn-lg btn-social mx-auto"
                  style={{ borderRadius: 0 }}
                >
                  <i className="fa fa-google"></i> Sign in with Google
                </a>

                <a
                  className="btn btn-primary btn-lg btn-social mx-auto mt-2"
                  style={{ borderRadius: 0 }}
                  onClick={() =>
                    swal({
                      title: "Coming Soon..👍 👍 👍 ",
                      text:
                        "this feature will let you sign in with your facebook account",
                    })
                  }
                >
                  <i className="fa fa-facebook"></i> Sign in with Facebook
                </a>
                <p>
                  Don't have an account <i className="fa fa-arrow-right"></i>
                  <Link to="/signup"> Create account</Link>
                </p>
              </div>
              {/* <div className="form-row login">

                                <input type="submit" value={isAuthLoading ? "Please Wait..." : "Login"} disabled={isAuthLoading} style={{ cursor: isAuthLoading ? "not-allowed" : 'pointer' }} />
                                <p>Don't have an account <i className="fa fa-arrow-right"></i><Link to="/signup"> Create account</Link></p>
                            </div> */}
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
