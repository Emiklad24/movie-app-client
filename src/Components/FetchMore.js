import React, { Component } from 'react'
import '../Styles/Search.css'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'



class FetchMore extends Component {


    render() {
        const { fetchMore, popLoad, topRatedLoad, nowPlayingLoad, upcomingLoad } = this.props;
        return ReactDOM.createPortal(
            <>
                <div className="btn-Modal-fetch" id="toggle-modal-button" onClick={fetchMore}>
                    {
                        popLoad || topRatedLoad || nowPlayingLoad || upcomingLoad ?
                            <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>
                            :
                            <i className="fa fa-chevron-circle-down uk-animation-fade"></i>
                    }
                </div>
            </>, document.getElementById("fetch-more")
        )
    }
}

const mapStateToProps = (state) => ({
    popLoad: state.popularMovies.isFetchingMore,
    topRatedLoad: state.topRatedMovies.isFetchingMore,
    nowPlayingLoad: state.nowPlayingMovies.isFetchingMore,
    upcomingLoad: state.upcomingMovies.isFetchingMore
});

export default connect(mapStateToProps, {})(FetchMore)


