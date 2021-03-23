import React, { Component } from 'react'
import '../Styles/MovieActorList.css'
import noImage from '../Assets/Images/noimage.png'



class MovieActorList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showAll: false
        }
    }
    showAllCastView = (e) => {
        this.setState({ showAll: !this.state.showAll });
        console.log('hey again');

    }

    render() {
        const { actors } = this.props;
        const { showAll } = this.state;
        const firstTwentyCast = actors.slice(0, 12)

        return (
            <div className="container">
                <div className="movie-cast uk-animation-fade delay: 200">
                    <div className="d-flex justify-content-between align-align-items-center">
                        <h3 className="cast-title mb-4">Casts</h3>
                        {
                            actors.length > 12 ?
                                < div className="custom-control custom-switch pr-5 info">
                                    <input type="checkbox" className="custom-control-input info" id="show-all" onChange={this.showAllCastView} checked={showAll} name="actors-toggle" />
                                    <label className="custom-control-label" htmlFor="show-all">Show all {actors.length} casts</label>
                                </div> : null
                        }
                    </div>
                    <div className="movie-cast-list d-flex flex-wrap justify-content-md-center justify-content-lg-start justify-content-center align-items-stretch">

                        {
                            actors && showAll ?
                                actors.map((actor, index) =>
                                    <div className="movie-cast-item uk-animation-fade" key={index}>
                                        <img className="movie-cast-img" alt={actor.name || index} title={actor.name || index} src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : noImage} />
                                        <div className="movie-cast-info">{actor.name || "Actor name unavailable"} <br />
                                            <span className="small">{actor.character || "Actor character unavailable"}</span>
                                        </div>
                                    </div>
                                ) : actors && !showAll ?
                                    firstTwentyCast.map((actor, index) =>
                                        <div className="movie-cast-item uk-animation-fade" key={index}>
                                            <img className="movie-cast-img" alt={actor.name || index} title={actor.name || index} src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : noImage} />
                                            <div className="movie-cast-info">{actor.name || "Actor name unavailable"} <br />
                                                <span className="small">{actor.character || "Actor character unavailable"}</span>
                                            </div>
                                        </div>
                                    ) : null

                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MovieActorList
