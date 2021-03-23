import React, { PureComponent } from 'react';
import ReactPlayer from 'react-player/lazy'

export class MovieTrailerList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            showAllTrailer: false
        }
    }

    showAllTrailers = (e) => {
        this.setState(state => {
            return {
                showAllTrailer: !state.showAllTrailer
            }
        })
    }

    render() {

        const { trailers } = this.props;
        const { showAllTrailer } = this.state;
        const firstSixTrailers = trailers.slice(0, 6)
        return (
            <div className="container uk-animation-fade">
                {
                    trailers.length > 6 ?
                        <div className="row">
                            <div className="custom-control custom-switch pr-5 info">
                                <input type="checkbox" className="custom-control-input info" id="show-all-trailers" onChange={this.showAllTrailers} checked={showAllTrailer} name="trailer-toggle" />
                                <label className="custom-control-label text-white" htmlFor="show-all-trailers">Show all {trailers.length} trailers</label>
                            </div>
                        </div> : null
                }
                <div className="row">

                    {
                        trailers && showAllTrailer && trailers.length !== 0 ?
                            trailers.map((trailer, index) =>

                                < div className="col-md-4" key={index} >
                                    <div className='player-wrapper mt-3'>
                                        <ReactPlayer
                                            className='react-player'
                                            url={trailer.site.toLowerCase() === "youtube" ?
                                                `https://www.youtube.com/watch?v=${trailer.key}` :
                                                trailer.site.toLowerCase() === "vimeo" ?
                                                    `https://vimeo.com/${trailer.key}` : null}
                                            width='100%'
                                            height='100%'
                                            controls={true}
                                        />
                                    </div>
                                </div>

                            ) :
                            firstSixTrailers && !showAllTrailer && firstSixTrailers.length !== 0 ?
                                firstSixTrailers.map((trailer, index) =>

                                    < div className="col-md-4" key={index} >
                                        <div className='player-wrapper mt-3'>
                                            <ReactPlayer
                                                className='react-player'
                                                url={trailer.site.toLowerCase() === "youtube" ?
                                                    `https://www.youtube.com/watch?v=${trailer.key}` :
                                                    trailer.site.toLowerCase() === "vimeo" ?
                                                        `https://vimeo.com/${trailer.key}` : null}
                                                width='100%'
                                                height='100%'
                                                controls={true}
                                            />
                                        </div>
                                    </div>
                                ) : null

                    }
                </div>
            </div>
        )
    }
}

export default MovieTrailerList
