import React, { Component } from 'react'
import '../Styles/NoWatchlist.css'
import { Link } from 'react-router-dom'

class NoWatchlist extends Component {
    render() {
        return (
            <>
                <div className="container">
                    <div className="card-wrapper">
                        <div className="card-lg uk-animation-fade delay: 500">
                            <div className="text-center">{this.props.message}</div>
                            <Link to="/">
                                <button className="goBtn">Explore Movies</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default NoWatchlist
