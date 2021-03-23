import React, { Component } from "react";
// import { Link } from 'react-router-dom';
import "../Styles/Error404.css";
import Search from "../Components/Search";

class Erro404 extends Component {
  render() {
    return (
      <>
        <div className="wrapper">
          <div className="container">
            <div className="error404">
              <h1>{this.props.emoji || "😕 😕 😕 "}</h1>
              <h4 className="text-center text-white">
                {this.props.message || "404 (Page Not Found)"}
              </h4>
              <a className="goBack" href="/">
                <i className="fa fa-arrow-left"></i> Go back{" "}
              </a>
            </div>
          </div>
        </div>
        <Search />
      </>
    );
  }
}

export default Erro404;
