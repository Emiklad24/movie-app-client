import React, { Component } from 'react'
import PopularMovies from './PopularMovies'
import NowPlayingMovies from './NowPlayingMovies'
import TopRatedMovies from './TopRatedMovies';
import UpcomingMovies from './UpcomingMovies'
import { Link } from 'react-router-dom'
import '../Styles/MoviesMenu.css';

export class MoviesMenu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentView: 'Popular'
        }
    }

    switchCurrentView = (view) => {
        this.setState({ currentView: view })
    }

    render() {
        const { currentView } = this.state;
        return (
            <>
                <div className="container">
                    <div className="filterMenu">
                        <ul className="menuList">
                            <li>
                                <Link className={currentView === "Popular" ? "active" : null} onClick={() => this.switchCurrentView("Popular")}>Popular</Link>
                            </li>
                            <li>
                                <Link className={currentView === "Now Playing" ? "active" : null} onClick={() => this.switchCurrentView("Now Playing")}>Now Playing</Link>
                            </li>
                            <li>
                                <Link className={currentView === "Top Rated" ? "active" : null} onClick={() => this.switchCurrentView("Top Rated")}>Top Rated</Link>
                            </li>
                            <li>
                                <Link className={currentView === "Upcoming" ? "active" : null} onClick={() => this.switchCurrentView("Upcoming")}>Upcoming</Link>
                            </li>
                        </ul>
                    </div>
                </div>


                {
                    currentView === "Popular" ?
                        <>
                            <div className="container card-row">
                                <div className="row">
                                    <PopularMovies />
                                </div>
                            </div>
                        </> :

                        currentView === "Now Playing" ?
                            <>
                                <div className="container card-row">
                                    <div className="row">
                                        <NowPlayingMovies />
                                    </div>
                                </div>
                            </> :
                            currentView === "Top Rated" ?
                                <>
                                    <div className="container card-row">
                                        <div className="row">
                                            <TopRatedMovies />
                                        </div>
                                    </div>
                                </> :

                                <>
                                    <div className="container card-row">
                                        <div className="row">
                                            <UpcomingMovies />
                                        </div>
                                    </div>
                                </>
                }
            </>
        )
    }
}

export default MoviesMenu
