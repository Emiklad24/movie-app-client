import React, { Component } from 'react'
import '../Styles/Watchlist.css'
import { connect } from 'react-redux';
import Header from '../Components/Header'
import MovieCard from '../Components/MovieCard'
import NoMovieList from '../Components/NoMovieList'
import Loading from '../Components/Loading'
import { fetchWatchlists } from '../actions/watchlistAction'
import Search from '../Components/Search';




class WatchList extends Component {
    componentDidMount = () => {
        if (!this.props.watchlists || this.props.watchlists.length === 0) {
            this.props.fetchWatchlists(this.props.userData._id)
        }
    }
    render() {
        const { watchlists, isLoading } = this.props;

        return (
            <>
                <Header />
                {
                    watchlists.length > 0 ?
                        <div className="container-fluid card-row">
                            <div className="row">
                                {
                                    watchlists.map((movie, index) =>
                                        <MovieCard movie={movie} key={movie.id} canDelete={true} onWatchList={false} />
                                    )
                                }
                            </div>
                        </div>
                        :
                        isLoading ?
                            <div className="container card-row">
                                <div className="row">
                                    <Loading />
                                </div>
                            </div> :
                            <NoMovieList message={"No movies on your watchlist."} />
                }
                <Search />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    watchlists: state.watchlists.watchlists,
    userData: state.auth.user,
    isLoading: state.watchlists.isLoading
});

export default connect(mapStateToProps, { fetchWatchlists })(WatchList)

