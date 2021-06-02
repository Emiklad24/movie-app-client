import React, { Component } from "react";
import "../Styles/Signup.css";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { connect } from "react-redux";
import { login } from "../actions/authAction";
import client from "../FeathersClient";
import FallbackSuspense from "../Components/FallbackSuspense";
import { toast } from "react-toastify";
import Search from "../Components/Search";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repeatPassword: "",
    };
  }

  registerNewUser = async (e) => {
    e.preventDefault();
    const { email, password, repeatPassword } = this.state;
    const { login } = this.props;
    if (password.length < 6) {
      swal("password must be at least 6 characters");
      this.setState({ email: "", password: "", repeatPassword: "" });
      return;
    } else if (password !== repeatPassword) {
      swal("Password and Repeat Password must match");
      this.setState({ email: "", password: "", repeatPassword: "" });
      return;
    }

    try {
      const user = { email, password };
      this.setState({ email: "", password: "", repeatPassword: "" });
      await client.service("users").create(user);
      login(user);
    } catch (error) {
      if (error.message === "email: value already exists.") {
        toast.error("Account Already Exist");
      } else {
        toast.error("Sign Up Failed!");
      }
      console.log(error);
    }
    return;
  };

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  render() {
    // const { email, password, repeatPassword } = this.state;
    const { isAuthLoading, isAuthenticated } = this.props;
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
        <div className="container">
          <div className="form mx-auto my-auto">
            <form>
              <div className="form-title" id="form-title">
                Sign up{" "}
              </div>
              <div className="form-row login">
                <a
                  href={`${appUrl}/oauth/google`}
                  className="btn btn-danger btn-lg btn-social mx-auto"
                  style={{ borderRadius: 0 }}
                >
                  <i className="fa fa-google"></i> Sign up with Google
                </a>

                <a
                  className="btn btn-primary btn-lg btn-social mx-auto mt-2"
                  style={{ borderRadius: 0 }}
                  onClick={() =>
                    swal({
                      title: "Coming Soon..👍 👍 👍 ",
                      text: "this feature will let you sign up with your facebook account",
                    })
                  }
                >
                  <i className="fa fa-facebook"></i> Sign up with Facebook
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
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAuthLoading: state.auth.isLoading,
  isLoading: state.auth.isLoading,
  userData: state.auth.user,
});

export default connect(mapStateToProps, { login })(Signup);
