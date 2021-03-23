import React, { Component } from 'react';
import MovieCard from './MovieCard';
import '../Styles/MovieActorList.css'

class RecommendedMovies extends Component {
    render() {
        const { recommendations } = this.props
        return (
            <>
                <div style={{ width: '100%' }}>
                    <h3 className="cast-title mb-4" style={{fontFamily: "Raleway", fontWeight:'bold'}}>Recommendations</h3>
                </div>                      {
                    recommendations ?
                        recommendations.map((recommedation) =>

                            <MovieCard movie={recommedation} key={recommedation.id} canDelete={false} onWatchlist={false} forceUpdate={true} />
                        ) : null
                }
            </>
        )
    }
}

export default RecommendedMovies
