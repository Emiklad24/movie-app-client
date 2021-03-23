import React, { Component } from 'react'
import '../Styles/Loading.css'

class Loading extends Component {
    render() {
        return (
            <>
                <div className="col uk-animation-fade">
                    <div className="loading">
                        <div className="card bg-animation"></div>
                    </div>
                </div>
                <div className="col uk-animation-fade">
                    <div className="loading">
                        <div className="card bg-animation"></div>
                    </div>
                </div>
                <div className="col uk-animation-fade">
                    <div className="loading">
                        <div className="card bg-animation"></div>
                    </div>
                </div>
                <div className="col uk-animation-fade">
                    <div className="loading">
                        <div className="card bg-animation"></div>
                    </div>
                </div>
            </>
        )
    }
}

export default Loading
